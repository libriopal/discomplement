import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/cloudflare';

/*
 * This route mirrors generated project files to a real directory on disk so that:
 *  (1) generated code is not memory/cloud-only (it survives WebContainer/browser restarts), and
 *  (2) re-opening a project can read files straight from disk instead of waiting for a full
 *      WebContainer boot + chat-history replay.
 *
 * It only does anything useful when running under a real Node process (plain `pnpm dev`, or the
 * Electron app - which forwards its requests to this same Remix server build, see
 * electron/main/index.ts). In a Cloudflare Pages deployment `fs` is unavailable and every call is
 * a safe no-op / 501.
 */

const PROJECTS_DIR_NAME = 'bolt-projects';

// Lazily resolved so this module can still be imported in non-Node environments without throwing.
async function getNodeFsModules() {
  if (typeof process === 'undefined' || !process.versions?.node) {
    return null;
  }

  const [fs, path, os] = await Promise.all([import('node:fs/promises'), import('node:path'), import('node:os')]);

  return { fs, path, os };
}

function sanitizeProjectId(projectId: string): string {
  // Keep it to a simple slug - no path separators, no traversal segments.
  return projectId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
}

/**
 * Resolves `relativePath` inside the project's directory, guaranteeing the final resolved path
 * stays inside `projectRoot`. Throws if the path would escape the sandbox (e.g. `../../etc/passwd`).
 */
function resolveSafePath(nodePath: typeof import('node:path'), projectRoot: string, relativePath: string): string {
  const normalized = relativePath.replace(/^[/\\]+/, '');
  const resolved = nodePath.resolve(projectRoot, normalized);
  const rootWithSep = projectRoot.endsWith(nodePath.sep) ? projectRoot : projectRoot + nodePath.sep;

  if (resolved !== projectRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Path escapes project root: ${relativePath}`);
  }

  return resolved;
}

async function getProjectsRoot(nodeModules: NonNullable<Awaited<ReturnType<typeof getNodeFsModules>>>) {
  const { path, os } = nodeModules;
  const root = path.join(os.homedir(), PROJECTS_DIR_NAME);
  await nodeModules.fs.mkdir(root, { recursive: true });

  return root;
}

async function listFilesRecursive(
  fs: typeof import('node:fs/promises'),
  path: typeof import('node:path'),
  dir: string,
  base: string,
  out: Record<string, string>,
) {
  let entries: import('node:fs').Dirent[];

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    // Skip VCS / dependency directories - they don't need to round-trip through disk sync.
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      await listFilesRecursive(fs, path, fullPath, relPath, out);
    } else if (entry.isFile()) {
      try {
        out[relPath.split(path.sep).join('/')] = await fs.readFile(fullPath, 'utf-8');
      } catch {
        // Skip unreadable/binary files that fail utf-8 decoding.
      }
    }
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const nodeModules = await getNodeFsModules();

  if (!nodeModules) {
    return json({ error: 'Disk sync is not available in this environment' }, { status: 501 });
  }

  try {
    const body = (await request.json()) as { projectId?: string; path?: string; content?: string };
    const { projectId, path: filePath, content } = body;

    if (!projectId || !filePath || content === undefined) {
      return json({ error: 'projectId, path and content are required' }, { status: 400 });
    }

    const { fs, path } = nodeModules;
    const projectsRoot = await getProjectsRoot(nodeModules);
    const projectRoot = path.join(projectsRoot, sanitizeProjectId(projectId));
    const targetPath = resolveSafePath(path, projectRoot, filePath);

    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, content, 'utf-8');

    return json({ success: true });
  } catch (error) {
    console.error('Failed to sync project file to disk:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const nodeModules = await getNodeFsModules();

  if (!nodeModules) {
    return json({ error: 'Disk sync is not available in this environment' }, { status: 501 });
  }

  const url = new URL(request.url);
  const projectId = url.searchParams.get('projectId');

  if (!projectId) {
    return json({ error: 'projectId is required' }, { status: 400 });
  }

  try {
    const { fs, path } = nodeModules;
    const projectsRoot = await getProjectsRoot(nodeModules);
    const projectRoot = path.join(projectsRoot, sanitizeProjectId(projectId));

    let exists = true;

    try {
      await fs.access(projectRoot);
    } catch {
      exists = false;
    }

    if (!exists) {
      return json({ exists: false, files: null });
    }

    const files: Record<string, string> = {};
    await listFilesRecursive(fs, path, projectRoot, '', files);

    return json({ exists: true, files });
  } catch (error) {
    console.error('Failed to read project files from disk:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
};

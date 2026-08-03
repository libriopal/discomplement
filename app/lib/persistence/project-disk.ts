/*
 * Client-side helpers for mirroring generated project files to a real directory on disk
 * (see app/routes/api.project-files.ts) and reading them back instantly on project reopen.
 */

import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('ProjectDisk');

/** Derives a filesystem-safe project id from the chat's url id (falls back to the raw chat id). */
export function getProjectSlug(urlId?: string, chatId?: string): string | undefined {
  const raw = urlId || chatId;

  if (!raw) {
    return undefined;
  }

  return raw.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/** Fire-and-forget mirror of a single file write to the on-disk project folder. */
export function syncFileToDisk(projectId: string, filePath: string, content: string): void {
  fetch('/api/project-files', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, path: filePath, content }),
  }).catch((error) => {
    logger.debug('Failed to sync file to disk', filePath, error);
  });
}

/**
 * Reads back every file already persisted on disk for a project, so the UI can populate
 * instantly instead of waiting for WebContainer boot + full chat-history replay.
 * Returns `null` when disk sync is unavailable or no on-disk project folder exists yet.
 */
export async function loadProjectFilesFromDisk(projectId: string): Promise<Record<string, string> | null> {
  try {
    const res = await fetch(`/api/project-files?projectId=${encodeURIComponent(projectId)}`);

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { exists?: boolean; files?: Record<string, string> | null };

    if (!data.exists || !data.files) {
      return null;
    }

    return data.files;
  } catch (error) {
    logger.debug('Failed to load project files from disk', error);
    return null;
  }
}

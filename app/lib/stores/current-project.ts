import { atom } from 'nanostores';

/**
 * The id used to namespace a project's on-disk mirror folder (see
 * app/lib/persistence/project-disk.ts and app/routes/api.project-files.ts).
 *
 * Lives in its own module (rather than useChatHistory.ts) so that both `workbench.ts` and
 * `action-runner.ts` can read it without creating an import cycle with useChatHistory.ts, which
 * itself imports `workbenchStore`.
 */
export const currentProjectId = atom<string | undefined>(undefined);

#!/usr/bin/env bash
# Runs bolt.diy locally so it can be opened in a browser like a local app:
# chat history, settings, and generated project files all persist across
# reloads (IndexedDB for chat/settings, on-disk mirror for project files —
# see app/routes/api.project-files.ts).
#
# Usage:
#   ./scripts/start-server.sh          # dev mode: fast start, hot reload
#   ./scripts/start-server.sh --prod   # production build, then serve it
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

command -v pnpm >/dev/null || { echo "error: pnpm not found on PATH" >&2; exit 1; }

if [ ! -d node_modules ]; then
  echo "==> Installing dependencies..."
  pnpm install
fi

if [ "${1:-}" = "--prod" ]; then
  echo "==> Building production bundle..."
  pnpm run build
  echo "==> Starting production server at http://localhost:5173 ..."
  exec pnpm run start
else
  echo "==> Starting dev server (hot reload) at http://localhost:5173 ..."
  exec pnpm run dev
fi

#!/usr/bin/env bash
# Builds an installable Android debug APK for bolt.diy via Capacitor + Gradle.
#
# Usage:
#   ./scripts/build-apk.sh [server-url]
#
# server-url (optional): the URL the packaged app's WebView will load, e.g.
#   https://your-deployed-bolt.example.com  (a real device/production build)
#   http://10.0.2.2:5173                    (default: Android emulator -> host `pnpm dev`)
#
# Output: apk/bolt-libriopal-debug.apk
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SERVER_URL="${1:-http://10.0.2.2:5173}"

command -v pnpm >/dev/null || { echo "error: pnpm not found on PATH" >&2; exit 1; }
command -v java >/dev/null || { echo "error: java not found on PATH" >&2; exit 1; }

: "${ANDROID_HOME:?ANDROID_HOME must point to your Android SDK}"
ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"
export ANDROID_HOME ANDROID_SDK_ROOT

if [ ! -d android ]; then
  echo "==> No android/ project found, running 'npx cap add android'..."
  export CAPACITOR_SERVER_URL="$SERVER_URL"
  npx cap add android
fi

echo "==> Syncing Capacitor web assets/config (server url: $SERVER_URL)..."
CAPACITOR_SERVER_URL="$SERVER_URL" npx cap sync android

echo "sdk.dir=$ANDROID_SDK_ROOT" > android/local.properties

echo "==> Building debug APK with Gradle (this can take several minutes)..."
(cd android && ./gradlew assembleDebug --no-daemon)

APK_SRC="android/app/build/outputs/apk/debug/app-debug.apk"
if [ ! -f "$APK_SRC" ]; then
  echo "error: expected APK not found at $APK_SRC" >&2
  exit 1
fi

mkdir -p apk
cp "$APK_SRC" apk/bolt-libriopal-debug.apk

echo "==> Done. APK at: apk/bolt-libriopal-debug.apk"
echo "    Install on a connected device/emulator with: adb install -r apk/bolt-libriopal-debug.apk"

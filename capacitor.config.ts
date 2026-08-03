import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.libriopal.boltdiy',
  appName: 'bolt.diy',
  webDir: 'build/client',
  server: {
    // bolt.diy is a Remix app with a server backend (LLM providers, API routes),
    // so the packaged app loads it from a running server rather than bundling a static build.
    // Point this at your deployed instance, or use 10.0.2.2 (Android emulator alias for host
    // localhost) to hit a local `pnpm dev` server during development.
    url: process.env.CAPACITOR_SERVER_URL || 'http://10.0.2.2:5173',
    cleartext: true,
  },
};

export default config;

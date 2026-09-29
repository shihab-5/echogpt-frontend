/**
 * Build metadata for the About section. The values are inlined at build
 * time by Next.js / TypeScript. No environment variables.
 */
export const BUILD_INFO = {
  version: "0.1.0",
  buildDate: "2025-09-28",
  appName: "EchoGPT",
} as const;

export type BuildInfo = typeof BUILD_INFO;

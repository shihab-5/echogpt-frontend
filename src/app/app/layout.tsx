import { AppShell } from "@/components/chat/AppShell";

// The web app shell reads the active model from ?model=<id> via
// useSearchParams() (transitively, through AppHeader → useActiveModel).
// Force the /app/* tree to opt out of static prerendering — the
// workspace is interactive state, not content.
export const dynamic = "force-dynamic";

/**
 * /app/* layout — the web-app shell.
 *
 * Replaces the marketing chrome with the dedicated workspace chrome:
 * sidebar (260 / 64 / drawer) + AppHeader + main area. P5 will fill the
 * main area with the actual chat surface.
 *
 * Note: <main id="main"> lives inside <AppShell /> so the skip-to-content
 * link works at every breakpoint.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

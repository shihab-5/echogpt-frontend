"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { AppSidebar } from "@/components/chat/AppSidebar";
import { CollapsedSidebar } from "@/components/chat/CollapsedSidebar";
import { MobileDrawer } from "@/components/chat/MobileDrawer";
import { AppHeader } from "@/components/chat/AppHeader";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Web-app shell orchestrator.
 *
 * Layout:
 *   - Desktop (≥ lg, 1024 px): 260 px labeled sidebar.
 *   - Tablet (md → lg, 768–1024 px): 64 px icon-only sidebar.
 *   - Mobile (< md, 768 px): no sidebar; hamburger triggers a drawer.
 *
 * The shell owns mobile-drawer open/close state. The hamburger lives
 * inside <AppHeader />. The model selector lives inside <AppHeader />
 * at every breakpoint so P5 only has to read the active model once.
 *
 * The /app/* layout sets `dynamic = "force-dynamic"` because the
 * shell reads URL search params (the active model). This is fine for
 * an interactive workspace — the home/landing pages stay static.
 *
 * Note: this shell replaces the marketing <SiteHeader /> / <SiteFooter />
 * for /app/* routes — the marketing chrome lives under the
 * (marketing) route group instead.
 */
export function AppShell({ children, className }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div
      className={cn(
        "flex h-[100dvh] w-full flex-col overflow-hidden bg-bg-base text-fg-primary",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <CollapsedSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader onOpenMenu={openDrawer} />

          <main
            id="main"
            tabIndex={-1}
            className="flex min-h-0 flex-1 flex-col overflow-y-auto outline-none"
          >
            {children}
          </main>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}

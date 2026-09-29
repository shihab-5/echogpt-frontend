"use client";

import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UserMenu } from "@/components/shared/UserMenu";
import { NavMenu } from "@/components/landing/NavMenu";
import { MobileNav } from "@/components/landing/MobileNav";
import { useUser } from "@/hooks/use-user";

/**
 * Marketing site header. Becomes a client component because the right
 * cluster swaps between "Sign in / Open the workspace" (signed-out) and
 * a `<UserMenu />` (signed-in) based on `useUser()`. The nav menu is
 * still static server-rendered content wrapped here.
 */
export function SiteHeader() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg-base/80 backdrop-blur supports-[backdrop-filter]:bg-bg-base/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="EchoGPT home" className="inline-flex">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <NavMenu />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle size="sm" />
          </div>
          {user ? (
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden h-9 items-center text-sm font-medium text-fg-secondary underline-offset-2 transition-colors duration-fast hover:text-fg-primary hover:underline sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/app"
                className="hidden h-9 items-center rounded-control bg-brand px-4 text-sm font-medium text-white transition-colors duration-fast hover:bg-brand-hover sm:inline-flex"
              >
                Open the workspace
              </Link>
            </>
          )}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

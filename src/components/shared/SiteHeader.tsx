import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NavMenu } from "@/components/landing/NavMenu";
import { MobileNav } from "@/components/landing/MobileNav";

/**
 * Marketing site header. Server Component shell, with two client islands
 * (NavMenu is fine as a server component but its links are static; MobileNav
 * is a client component because of the dialog + focus trap).
 */
export function SiteHeader() {
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
          <Link
            href="/app"
            className="hidden h-9 items-center rounded-control bg-brand px-4 text-sm font-medium text-white transition-colors duration-fast hover:bg-brand-hover sm:inline-flex"
          >
            Open the workspace
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

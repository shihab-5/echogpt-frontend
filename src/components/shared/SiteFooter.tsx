import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { LANDING_NAV, LEGAL_NAV } from "@/data/nav";

/**
 * Site-wide footer (used by the landing page and other routes).
 * The root layout renders this on every page.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 max-w-xs text-xs text-fg-muted">
              A focused multi-model workspace for the web and a browser
              extension concept. Frontend prototype.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {LANDING_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-fg-secondary hover:text-fg-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
              Workspace
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/app" className="text-fg-secondary hover:text-fg-primary">
                  Open the workspace
                </Link>
              </li>
              <li>
                <Link
                  href="/extension"
                  className="text-fg-secondary hover:text-fg-primary"
                >
                  Extension concept
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-muted">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {LEGAL_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-fg-secondary hover:text-fg-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-fg-muted">
          © {new Date().getFullYear()} EchoGPT. Frontend-only prototype.
        </p>
      </Container>
    </footer>
  );
}

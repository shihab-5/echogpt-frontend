import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";

/**
 * Marketing chrome for the landing page (`/`) and legal pages.
 *
 * The app shell at /app/* uses its own <AppShell /> chrome instead.
 * Keeping these routes inside the (marketing) route group means the
 * landing/legal pages share a layout, while /app/* gets a different one.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

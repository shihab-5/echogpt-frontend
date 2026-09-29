// The popup reads ?conversation=<id> via useSearchParams (transitively,
// through ExtensionPromptView / ExtensionConversationView). Force
// dynamic rendering so Next.js doesn't try to prerender with an
// empty query param.
export const dynamic = "force-dynamic";

/**
 * /extension/* layout — frames every page inside a 380 × 560 column.
 *
 * The popup is intentionally NOT inside the (marketing) route group
 * (which would give it the SiteHeader / SiteFooter chrome) and NOT
 * inside /app (which would give it the workspace shell). The popup
 * has its own minimal chrome rendered by <ExtensionPopupLayout />.
 *
 * The page below centers the popup inside the viewport so it sits
 * inside the existing landing-page demo's <ExtensionFrame /> visual
 * grammar. On a 380 px wide viewport the centered card occupies the
 * full width.
 */
export default function ExtensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-screen items-start justify-center bg-bg-base px-4 py-6 md:py-12 outline-none"
    >
      {children}
    </main>
  );
}
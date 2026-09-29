import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ToastProvider } from "@/components/shared/ToastProvider";
import { SkipToContent } from "@/components/shared/SkipToContent";
import { ThemeBootstrapScript } from "@/components/shared/ThemeBootstrapScript";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EchoGPT — A focused multi-model workspace",
  description:
    "Switch models without losing your place. A premium multi-model AI chat workspace for the web and a Chrome extension concept.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

/**
 * Root layout — providers only.
 *
 * The marketing chrome (SiteHeader / SiteFooter) lives in
 * src/app/(marketing)/layout.tsx, and the app shell lives in
 * src/app/app/layout.tsx. Keeping this file minimal lets each
 * route group own its own chrome without fighting the root layout.
 *
 * Theme-init note: the no-flash theme bootstrap IIFE is injected via
 * `useServerInsertedHTML` from `src/components/shared/ThemeBootstrapScript.tsx`,
 * which is mounted as the first child of <body> below. This is the only
 * pattern that avoids React 19's "Encountered a script tag while rendering
 * React component" warning: that warning is emitted by React's reconciler
 * for *any* <script> JSX child (see react-dom-client.development.js,
 * completeWork case 5), so `<script dangerouslySetInnerHTML>`,
 * `<script src="…">`, and all `next/script` strategies trip it. Going
 * through `useServerInsertedHTML` injects raw HTML into the streamed SSR
 * response without going through React's render phase, so the reconciler
 * never sees a `<script>` element. The IIFE still runs synchronously
 * before paint because Next.js 16 streams the inserted HTML inline with
 * the rest of the document body, preserving the no-flash guarantee.
 *
 * A bare <script src="…"> or <script dangerouslySetInnerHTML> rendered
 * as a React child would trigger the warning because React 19 treats
 * both as user-content scripts that may be silently dropped during
 * hydration.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head />
      <body className="flex min-h-full flex-col bg-bg-base text-fg-primary">
        <ThemeBootstrapScript />
        <ThemeProvider>
          <ToastProvider>
            <SkipToContent />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
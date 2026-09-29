"use client";

import { useServerInsertedHTML } from "next/navigation";

/**
 * No-flash theme bootstrap. Injects the IIFE synchronously into the
 * streamed SSR HTML so it runs before first paint and we never see
 * the wrong theme for one frame on hard-refresh.
 *
 * Why `useServerInsertedHTML` and not `<script src="/theme-init.js" />`
 * or `next/script`? React 19's reconciler emits
 * "Encountered a script tag while rendering React component" for any
 * `<script>` JSX child, regardless of strategy or hoisting
 * (react-dom/cjs/react-dom-client.development.js, completeWork case 5).
 * `useServerInsertedHTML` lets us append raw HTML to the streamed
 * response without going through React's render phase, so the
 * reconciler never sees a `<script>` element and the warning is gone.
 *
 * The component must be a Client Component ("use client") because the
 * `useServerInsertedHTML` hook lives in a "use client" shared runtime.
 * It renders nothing — returns null — so there's no hydration cost.
 * The IIFE the callback returns is only ever serialized into the SSR
 * HTML stream by Next.js, never committed by React on the client.
 */
export function ThemeBootstrapScript() {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "(function(){try{var s=localStorage.getItem('echogpt:theme:v1');var t=s?JSON.parse(s).value:'system';var r=t;if(t==='system'){r=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(r!=='dark'&&r!=='light')r='dark';document.documentElement.setAttribute('data-theme',r);}catch{document.documentElement.setAttribute('data-theme','dark');}})();",
      }}
    />
  ));
  return null;
}
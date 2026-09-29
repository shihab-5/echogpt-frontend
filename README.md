# EchoGPT Frontend Redesign

A focused, premium multi-model AI workspace. Three surfaces — marketing site, web app, and browser extension concept — share one design language and one local data layer.

## Overview

EchoGPT is a frontend prototype that demonstrates how a multi-model chat workspace can be designed and engineered end to end without a real AI backend. The product lets a user hold a conversation with one of several models from different providers, switch models mid-thread, run quick actions (Summarize, Explain, Rewrite, Translate, Debug code), and continue across devices-by virtue of a shared local store.

The project is intentionally a frontend concept:

- The landing page shows the actual product, not a marketing screenshot.
- The web app is the actual chat experience.
- The Chrome extension is a frontend concept; it does not ship a manifest or service worker.

## Features

### Marketing landing page (`/`)
- Sticky navbar with theme toggle.
- Hero with primary red "Open the workspace" CTA.
- Product preview built from real, reusable React components.
- Feature blocks, AI Models strip, How it works, Why EchoGPT.
- Chrome extension section with a framed popup preview.
- FAQ (controlled accordion), Final CTA, footer.

### Web application (`/app/*`)
- Sidebar with grouped conversation history, search, New chat, Settings, Theme toggle.
- Conversation surface with user and assistant messages, code blocks, hover actions (Copy, Regenerate).
- Auto-growing prompt composer with Enter / Shift+Enter / ⌘Enter behavior.
- Five quick actions: Summarize, Explain, Rewrite, Translate, Debug code.
- Model selector with URL-driven state and "Switched to X" inline notice.
- `/app/history` with search and grouped list.
- `/app/settings` with Appearance, Default model, Interface toggles, Keyboard shortcuts reference, Data (reset), About.
- Mobile drawer with focus trap and Esc-to-close.

### Chrome extension concept (`/extension/*`)
- Compact 380 px popup. Header, recent conversations, composer, quick actions.
- Routes for History and Settings, sharing the web app's local store.
- Tap-to-reveal message actions, smaller streaming indicator.
- Three routes: `/extension`, `/extension/history`, `/extension/settings`.

## Design Philosophy

Three colors carry the entire identity: black for environment, white for information, red for action. The interface is technical, restrained, and confident. Hierarchy comes from typography, spacing, borders, and scale, not from shadows or color. Red is used in exactly six approved cases: primary CTA fill, selected indicator (dot + 2 px left edge), focus ring, send-icon fill when the composer has content, error states (via the desaturated danger color), and the "Switched model" inline notice.

Generic AI-SaaS conventions are deliberately avoided: no gradients, no glassmorphism, no neon, no oversized rounded cards, no excessive shadows, no decorative icons, no pricing or testimonials, no carousel of CTAs.

## Tech Stack

- Next.js (current stable, App Router)
- TypeScript strict
- Tailwind CSS (token-driven)
- Inter via `next/font/google`
- JetBrains Mono via `next/font/google`
- `lucide-react`
- `framer-motion` (selective use; simple motion uses CSS transitions)
- `clsx` + `tailwind-merge` for class composition

No backend. No database. No authentication. No payment. No state library. No analytics.

## Architecture

The app is split across three App Router surfaces:

- `/` is a Server-rendered marketing site.
- `/app/*` is the chat shell, with `<AppShell>` as the layout boundary and small client islands for the sidebar drawer, model selector, composer, and message actions.
- `/extension/*` is the popup, gated to a 380 px column, reusing shared components via `compact` and `narrow` variants.

State is local per route, with three thin localStorage-backed hooks shared across the app:

- `useTheme` — `echogpt:theme:v1`
- `useConversations` — `echogpt:conversations:v1`
- `usePreferences` — `echogpt:preferences:v1`

Mock AI is a single function: `generateMockResponse(prompt, model)` returns a realistic response with 400–900 ms artificial latency. The same function powers the web app, the extension, and the landing page product preview.

## Project Structure

```
src/
  app/                        # Routes (Server Components by default)
    layout.tsx                # Root layout, fonts, ThemeProvider
    globals.css               # CSS variables, focus utilities, reduced motion
    page.tsx                  # Marketing landing
    (legal)/privacy, terms
    app/                      # Web app
      layout.tsx              # AppShell
      chat/[conversationId]   # Chat route
      history, settings
    extension/                # Popup (380 × 560)
  components/
    ui/                       # Design-system primitives
    layout/                   # Cross-experience shells
    landing/chat/extension/   # Surface-specific components
    shared/                   # Truly shared pieces
  data/                       # Realistic mock data (no lorem ipsum)
  hooks/                      # Thin React hooks
  lib/                        # cn, storage, mock-ai, registries
  types/                      # Strict TS contracts
```

## UX Decisions

- The hero uses one red CTA and one secondary text link. No carousel.
- The product preview is built from real React components, not an image.
- Empty states are calm, with a single CTA when useful. Placeholder copy ("Ask anything…") was deliberately replaced with concrete EchoGPT-voiced lines.
- Errors are red-tinted (`--danger`), not loud. The reset action requires a confirmation modal.
- The composer auto-grows, but caps: 6 lines on the web app, 3 lines in the extension.

## Responsive Design

Breakpoints: mobile (0), sm (640), md (768), lg (1024), xl (1280), 2xl (1536). The extension uses a 380 × 560 logical viewport regardless of host width.

- Mobile: single column; sidebar becomes a drawer; compare mode is hidden with an explanatory caption.
- Tablet: 64 px icon-collapsed sidebar.
- Desktop: 260 px labeled sidebar.
- All interactive elements have a minimum 44 × 44 px tap target on mobile.

## Accessibility

- Real `<button>` and `<a>` elements throughout; no clickable divs.
- One canonical focus ring token (`--focus-ring`), 2 px stroke, 2 px offset, applied to every interactive element.
- `aria-live="polite"` on the assistant message bubble; `role="status"` on the typing dots; `role="alert"` on the error state.
- Drawer uses `role="dialog"`, focus trap, Esc to close, focus restored.
- Reset confirmation uses `role="alertdialog"`.
- Skip-to-content link on every layout.
- `prefers-reduced-motion: reduce` collapses transforms; opacity-only transitions remain at 80 ms.
- Color contrast meets WCAG AA on both themes.

## Performance

- Server Components by default; `"use client"` only on islands (theme provider, sidebar drawer, model selector, composer, message actions, extension shell).
- Inter and JetBrains Mono via `next/font` with `display: swap`.
- `lib/mock-ai.ts` uses an `AbortController` to cancel in-flight simulated responses when the conversation changes or the page unmounts.
- Simple motion (hover, drawer) is CSS; Framer Motion is reserved for hero reveal, section reveals, modal, and drawer slide orchestration.
- The extension popup is `next/dynamic({ ssr: false })` on the landing page so it does not block first paint.

## Mock Data / Assumptions

- AI responses are local mock data. The assignment focuses on frontend engineering and does not require production AI API integration.
- Conversations persist in `localStorage`. There is no server. There is no account.
- The Chrome extension is a frontend concept. There is no `manifest.json`, service worker, or real Chrome API usage.
- "Switching models" updates URL state and selects a different canned response bucket; it does not reflect real model capabilities or pricing.

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The project is Vercel-ready. Connect the repository, accept the defaults (App Router, no env vars needed), and deploy. The local mock data layer means no secrets or environment variables are required.

## Additional Features

Settings page, History page, Theme switching (light / dark / system), Keyboard shortcuts reference, About section.

## Future Improvements

- Compare Mode (two-column, two-model side-by-side).
- Real AI integration with streaming responses.
- Real Chrome extension with manifest, service worker, and content script.
- Per-conversation model override controls.
- Cross-device sync.
- Edit and delete individual conversations from the history view.
- Real keyboard-shortcut handling (⌘K / ⌘N / `?`).
- Account, billing, and pricing.

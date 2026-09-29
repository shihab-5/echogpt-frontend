# EchoGPT Frontend — Execution Plan

> **Single-source-of-truth for executing the project.** `plan.md` is the design bible. This file is the **build script in plain English**: every phase has clear scope, files, exact commands, verification, success criteria, and stop conditions. The canonical brief remains `project_rules.md`.
>
> **Locked rule (do not violate).** "Do not start the project first — add them into file and divide into phase." Every phase below is a **plan**, not yet executed. After each phase, **stop and report**. Do not run `create-next-app`, `npm install`, or `npm run build` until that specific phase is explicitly approved.
>
> **Execution model.** Phases P0 → P8 are runnable **one at a time, in order**. Each phase ends with `npm run lint` and `npm run build` passing. P9 (Audit + Polish) is gated on every prior phase being green. Compare Mode is **deferred** (see plan.md §13) and is not in this execution sequence.

---

## How to Use This File

1. Read the **Phase Status Table** at the top — see where you are.
2. Read **exactly one phase** (P0, P1, …). Do not read ahead.
3. Tell me "execute Phase X" (or "execute X and Y"). I will:
   - Run the commands listed.
   - Create the files listed.
   - Run the verification.
   - Report back.
4. You approve or correct. We move to the next phase.

If you ever say "do everything," I will collapse P0–P8 into one build (still respecting the same order). Tell me to use the **FP-Phase 1 (consolidated)** path only if you want a single end-to-end build with checkpoints after every major section.

---

## Phase Status Table

| Phase | Topic | Plan Status | Build Status | Approval Needed |
|---|---|---|---|---|
| **P0** | Bootstrap + design tokens + folder skeleton | ✅ Planned | ✅ Done | — |
| **P1** | Shared UI primitives + shared components | ✅ Planned | ✅ Done | — |
| **P2** | Hooks + lib + types + data files | ✅ Planned | ✅ Done | — |
| **P3** | Marketing landing page (`/`) | ✅ Planned | ✅ Done | — |
| **P4** | Web app shell (`/app/*`) | ✅ Planned | ✅ Done | — |
| **P5** | Chat surface (composer + messages
+ mock AI) | ✅ Planned | ✅ Done | — |
| **P6** | History (`/app/history`) + Settings (`/app/settings`) | ✅ Planned | ✅ Done | — |
| **P7** | Chrome extension concept (`/extension/*`) | ✅ Planned | ✅ Done | — |
| **P8** | README + smoke checklist + submission gate | ✅ Planned | ❌ Not started | Approve final acceptance |
| **P9** | Senior audit + P0/P1 fix pass + final polish | ✅ Planned | ❌ Not started | Approve P0/P1 fix list |
| **CM** | Compare Mode (deferred per plan.md §13) | 🟡 Deferred | ❌ Not started | Reconfirm with you first |

**Compare Mode (CM)** is intentionally not in the execution order. Promote it only after P9 ships clean, per plan.md §13.4.

---

## Cross-Phase Constants (apply to every phase)

These are set in P0 and **must not change** in any later phase without explicit approval. They are documented here so you do not have to flip between files.

### Runtime dependencies (P0)

```
next, react, react-dom                       # from create-next-app
lucide-react                                # icons
framer-motion                               # selective animation
clsx, tailwind-merge                        # cn() helper
```

### Dev dependencies (P0)

```
typescript, @types/react, @types/node
tailwindcss, postcss, autoprefixer
eslint, eslint-config-next
prettier, prettier-plugin-tailwindcss
```

### Explicitly avoided (every phase)

- shadcn CLI / Radix wholesale install.
- Redux, Zustand, Jotai, Recoil, MobX, Valtio.
- `axios`, `react-query`, `swr`, `dotenv`-with-secrets.
- `motion-canvas`, `three`, `react-spring`.
- Any backend, database, auth, payment, real AI API, server-side API route.

### Design tokens (locked — see plan.md §5)

- Colors: black-led environment (`#080808` → `#1F1F1F`), white text (`#FFFFFF`, `#A1A1AA`, `#71717A`), single red `#EF4444` (`#DC2626` hover, `#B91C1C` active).
- Red is used **only** in six places: primary CTA fill, selected indicator (dot + 2 px left edge), focus ring, send-icon fill when composer has content, error states (via `--danger`), "Switched to model" inline notice.
- Type: Inter (UI) + JetBrains Mono (code) via `next/font/google`.
- Spacing base 4 px; allowed steps 4/8/12/16/20/24/32/40/48/64/96/128.
- Radii: 4 / 6 / 10 / 14 / full (avatars only).

### Accessibility tokens (locked)

- `--focus-ring`: 2 px `--brand-ring`, 2 px offset, applied via `:focus-visible`.
- Mobile tap target ≥ 44 × 44 px.
- Real `<button>` / `<a>` everywhere; `aria-label` on icon buttons.
- Skip-to-content link on every layout.
- `prefers-reduced-motion: reduce` collapses transforms; opacity-only remains at 80 ms.

### Responsive breakpoints (locked)

```
0 / 640 / 768 / 1024 / 1280 / 1536   # marketing + web app
380 px                              # extension popup viewport
```

### Folder skeleton (P0 creates)

```
echogpt-frontend/
├── project_rules.md                # already exists
├── plan.md                         # already exists
├── execution_plan.md               # this file
├── README.md                       # written in P8
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc.json
├── .gitignore
├── public/
│   ├── favicon.svg
│   └── og/og.png
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── page.tsx                 # /
    │   ├── (legal)/{privacy,terms}/page.tsx
    │   ├── app/{layout,page}.tsx
    │   ├── app/chat/[conversationId]/page.tsx
    │   ├── app/{history,settings}/page.tsx
    │   └── extension/{layout,page}.tsx
    │   └── extension/{history,settings}/page.tsx
    ├── components/{ui,layout,landing,chat,extension,history,settings,shared}/
    ├── data/
    ├── hooks/
    ├── lib/
    └── types/
```

### Verification gate (every phase)

```bash
npm run lint           # must pass
npm run typecheck      # if/when added (P0 also adds `tsc --noEmit` script)
npm run build          # must pass
```

If any of those fail, the phase is **not** complete. Fix before moving on.

---

# Phase 0 — Bootstrap

Create the Next.js project, install approved dependencies, write design tokens into Tailwind, copy `project_rules.md` into the repo root, create the folder skeleton with empty placeholder files (so the layout is honest from day one), and verify the build pipeline works with a placeholder landing page.

## Why this phase

Every later phase builds on P0's choices. Doing it wrong (e.g., wrong Tailwind version, wrong `tsconfig` strictness, missing no-flash theme script) creates churn across P1–P8.

## Commands to run

```bash
cd C:\project\task\echogpt-frontend

# Create the Next.js project IN PLACE (the directory already exists and contains plan.md).
# Move plan.md out, run create-next-app into a temp dir, then merge.
# This keeps plan.md / project_rules.md / execution_plan.md intact.

move plan.md ..\echogpt-frontend-plan.md
move project_rules.md ..\echogpt-frontend-rules.md
move execution_plan.md ..\echogpt-frontend-exec.md

cd ..
npx create-next-app@latest echogpt-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --use-npm

move echogpt-frontend-plan.md   echogpt-frontend\plan.md
move echogpt-frontend-rules.md  echogpt-frontend\project_rules.md
move echogpt-frontend-exec.md   echogpt-frontend\execution_plan.md

cd echogpt-frontend

# Approved runtime deps
npm install lucide-react framer-motion clsx tailwind-merge

# Approved dev deps
npm install -D prettier prettier-plugin-tailwindcss

# Add a typecheck script (create-next-app does not include one by default)
```

After `create-next-app` finishes, edit `package.json` to add a `typecheck` script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Files to create / modify

### Modify

- `package.json` — add scripts above.
- `tsconfig.json` — confirm `"strict": true` is present (create-next-app sets it by default; verify).
- `tailwind.config.ts` — replace with token-driven config (see Tokens block below).
- `src/app/globals.css` — replace with token-driven base styles (see Tokens block below).
- `src/app/layout.tsx` — load Inter + JetBrains Mono via `next/font/google`, render `<ThemeProvider>`, `<SkipToContent>`, `<SiteHeader>`, `<main>`, `<SiteFooter>`, `<ToastProvider>`. Children render into `<main id="main" tabIndex={-1}>`.
- `src/app/page.tsx` — temporary placeholder (`<h1>EchoGPT</h1><p>Bootstrap OK.</p>`). P3 replaces it.
- `src/app/not-found.tsx` — minimal 404 with link to `/`.
- `next.config.mjs` — leave defaults (no special config needed).
- `.eslintrc.json` — add anti-template rule from plan.md Appendix B.
- `.prettierrc.json` — add `prettier-plugin-tailwindcss`.
- `.gitignore` — verify `.next`, `node_modules`, `.env*.local`, etc.

### Create

- `src/lib/cn.ts` — `cn(...inputs)` = `twMerge(clsx(inputs))`.
- `src/lib/storage.ts` — typed `localStorage` wrapper (`getJSON`, `setJSON`, `remove`, namespaced keys).
- `src/lib/format.ts` — `timeAgo(epoch)` returning relative strings.
- `src/lib/id.ts` — `createId(prefix)` using `crypto.randomUUID()` with fallback.
- `src/lib/theme.ts` — `Theme = 'light' | 'dark' | 'system'`, `ResolvedTheme = 'light' | 'dark'`, key constant.
- `src/components/shared/ThemeProvider.tsx` — context provider that reads `localStorage`, listens to `prefers-color-scheme`, applies `data-theme="dark"|"light"` on `<html>`.
- `src/components/shared/ThemeToggle.tsx` — light/dark/system segmented control.
- `src/components/shared/SkipToContent.tsx` — visually-hidden focusable link → `#main`.
- `src/components/shared/Logo.tsx` — wordmark SVG (EchoGPT) using `--text-primary`.
- `src/components/shared/Container.tsx` — `max-w-[1200px] mx-auto px-4 md:px-8`.
- `src/components/shared/SectionEyebrow.tsx` — uppercase 11 px tracked label.
- `src/components/shared/MotionFadeIn.tsx` — `motion.section` with `initial`/`whileInView`/`viewport={{ once: true }}` + `useReducedMotion()`.
- `src/components/shared/SiteHeader.tsx` — sticky 64 px navbar with `Logo`, theme toggle, "Open the workspace" CTA → `/app`.
- `src/components/shared/SiteFooter.tsx` — minimal footer (filled in P3).
- `src/components/shared/ModelPill.tsx` — small provider dot + name (used in nav + model selector header).
- `src/components/shared/ExtensionFrame.tsx` — visual chrome wrapper (browser-bar + popup frame) for the landing page preview.
- `src/components/shared/ToastProvider.tsx` — minimal context (filled with toast logic in P2).
- `src/components/ui/Button.tsx` — variants `primary | secondary | ghost | icon`, sizes `sm | md | lg`.
- `src/components/ui/IconButton.tsx` — square button, mandatory `aria-label`, 44 px on mobile.
- `src/components/ui/Card.tsx` — border + radius 10, padding 20–24, no shadow.
- `src/components/ui/Badge.tsx` — neutral / brand / outline.
- `src/components/ui/Kbd.tsx` — `kbd` styling.
- `src/components/ui/Input.tsx` — input with focus ring + error state.
- `src/components/ui/Textarea.tsx` — auto-grow helper.
- `src/components/ui/Label.tsx` — accessible label.
- `src/components/ui/Field.tsx` — label + control + helper text wrapper.
- `src/components/ui/Avatar.tsx` — initial-based avatar.
- `src/components/ui/Tooltip.tsx` — Radix-free, simple title + delay.
- `src/components/ui/Dropdown.tsx` — Radix-free, keyboard-navigable, used by model selector.
- `src/components/ui/Modal.tsx` — focus trap, Esc, click-outside, `tone="danger"` variant stub.
- `src/components/ui/Skeleton.tsx` — pulsing neutral block.
- `src/components/ui/VisuallyHidden.tsx` — `.sr-only`.
- `public/favicon.svg` — simple `E` mark.
- `public/og/og.png` — placeholder 1200×630.

### Empty placeholder files (so the skeleton is honest)

For every folder under `src/components/{ui,layout,landing,chat,extension,history,settings,shared}` create a `.gitkeep` so the directory exists in the repo.

### Tokens block — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          card: 'var(--bg-card)',
          hover: 'var(--bg-hover)',
          active: 'var(--bg-active)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        fg: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        brand: {
          DEFAULT: 'var(--brand)',
          hover: 'var(--brand-hover)',
          active: 'var(--brand-active)',
          subtle: 'var(--brand-subtle)',
          ring: 'var(--brand-ring)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          bg: 'var(--danger-bg)',
        },
        success: {
          DEFAULT: 'var(--success)',
          bg: 'var(--success-bg)',
        },
      },
      borderRadius: { card: '10px', control: '6px', modal: '14px' },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '720px',
        container: '1200px',
        settings: '640px',
      },
      transitionDuration: {
        instant: '80ms',
        fast: '120ms',
        DEFAULT: '200ms',
        slow: '280ms',
        section: '360ms',
      },
    },
  },
  plugins: [],
};
export default config;
```

### Tokens block — `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-base: #080808;
  --bg-elevated: #0a0a0a;
  --bg-card: #101010;
  --bg-hover: #171717;
  --bg-active: #1f1f1f;
  --border: #1f1f1f;
  --border-strong: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --brand: #ef4444;
  --brand-hover: #dc2626;
  --brand-active: #b91c1c;
  --brand-subtle: rgba(239, 68, 68, 0.10);
  --brand-ring: rgba(239, 68, 68, 0.40);
  --danger: #f87171;
  --danger-bg: rgba(248, 113, 113, 0.08);
  --success: #22c55e;
  --success-bg: rgba(34, 197, 94, 0.08);
  --focus-ring: 0 0 0 2px var(--brand-ring);
}

[data-theme='light'] {
  --bg-base: #ffffff;
  --bg-elevated: #fafafa;
  --bg-card: #ffffff;
  --bg-hover: #f4f4f5;
  --bg-active: #e4e4e7;
  --border: #e4e4e7;
  --border-strong: #d4d4d8;
  --text-primary: #0a0a0a;
  --text-secondary: #52525b;
  --text-muted: #71717a;
}

* { box-sizing: border-box; }
html, body { background: var(--bg-base); color: var(--text-primary); }
body { font-family: var(--font-inter), system-ui, sans-serif; }

:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: 4px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.time { font-variant-numeric: tabular-nums; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 80ms !important; transition-property: opacity, color, background-color, border-color !important; }
}
```

### No-flash inline script (in `src/app/layout.tsx`)

```tsx
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('echogpt:theme:v1');
    var theme = stored ? JSON.parse(stored).value : 'system';
    var resolved = theme;
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            <SkipToContent />
            <SiteHeader />
            <main id="main" tabIndex={-1}>{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

(Final layout adds `next/font` wrappers; this is the structure.)

## Verification

```bash
npm run lint           # passes
npm run typecheck      # passes
npm run build          # passes
npm run dev            # http://localhost:3000 renders "EchoGPT — Bootstrap OK."
```

Manually:

- Toggle theme: cycles light / dark / system, persists across reload, no flash.
- Tab from address bar: skip-link appears first.
- `?theme=dark` is not implemented; ignore.

## Success criteria

1. Repo layout matches plan.md §3.
2. `tailwind.config.ts` has tokens; `globals.css` has CSS variables; theme switch flips `data-theme`.
3. `next/font` loads Inter + JetBrains Mono.
4. ESLint anti-template rule (Appendix B) is active (try writing `className="bg-gradient-to-r"` somewhere — lint fails).
5. `npm run lint`, `npm run typecheck`, `npm run build` all pass.
6. No `any`, no raw hex/px in components except the token block.

## Stop condition

Report: files created, lines per file (rough), verification output, screenshot of `/` showing placeholder + theme toggle. Wait for approval before P1.

---

# Phase 1 — UI Primitives + Shared Components

Build every primitive that P3 (Landing) needs. None of this is "design-system heavy." Each component is small, typed, and only used because a later phase references it.

## Why this phase

P3, P4, P5, P6, P7 all import from `components/ui/*` and `components/shared/*`. Building them after P3 would mean retrofitting — much worse than a single dedicated phase.

## Files to create

(All paths under `src/`.)

### UI primitives

- `components/ui/Button.tsx` — variants, sizes, focus ring, `aria-disabled`.
- `components/ui/IconButton.tsx` — square, mandatory `aria-label`, mobile 44 px slot.
- `components/ui/Card.tsx` — `border border-border rounded-card p-5 md:p-6 bg-bg-card`.
- `components/ui/Badge.tsx` — neutral / brand / outline; height 22.
- `components/ui/Kbd.tsx` — `<kbd>` styling.
- `components/ui/Input.tsx` — controlled input + error + helper text.
- `components/ui/Textarea.tsx` — auto-grow to N lines, then internal scroll.
- `components/ui/Label.tsx` — paired with `htmlFor`.
- `components/ui/Field.tsx` — composes Label + control + helper/error text.
- `components/ui/Avatar.tsx` — initials, neutral bg, `rounded-full`.
- `components/ui/Tooltip.tsx` — hover/focus with 200 ms delay, `role="tooltip"`.
- `components/ui/Dropdown.tsx` — keyboard-navigable (`↑ ↓ Enter Esc`), `role="menu"`/`role="menuitem"`.
- `components/ui/Modal.tsx` — focus trap, Esc close, click-outside close, `tone="danger"` variant stub.
- `components/ui/Skeleton.tsx` — pulsing neutral block.
- `components/ui/VisuallyHidden.tsx` — `.sr-only` wrapper.

### Shared components

- `components/shared/ThemeProvider.tsx` — context, `useTheme()` hook, listens to `prefers-color-scheme`, persists `localStorage`.
- `components/shared/ThemeToggle.tsx` — segmented control, light / dark / system icons.
- `components/shared/SkipToContent.tsx` — first tab stop.
- `components/shared/Logo.tsx` — wordmark SVG.
- `components/shared/Container.tsx` — width helper.
- `components/shared/SectionEyebrow.tsx` — uppercase label.
- `components/shared/MotionFadeIn.tsx` — Framer Motion section reveal with `useReducedMotion()`.
- `components/shared/SiteHeader.tsx` — sticky navbar.
- `components/shared/SiteFooter.tsx` — placeholder footer (P3 fills).
- `components/shared/ModelPill.tsx` — provider dot + name.
- `components/shared/ExtensionFrame.tsx` — visual chrome wrapper.
- `components/shared/ToastProvider.tsx` — context only; full logic in P2.

### Hooks (P1 ships minimal versions; P2 fills the rest)

- `hooks/use-hydrated.ts` — `useHydrated(): boolean` (gate every `localStorage` read).
- `hooks/use-theme.ts` — re-exported from ThemeProvider for convenience.
- `hooks/use-toast.ts` — minimal `pushToast(item)` for use later.

### Types

- `types/ui.ts` — `Variant`, `Size`, `Tone` enums.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual:

- Storybook is **not** in scope. Smoke by importing each primitive into `src/app/page.tsx` placeholder grid (delete after verification).
- Tab through every interactive primitive; confirm focus ring.
- Toggle theme; verify every primitive respects `data-theme`.

## Success criteria

1. Every primitive in the Files list exists and is exported.
2. Every primitive respects theme tokens.
3. No raw hex/px in any primitive body (only the global token block).
4. `aria-label` enforced in `IconButton` (TS-level or runtime warning).
5. Lint + typecheck + build pass.

## Out of scope

- Marketing-specific components (P3).
- Chat pieces (P4–P5).
- Extension pieces (P7).

## Stop condition

Report: count of primitives shipped, total lines (rough), verification output, one screenshot of the verification grid in both themes. Wait for approval before P2.

---

# Phase 2 — Hooks, lib, types, data

Build all the cross-cutting plumbing that the surfaces will import. **No UI work.** This phase is "library code."

## Why this phase

Mock AI, conversation persistence, preferences, formatting, debounce, focus trap — none of these are surfaces. Building them now keeps P3–P7 free of `lib/*` work.

## Files to create

### `src/lib/`

- `lib/cn.ts` — `cn(...inputs: ClassValue[])`.
- `lib/storage.ts` — namespaced typed JSON storage (`echogpt:*`).
- `lib/format.ts` — `timeAgo`, `formatDate`, `formatNumber`.
- `lib/id.ts` — `createId(prefix)`.
- `lib/debounce.ts` — `debounce(fn, ms)`.
- `lib/theme.ts` — `Theme`, `ResolvedTheme`, default value.
- `lib/build-info.ts` — reads `package.json` version at build time.
- `lib/group-conversations.ts` — `groupConversations(list): { today, yesterday, last7, last30, older }`.
- `lib/variants.ts` — discriminated `variant: 'default' | 'compact' | 'narrow'`.
- `lib/quick-action-registry.ts` — typed `QuickAction` registry keyed by `QuickActionId`.
- `lib/mock-ai.ts` — `generateMockResponse(prompt, model, signal?)`.

### `src/hooks/`

- `hooks/use-hydrated.ts` — already shipped in P1; verify import path.
- `hooks/use-theme.ts` — `useTheme(): { theme, resolvedTheme, setTheme }`.
- `hooks/use-conversations.ts` — `useConversations(): { conversations, create, appendMessage, replaceLastAssistant, reset }` backed by `localStorage`.
- `hooks/use-conversation.ts` — single conversation by id.
- `hooks/use-active-conversation.ts` — uses URL params.
- `hooks/use-active-model.ts` — URL `?model=<id>`, falls back to preferences.
- `hooks/use-preferences.ts` — `usePreferences(): { preferences, update }` backed by `localStorage`.
- `hooks/use-media-query.ts` — `useMediaQuery(query): boolean`.
- `hooks/use-keyboard-shortcut.ts` — `useKeyboardShortcut(combo, handler)`.
- `hooks/use-toast.ts` — `useToast(): { toasts, pushToast, dismiss }`.
- `hooks/use-focus-trap.ts` — `useFocusTrap(ref, active)` for modals/drawers.
- `hooks/use-lock-body-scroll.ts` — `useLockBodyScroll(active)`.
- `hooks/use-chat-stream.ts` — wires `generateMockResponse` + `AbortController`, returns `{ send, regenerate, abort, status }`.

### `src/types/`

- `types/chat.ts` — `ModelId`, `Model`, `Message`, `Conversation`.
- `types/ui.ts` — variant + size unions.
- `types/extension.ts` — `ExtensionView = 'prompt' | 'conversation' | 'history' | 'settings'`.

### `src/data/`

- `data/models.ts` — `MODELS` array (generic labels per plan.md §7.2), `MODEL_MAP` lookup, `DEFAULT_MODEL`.
- `data/conversations.ts` — `SEED_CONVERSATIONS`, `createEmptyConversation()`, `titleFromPrompt()`.
- `data/messages.ts` — `SEED_MESSAGES`, `buildUserMessage()`, `buildAssistantMessage()`.
- `data/quick-actions.ts` — five actions (Summarize / Explain / Rewrite / Translate / Debug code).
- `data/example-prompts.ts` — three example prompts for the empty workspace.
- `data/keyboard-shortcuts.ts` — six reference shortcuts.
- `data/empty-copy.ts` — every empty-state string centralized.
- `data/features.ts` — five feature blocks for the landing page.
- `data/faq.ts` — six Q&A pairs (answers ≤ 80 words).
- `data/nav.ts` — `LANDING_NAV`, `LEGAL_NAV`, `FOOTER_LINKS`.
- `data/preview-messages.ts` — frozen messages for the landing product preview.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual:

- `node -e "require('./lib/mock-ai.ts')"` is **not** possible — TS. Skip.
- Create a temporary `scripts/smoke-mock-ai.mjs` (not committed) that imports the compiled lib and prints one response. Then delete the script.
- `localStorage` writes happen on hook mounts — verify by opening DevTools → Application → Local Storage after navigating to `/app` (P5) or after a manual test page.

## Success criteria

1. Every file above exists, has zero `any`, exports typed API.
2. `generateMockResponse` returns realistic EchoGPT-voiced responses with 400–900 ms latency.
3. `useConversations` writes to `localStorage` on every mutation; reload preserves state.
4. `useTheme` writes to `localStorage`; reload applies theme with no flash.
5. `usePreferences` writes to `localStorage`; default model flows through.
6. Lint + typecheck + build pass.

## Out of scope

- UI components (P3–P7).
- Route files (P3, P4, P6, P7).

## Stop condition

Report: file count per area (`lib/`, `hooks/`, `data/`, `types/`), total rough lines, sample mock-ai output for a sample prompt, sample groupConversations output. Wait for approval before P3.

---

# Phase 3 — Marketing Landing Page

`/` only. Server-rendered where possible. Real components reused in the product preview (no mirror files). All eleven sections in the locked order (plan.md §6.2).

## Why this phase

Landing is the recruiter's first impression. It also forces every shared primitive through its paces before they hit a real surface.

## Files to create / modify

### Modify

- `src/app/page.tsx` — replace placeholder with the eleven sections in order.

### Create

- `components/landing/LandingHero.tsx`
- `components/landing/ProductPreview.tsx` — renders `<Message>`, `<PromptComposer>`, `<MessageActions>`, `<QuickActions>` via `<ProductPreviewProvider>` (frozen state). **No `lp/preview/*` mirror.**
- `components/landing/FeaturesGrid.tsx` — five blocks from `data/features.ts`.
- `components/landing/ModelsStrip.tsx` — five `<ModelPill>` items + description.
- `components/landing/HowItWorks.tsx` — three steps.
- `components/landing/WhyEchoGPT.tsx` — comparison-style block ("what it does / doesn't do").
- `components/landing/ExtensionSection.tsx` — `<ExtensionFrame>` wrapping a real `<ExtensionPromptView>` mounted via `next/dynamic({ ssr: false })`.
- `components/landing/FAQ.tsx` — controlled accordion, six items, subhead locked per Appendix C.
- `components/landing/FinalCTA.tsx` — large CTA card.
- `components/landing/LandingFooter.tsx` — fills `SiteFooter` content.
- `components/landing/ProductPreviewProvider.tsx` — supplies frozen state to the preview.
- `components/landing/landing-nav.tsx` — small client island for the mobile menu drawer.
- `components/landing/NavMenu.tsx` — desktop nav links.
- `components/landing/MobileNav.tsx` — drawer.

### Routes

- `src/app/(legal)/privacy/page.tsx` — minimal privacy page.
- `src/app/(legal)/terms/page.tsx` — minimal terms page.

### Section subheads (locked per Appendix C)

| Section | Subhead |
|---|---|
| Hero | "Switch models without losing your place." |
| ProductPreview | (none) |
| Features | "A workspace built around the prompt, not the dashboard." |
| AI Models | "Five models. One composer. Switch mid-thread." |
| How it works | "Three steps. No setup." |
| Why EchoGPT | "What it does, and what it doesn't do." |
| Extension | "Ask from any tab. Read in this tab. Skip the round trip." |
| FAQ | (none) |
| Final CTA | "Open the workspace." |

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual smoke:

- 360 / 768 / 1024 / 1440 widths. Light + dark. With + without reduced-motion.
- Tab through navbar → hero CTA → feature blocks → FAQ → final CTA. Focus ring everywhere.
- Product preview's "Send" button is **disabled** (preview is frozen); copy/regenerate are visual only.
- Extension section: popup renders inside the frame at 380 px.

## Success criteria

1. All eleven sections render at every breakpoint in both themes.
2. Theme toggle works; persists; no flash.
3. Product preview is built from real components, not an image or mirror.
4. FAQ accordion uses real `<button>` with `aria-expanded`.
5. Red used only in six approved places.
6. No gradients, no glass, no `shadow-2xl` outside modals, no `rounded-3xl` on cards, no orange/purple/blue/pink.
7. Lint + typecheck + build pass.

## Out of scope

- Web app surfaces (`/app/*`).
- Extension popup routes (`/extension/*`).
- Real product preview interaction (typing, model switching).

## Stop condition

Report: section count, total rough lines, screenshots at 360 / 1024 / 1440 in dark theme. Wait for approval before P4.

---

# Phase 4 — Web App Shell

`/app/*` layout only. Sidebar (260 / 64 / drawer), main area placeholder, route skeleton for chat/history/settings. **No chat surface yet** (P5).

## Why this phase

Building the shell first means P5 only edits the main area. Less risk of accidental layout regressions.

## Files to create / modify

### Modify

- `src/app/app/layout.tsx` — `<AppShell>` wraps children; `<SkipToContent>` already global but also accept main `id="main"` here.
- `src/app/app/page.tsx` — renders `<AppShell>` directly. **No redirect.** This IS the empty workspace.
- `src/app/app/chat/[conversationId]/page.tsx` — placeholder ("Conversation not found" panel for unknown ids).
- `src/app/app/history/page.tsx` — placeholder.
- `src/app/app/settings/page.tsx` — placeholder.

### Create

- `components/chat/AppShell.tsx` — composes sidebar + main + footer.
- `components/chat/AppHeader.tsx` — title row, model selector slot (P5 fills).
- `components/chat/AppSidebar.tsx` — desktop 260 / tablet 64 / mobile drawer.
- `components/chat/CollapsedSidebar.tsx` — 64 px icon-only.
- `components/chat/MobileDrawer.tsx` — focus trap, Esc, body scroll lock.
- `components/chat/SearchInput.tsx` — search field, debounced.
- `components/chat/ConversationList.tsx` — grouped by date.
- `components/chat/ConversationRow.tsx` — title + model + time; active state (red dot + edge).
- `components/chat/SidebarSectionLabel.tsx` — "Today", "Yesterday", etc.
- `components/chat/SidebarFooter.tsx` — Settings + History + Theme toggle.
- `components/chat/NewChatButton.tsx` — primary action at top of sidebar.
- `components/chat/EmptyShellState.tsx` — placeholder for main area before P5 lands.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual smoke:

- 360 / 768 / 1024 / 1440 widths. Light + dark.
- `/app` renders sidebar + empty main area + composer placeholder. **No redirect.**
- Sidebar navigation works between `/app`, `/app/history`, `/app/settings`.
- Active row uses `--brand-subtle` + red dot + 2 px red left edge.
- Mobile drawer: opens, traps focus, Esc closes, focus restored.
- `/app/chat/<bogus-id>` shows "Conversation not found" panel with link back.

## Success criteria

1. `/app` is the empty workspace itself (no redirect).
2. Desktop 260 px sidebar, tablet 64 px, mobile drawer — all three verified.
3. Drawer accessibility: focus trap, Esc, focus restore, reduced-motion.
4. Active sidebar row is visually distinct (red dot + edge, not a full red fill).
5. Lint + typecheck + build pass.

## Out of scope

- Composer, messages, mock AI wiring (P5).
- Real history search (P6).
- Real settings form (P6).

## Stop condition

Report: shell layout screenshot at three widths, active-row close-up screenshot. Wait for approval before P5.

---

# Phase 5 — Chat Surface (Composer + Messages + Mock AI)

End-to-end conversation experience. Sending produces a realistic mock response. Copy / Regenerate / Quick Actions / Model Switch work. Empty / Loading / Error states render correctly.

## Why this phase

This is the core of the assignment. Once this phase ships, the product is functionally complete.

## Files to create / modify

### Modify

- `src/app/app/chat/[conversationId]/page.tsx` — loads conversation; falls back to "not found" panel.
- `src/app/app/page.tsx` — empty workspace now uses `<EmptyState>` + composer.
- `components/chat/AppShell.tsx` — main area accepts a `surface` slot.

### Create

- `components/chat/ModelSelector.tsx` — dropdown with provider dot, name, capabilities; selected row uses red dot + edge.
- `components/chat/ModelSwitchedNotice.tsx` — auto-dismiss 4 s, `aria-live="polite"`, Esc dismisses.
- `components/chat/ChatHeader.tsx` — title + model selector + (compare slot — empty for now, deferred per plan.md §13).
- `components/chat/EmptyState.tsx` — three example prompts from `data/example-prompts.ts`.
- `components/chat/Message.tsx` — user / assistant bubble; code blocks; hover actions on assistant.
- `components/chat/MessageActions.tsx` — Copy / Regenerate; toast on Copy; throttle on Regenerate.
- `components/chat/StreamingIndicator.tsx` — three pulsing dots, `role="status"`.
- `components/chat/LoadingState.tsx` — used inside assistant bubble during streaming.
- `components/chat/ErrorState.tsx` — `role="alert"`, Retry button.
- `components/chat/ConversationNotFoundPanel.tsx` — used by `/app/chat/<bogus-id>`.
- `components/chat/ChatSurface.tsx` — composes header + messages + composer.
- `components/chat/PromptComposer.tsx` — auto-grow textarea + Send + quick actions.
- `components/chat/QuickActions.tsx` — five quick actions (Summarize / Explain / Rewrite / Translate / Debug code).
- `components/chat/SendButton.tsx` — red primary, disabled when empty or pending.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual smoke:

- 360 / 768 / 1024 / 1440 widths. Light + dark.
- Empty workspace shows three example prompts. Clicking one fills the composer and submits.
- Sending creates a conversation, navigates to `/app/chat/<new-id>`, shows user message, then loading, then assistant.
- Copy works → toast confirms.
- Regenerate replaces last assistant message.
- Each quick action injects a prefixed prompt.
- Switching model updates URL `?model=` and shows "Switched to X" notice.
- Reduced-motion: streaming becomes opacity-only.
- Mobile: composer docked at bottom; safe-area respected.

## Success criteria

1. End-to-end send flow works in both themes and at every breakpoint.
2. `localStorage` persists; reload restores conversation.
3. Copy / Regenerate / Quick Actions / Model Switch all work as specified.
4. `aria-live="polite"` on assistant bubble; `role="alert"` on errors; reduced-motion respected.
5. Red used only in six approved places.
6. Lint + typecheck + build pass.

## Out of scope

- Real history search UI (P6).
- Real settings form (P6).
- Compare mode (deferred).
- Real keyboard shortcuts overlay.

## Stop condition

Report: end-to-end send video / screenshot sequence, regenerated message screenshot, mobile composer screenshot. Wait for approval before P6.

---

# Phase 6 — History + Settings

Replaces the two P4 placeholders with the real views. `/app/history` ships a debounced search + grouped conversation list with empty / no-results states. `/app/settings` ships six functional sections (Appearance, Default Model, Interface, Keyboard Shortcuts, Data, About) backed by `usePreferences` / `useTheme`. Reset Workspace uses a danger-toned modal that wipes `localStorage` and routes back to the empty `/app`. **Adds `src/components/ui/Toggle.tsx`** as a shared switch primitive so the three Interface controls don't duplicate themselves.

## Why this phase

These are the "polish of completeness" surfaces. After P6 the web app is fully featured.

## Files to create / modify

### Modify

- `src/app/app/history/page.tsx` — replace placeholder with `<HistoryView>`.
- `src/app/app/settings/page.tsx` — replace placeholder with `<SettingsView>`.

### Create

#### History

- `components/history/HistoryHeader.tsx` — title + count.
- `components/history/HistorySearch.tsx` — debounced search input.
- `components/history/HistoryGroup.tsx` — one date group.
- `components/history/HistoryResultCount.tsx` — "N results".
- `components/history/HistoryEmpty.tsx` — "No conversations yet" CTA → empty workspace.
- `components/history/HistoryNoResults.tsx` — "No results for X".
- `components/history/HistoryView.tsx` — composes the above.

#### Settings

- `components/settings/SettingsSection.tsx` — section wrapper (title + body + caption).
- `components/settings/SettingsView.tsx` — composes six sections.
- `components/settings/AppearanceSection.tsx` — Theme toggle (light/dark/system).
- `components/settings/DefaultModelSection.tsx` — ModelSelector.
- `components/settings/InterfaceSection.tsx` — Density, Show model badge, Send on Enter, Stream replies.
- `components/settings/KeyboardShortcutsSection.tsx` — six `<Kbd>` rows from `data/keyboard-shortcuts.ts`.
- `components/settings/DataSection.tsx` — Clear all data → opens `ResetConfirmModal`.
- `components/settings/ResetConfirmModal.tsx` — `tone="danger"`, focus trap, "Reset" CTA.
- `components/settings/AboutSection.tsx` — version (from `build-info.ts`) + description + GitHub link.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual smoke:

- `/app/history` empty state renders for fresh localStorage.
- `/app/history` search filters live; "No results" appears when no match.
- `/app/settings` switches theme instantly; no flash on reload.
- Default model change flows into the empty workspace composer.
- Reset confirmation modal traps focus; on confirm wipes `localStorage` and routes to `/app`.
- Every section uses real `<input>` / `<button>` / `<a>` — no clickable divs.

## Success criteria

1. `/app/history` empty + populated + searching + no-results all render correctly.
2. `/app/settings` six sections all work.
3. Reset wipes everything and routes to `/app` (empty workspace, not a redirect to `/app/chat/new`).
4. Lint + typecheck + build pass.

## Out of scope

- Edit / delete / pin / rename conversations.
- Export / import.
- Real keyboard-shortcut handling (only reference UI).

## Stop condition

Report: history empty state screenshot, history no-results screenshot, settings six-section screenshot, reset modal screenshot. Wait for approval before P7.

---

# Phase 7 — Chrome Extension Concept

Adds the third surface — a 380 × 560 popup reachable at `/extension`, `/extension/history`, and `/extension/settings`. Reuses the shared `localStorage` store (`useConversations` / `usePreferences` / `useTheme`) so the popup and the web app are effectively the same workspace, just framed differently. Sends from the popup create conversations that appear in `/app/history`; resets from the popup clear localStorage and bounce the user back inside the popup. Conversation view uses a `?conversation=<id>` query-param so the popup stays a single route with a slide-over state. Real send + mock-stream pipeline reused from `<ChatSurface />`.

## Why this phase

The extension is the third surface. It must feel native to a narrow viewport — not a shrunk desktop layout.

## Files to create / modify

### Modify (variants on existing components)

- `components/chat/Message.tsx` — add `variant?: 'default' | 'compact'`.
- `components/chat/ConversationRow.tsx` — add `variant?: 'default' | 'compact'`.
- `components/chat/EmptyState.tsx` — add `variant?: 'default' | 'compact'`.
- `components/chat/ModelSelector.tsx` — add `size?: 'md' | 'sm'`.
- `components/history/HistoryView.tsx` — add `variant?: 'default' | 'narrow'`.
- `components/settings/{SettingsSection,AppearanceSection,DataSection,AboutSection}.tsx` — add `variant?: 'default' | 'narrow'`.

### Modify (existing layout slots)

- `components/landing/ExtensionSection.tsx` — embed live `<ExtensionPromptView>` via `next/dynamic({ ssr: false })`.

### Create

- `app/extension/layout.tsx` — 380 px frame, no global header/footer.
- `app/extension/page.tsx` — `<ExtensionPromptView>`.
- `app/extension/history/page.tsx` — `<ExtensionHistoryView>`.
- `app/extension/settings/page.tsx` — `<ExtensionSettingsView>`.
- `components/extension/ExtensionPopupLayout.tsx` — header + view switcher + body + composer (where applicable).
- `components/extension/ExtensionHeader.tsx` — title + back + theme toggle.
- `components/extension/ExtensionViewSwitcher.tsx` — pill nav: Prompt / History / Settings.
- `components/extension/ExtensionBackBar.tsx` — for sub-routes.
- `components/extension/ExtensionPromptView.tsx` — recent list + composer + quick actions.
- `components/extension/ExtensionConversationView.tsx` — when a recent item is selected.
- `components/extension/ExtensionRecentList.tsx` — caps at 5 rows.
- `components/extension/ExtensionMessageBubble.tsx` — compact variant.
- `components/extension/ExtensionComposer.tsx` — auto-grows to 3 lines.
- `components/extension/ExtensionEmptyState.tsx` — compact variant.
- `components/extension/ExtensionHistoryView.tsx` — narrow variant of HistoryView.
- `components/extension/ExtensionSettingsView.tsx` — narrow variant of SettingsView.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Manual smoke:

- 360 / 380 / 414 viewports. Light + dark.
- `/extension` shows header, recent list, composer, quick actions.
- Send produces a mock response and persists to shared storage (visible on `/app/history` after).
- `/extension/history` and `/extension/settings` are full routes with back arrows.
- Theme, default model, stream replies, clear data all sync with web app.
- Quick actions inject prompts in the popup composer.
- `?conversation=<id>` opens the conversation view.

## Success criteria

1. Three routes render at 360 / 380 / 414.
2. Shared storage confirmed (send on web → appears in extension history).
3. Real `<button>` / `<a>`; focus rings; reduced-motion respected.
4. Lint + typecheck + build pass.

## Out of scope

- Real `manifest.json`, service worker, content script, Chrome APIs.
- Real AI integration.
- Cross-device sync.
- Page-context integration.

## Stop condition

Report: three-route screenshot tour at 380 px, shared-storage demo screenshot. Wait for approval before P8.

---

# Phase 8 — README + Smoke Checklist + Submission Gate

Write `README.md` from plan.md Appendix A **verbatim**. Run the smoke checklist (plan.md §19). Confirm the submission acceptance gate (plan.md §20).

## Why this phase

Without a README, the submission is incomplete. Without a manual smoke pass, hidden regressions slip into P9.

## Files to create / modify

### Create

- `README.md` — exact content of plan.md Appendix A.

### Run

The smoke checklist from plan.md §19. Document results in `docs/smoke-report.md` (created in this phase).

```bash
npm run lint
npm run typecheck
npm run build
```

### Verify

- All twelve routes in plan.md §19 render at every breakpoint in both themes.
- All twelve functional items in plan.md §19 work.
- All four accessibility items in plan.md §19 hold.
- All six anti-template items in plan.md §19 hold.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Plus manual smoke pass against plan.md §19.

## Success criteria

1. `README.md` matches Appendix A verbatim.
2. Every route in plan.md §19 passes.
3. Every functional item in plan.md §19 passes.
4. Lint + typecheck + build pass.

## Out of scope

- P0/P1 fix work (that is P9).

## Stop condition

Report: smoke checklist results table, screenshots of each route at 360 / 1024 / 1440 in dark, README word count. Wait for approval before P9.

---

# Phase 9 — Senior Audit + P0/P1 Fix Pass + Final Polish

Re-run the senior audit from plan.md §16 **at code level** (not plan level). Produce a fresh P0/P1/P2 list. Fix every P0. Address or explicitly defer every P1. Apply the polish checklist (plan.md §18).

## Why this phase

This is the final quality gate. After P9, the project is shippable.

## Files

Audit-driven. The list emerges from the audit. Likely candidates (from plan.md §16.2 / §16.3):

- README content is now written (P0-1 done).
- ProductPreview reuses real components (P0-3 done in P3).
- SkipToContent on every layout (P0-4 done in P0).
- Empty copy centralized (P0-5 done in P2).
- ESLint anti-template rule (P0-6 done in P0).
- Quick-action registry (P1-1 done in P2).
- Variants as discriminated union (P1-2 done in P1).
- Hydration gate (P1-3 done in P1/P2).
- `aria-live` placement (P1-4 done in P5).
- AbortController on streams (P1-5 done in P2).
- Mobile tap target (P1-6 done in P1).
- Framer reduction (P1-7 done across phases).
- Disabled tokens (P1-8 done in P0).
- Auto-dismiss notice (P1-9 done in P5).
- Locked subheads (P1-10 done in P3).

If the audit reveals new issues, fix them in this phase.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

Plus full plan.md §19 smoke pass.

## Success criteria

1. Submission acceptance gate (plan.md §20) is satisfied.
2. P0 list from the fresh audit is empty.
3. P1 list is empty or explicitly listed in the README's "Future Improvements."
4. P2 list is empty or listed in the README's "Future Improvements."
5. Lint + typecheck + build pass.

## Stop condition

Report: fresh audit table (P0/P1/P2), submission acceptance gate status, screenshots, final build output. **Project is ready to ship.**

---

# Deferred — Compare Mode (CM)

Status: **deferred per plan.md §13.** Promotion criteria in plan.md §13.4:

- All P0–P9 phases ship clean.
- Smoke checklist (plan.md §19) passes.
- Implementation budget remains (suggested: ≤ 1 day).
- The Compare Mode plan (plan.md §13) is reconfirmed with you before any code lands for it.

If promoted, the implementation unit is plan.md §13.2 / §13.3. Until then, no `?compare=1` handling is wired and no `Compare*` components exist.

---

# Final Note

Every phase above respects the locked constraints:

- **No backend.** No DB. No auth. No payment. No real AI API.
- **Mock/local data only.**
- **Server Components by default.** `"use client"` only on islands.
- **No `any`.** No `unknown` without narrowing.
- **Red in six places only.**
- **No over-engineering.** Abstractions only when reused.

When you tell me which phase to execute, I will run the exact commands and create the exact files in this file. Nothing more, nothing less.

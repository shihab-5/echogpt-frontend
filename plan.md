# EchoGPT Frontend Redesign — Master Plan

> Living planning document for the AppifyDevs Frontend Engineering Internship assignment. This file is the single source of truth for **what** to build, **how** to build it, and **how** to ship it. It is not the brief — the brief lives in `project_rules.md`.
>
> **Working rule (locked, do not violate).** "Do not start the project first — add them into file and divide into phase." Every phase below is a **plan**, not an execution. The deliverable for each phase is the file plan plus the listed files. Hard stop and report after each phase; do not run `create-next-app`, `npm install`, or `npm run build` until that specific phase is explicitly approved.

---

## Index

**Part A — Foundations**

- [§1 Repository Snapshot](#1-repository-snapshot)
- [§2 Routes (locked)](#2-routes-locked)
- [§3 Folder Structure (target)](#3-folder-structure-target)
- [§4 Constraints (locked)](#4-constraints-locked)

**Part B — Design system, UX, data**

- [§5 Design System (locked)](#5-design-system-locked)
- [§6 UX Specification](#6-ux-specification)
- [§7 Data & State Architecture](#7-data--state-architecture)

**Part C — Implementation phases**

- [§8 Phase Map](#8-phase-map)
- [§9 Landing Page](#9-landing-page)
- [§10 Web App Shell](#10-web-app-shell)
- [§11 Web App Surface (chat)](#11-web-app-surface-chat)
- [§12 History + Settings](#12-history--settings)
- [§13 Compare Mode (deferred)](#13-compare-mode-deferred)
- [§14 Chrome Extension Concept](#14-chrome-extension-concept)
- [§15 Final Polish Phase (FP-Phase 1)](#15-final-polish-phase-fp-phase-1)

**Part D — Quality & submission**

- [§16 Senior Frontend Audit](#16-senior-frontend-audit)
- [§17 P0/P1 Fix Plan](#17-p0p1-fix-plan)
- [§18 Polish Checklist](#18-polish-checklist)
- [§19 Smoke Checklist](#19-smoke-checklist)
- [§20 Submission Acceptance Gate](#20-submission-acceptance-gate)
- [§21 Status](#21-status)

**Appendices**

- [Appendix A — README content (verbatim)](#appendix-a--readme-content-verbatim)
- [Appendix B — Anti-template ESLint rule](#appendix-b--anti-template-eslint-rule)
- [Appendix C — Locked section subheads](#appendix-c--locked-section-subheads)

---

# Part A — Foundations

## 1. Repository Snapshot

- **Working directory:** `C:\project\task\echogpt-frontend`
- **Repo state:** empty except for `project_rules.md` (the master brief) and this `plan.md`. No framework, no `package.json`, no lockfile, no source files.
- **Bootstrap target:** current stable Next.js (App Router, TypeScript strict), Tailwind, ESLint, `src/` directory, `@/*` import alias, npm. Do not pin to an older major version; use whatever `create-next-app@latest` produces at execution time.
- **What this document is NOT:** a build script, a dependency manifest, or a substitute for code. It is the planning artifact.

## 2. Routes (locked)

| Route | Surface | Notes |
|---|---|---|
| `/` | Marketing landing | Server-rendered, single CTA |
| `/privacy` | Legal | `(legal)` route group |
| `/terms` | Legal | `(legal)` route group |
| `/app` | Chat shell | The empty/new chat workspace itself. Renders the sidebar + an empty main area with `EmptyState` and the composer. |
| `/app/chat/[id]` | Conversation | Existing conversation loaded by id. |
| `/app/history` | History | Full search/filter |
| `/app/settings` | Settings | Theme, model, shortcuts, data, about |
| `/extension` | Extension popup | 380 × 560 viewport |
| `/extension/history` | Extension history | Narrow variant |
| `/extension/settings` | Extension settings | Narrow variant |

`not-found.tsx` at the root handles 404.

## 3. Folder Structure (target)

```
echogpt-frontend/
├── project_rules.md
├── plan.md
├── README.md
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc.json
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── og/og.png
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── page.tsx                    # /
    │   ├── (legal)/
    │   │   ├── privacy/page.tsx
    │   │   └── terms/page.tsx
    │   ├── app/
    │   │   ├── layout.tsx              # AppShell
    │   │   ├── page.tsx                # redirect
    │   │   ├── chat/[conversationId]/page.tsx
    │   │   ├── history/page.tsx
    │   │   └── settings/page.tsx
    │   └── extension/
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── history/page.tsx
    │       └── settings/page.tsx
    ├── components/
    │   ├── ui/                         # design-system primitives
    │   ├── layout/                     # cross-experience shells
    │   ├── landing/                    # marketing sections
    │   ├── chat/                       # chat pieces
    │   ├── extension/                  # popup pieces
    │   ├── history/                    # history pieces
    │   ├── settings/                   # settings pieces
    │   └── shared/                     # truly shared
    ├── data/
    ├── hooks/
    ├── lib/
    └── types/
```

## 4. Constraints (locked)

These apply to every phase. They are not negotiable.

### 4.1 Scope (frontend-only, mock data)

- **No backend.**
- **No database.**
- **No authentication.**
- **No authorization.**
- **No login / signup.**
- **No real AI APIs.**
- **No payment integration.**
- **No server-side API routes** (no `app/api/*` route handlers, no Next.js Route Handlers, no Edge Functions, no middleware that does data fetching).
- **Mock / local data only.** All data lives in `data/*`, `localStorage`, or in-memory React state.
- **No environment variables** for secrets. There are no secrets. If a future feature appears to need one, pause and reconfirm scope.

### 4.2 Engineering rules

1. **No real AI API.** `lib/mock-ai.ts` is the only response generator.
2. **No `any`.** No `unknown` without narrowing.
3. **No raw hex / px in components** — token classes only.
4. **Red used only in the six approved cases** (see §5.2).
5. **No global state library** (no Redux/Zustand/Jotai/Recoil/MobX/Valtio).
6. **No new dependencies** without explicit justification.
7. **No over-engineering.** The plan lists many components, but abstractions are created only when they provide real reuse or maintainability. If a helper exists once and is only used once, leave it inline.
8. **Every page must pass lint + build** before the next phase begins.
9. **Plan first, then execute.** Hard stop and report after each phase. Do not run `create-next-app`, `npm install`, or `npm run build` until that specific phase is explicitly approved.
10. **No fake backend.** Any helper like `api.generateAIResponse()` must be clearly local mock.

---

# Part B — Design system, UX, data

## 5. Design System (locked)

### 5.1 Color tokens

Defined as CSS variables. Dark theme default; light theme inverts neutrals and keeps red identical.

**Dark (default):**

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#080808` | Page / app background |
| `--bg-elevated` | `#0A0A0A` | App shell, sidebar, large surfaces |
| `--bg-card` | `#101010` | Cards, popovers, dropdowns |
| `--bg-hover` | `#171717` | Hover on neutral surfaces |
| `--bg-active` | `#1F1F1F` | Active / pressed |
| `--border` | `#1F1F1F` | Default dividers |
| `--border-strong` | `#2A2A2A` | Input borders, prominent dividers |
| `--border-focus` | `#EF4444` | Focus ring (sparingly) |
| `--text-primary` | `#FFFFFF` | Headings, key content |
| `--text-secondary` | `#A1A1AA` | Body text, descriptions |
| `--text-muted` | `#71717A` | Hints, timestamps, disabled labels |
| `--brand` | `#EF4444` | Primary action, selected indicator |
| `--brand-hover` | `#DC2626` | Primary action hover |
| `--brand-active` | `#B91C1C` | Primary action pressed |
| `--brand-subtle` | `rgba(239,68,68,0.10)` | Selected row background tint |
| `--brand-ring` | `rgba(239,68,68,0.40)` | Outer focus halo |
| `--danger` | `#F87171` | Error text + icon |
| `--danger-bg` | `rgba(248,113,113,0.08)` | Error surface tint |
| `--success` | `#22C55E` | Success indicator |
| `--success-bg` | `rgba(34,197,94,0.08)` | Success surface tint |
| `--disabled-fg` | per surface | Disabled-state foreground |
| `--disabled-bg` | per surface | Disabled-state background |

**Light theme:** same names; inverted neutrals; brand/danger/success unchanged.

### 5.2 Red usage (hard rule)

Red appears **only** in:

1. Primary CTA fill (`Send`, `Open the workspace`).
2. Selected state indicator (red dot + 2 px red left edge, never a full red fill).
3. Focus ring on primary controls (`--brand-ring`, 2 px, 2 px offset).
4. Send icon fill when the composer has content.
5. Error states (via `--danger`, not `--brand`).
6. "Switched to model" inline notice.

Red **never** appears on: backgrounds, headings, secondary buttons, links (links are white with underline), neutral icons, placeholder text, model descriptions, marketing feature blocks, FAQ rows, footer, success states.

### 5.3 Typography

- **Sans (UI):** Inter via `next/font/google`. Weights 400 / 500 / 600 / 700.
- **Mono (code only):** JetBrains Mono via `next/font/google`. Weight 400 / 500.
- `font-feature-settings: "cv11", "ss01", "ss03"` on Inter.
- `font-variant-numeric: tabular-nums` on `.time` utility (timestamps, counters).

**Type scale (px / lh / weight / tracking):**

| Token | Size | Line-height | Weight | Tracking | Usage |
|---|---|---|---|---|---|
| `display-xl` | 72 / 60 mobile | 1.05 | 600 | -0.04em | Hero only |
| `display-lg` | 60 / 48 mobile | 1.05 | 600 | -0.035em | Section hero |
| `display-md` | 48 / 36 mobile | 1.10 | 600 | -0.03em | Section heading |
| `heading-lg` | 36 / 30 mobile | 1.15 | 600 | -0.025em | Panel heading |
| `heading-md` | 24 | 1.25 | 600 | -0.02em | Card heading |
| `heading-sm` | 20 | 1.30 | 600 | -0.015em | Sub-heading |
| `body-lg` | 18 | 1.55 | 400 | normal | Lead paragraph |
| `body` | 16 | 1.60 | 400 | normal | Default body |
| `body-sm` | 14 | 1.55 | 400 | normal | Secondary text |
| `caption` | 12 | 1.50 | 500 | 0.01em | Labels, timestamps |
| `overline` | 11 | 1.40 | 600 | 0.10em (uppercase) | Section eyebrows |

Body never below 14 px. Captions are labels, not content.

### 5.4 Spacing, radius, elevation

- **Spacing base:** 4 px. Allowed: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 96 / 128.
- **Radii:** 4 (chips), 6 (controls), 10 (cards), 14 (modals), full (avatars only). No `rounded-3xl` on cards.
- **Elevation:** borders by default; shadows only on popovers (level 2) and modals (level 3). No `shadow-2xl` outside modals. No glassmorphism. No neon glow.

### 5.5 Motion

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `motion-instant` | 80 ms | linear | Hover color swap (and reduced-motion opacity) |
| `motion-fast` | 120 ms | ease-out | State changes |
| `motion-default` | 200 ms | ease-out | Dropdowns, tooltips |
| `motion-slow` | 280 ms | ease-out | Modal, sidebar drawer |
| `motion-section` | 360 ms | ease-out | Section reveal (Framer, once) |

`prefers-reduced-motion: reduce` collapses transforms and animations to opacity-only at 80 ms.

### 5.6 Buttons

- **Variants:** primary (red) / secondary (outline) / ghost / icon.
- **Sizes:** sm 32 / md 40 / lg 48.
- **Primary:** bg `--brand`, text `#FFF`, hover `--brand-hover`, active `--brand-active` + `translate-y-[1px]`, disabled `--disabled-fg`/`--disabled-bg` + `cursor-not-allowed` + opacity 0.5.
- **Secondary:** transparent bg, `--border-strong` border, hover `--bg-hover`, active `--bg-active`.
- **Ghost:** transparent, hover bg `--bg-hover`.
- **Icon:** square 32 / 40 / 44, mandatory `aria-label`.
- **Focus:** 2 px `--brand-ring`, 2 px offset.
- Mobile slot enforces `min-h-[44px] min-w-[44px]`.

### 5.7 Inputs, textarea, labels

- **Input:** bg `--bg-elevated`, border `--border-strong`, hover border `--text-muted`, focus border `--brand` + 2 px ring, error border `--danger`.
- **Textarea:** auto-grows 1 → 6 (web) / 1 → 3 (extension), then internal scroll. Composer uses `pb-[max(0px,env(safe-area-inset-bottom))]` on mobile.
- **Label:** `<label>` paired with control; visually hidden when used with icon-only fields.

### 5.8 Cards

Two variants only: default (border) and interactive (hover bg). 10 px radius, 20–24 px padding, no shadow, no lift.

### 5.9 Navigation

- **Top navbar (landing):** 64 px, transparent → solid on scroll.
- **Sidebar (chat):** 260 px labeled (desktop ≥ `lg`), 64 px icon-collapsed (tablet `md`–`lg`), drawer (mobile `< md`). Right border on desktop only. Footer pinned: Settings + History + Theme toggle.
- **Mobile drawer:** width `min(86vw, 320px)`, backdrop `rgba(0,0,0,0.5)`, focus trap, `Esc` closes, focus restored.

### 5.10 Model selector

- **Trigger:** 36 px (web) / 28 px (extension). Border `--border-strong`. Provider dot + model name + chevron.
- **Dropdown:** 320 px wide, radius `rounded-lg`, padding 6. Selected row: `--brand-subtle` bg + 2 px red left edge + red dot before name. Keyboard: `↑` `↓` `Enter` `Esc`.

### 5.11 Chat messages

- **Column:** `max-w-[720px] mx-auto px-4 md:px-8`, vertical gap 24 px.
- **User message:** bg `--bg-card`, left border 2 px `--text-muted`, padding 14/16, radius `rounded-lg`.
- **Assistant message:** transparent bg, left border 2 px `--brand` (the only consistent red surface in the stream), padding 14/16 (compact: 10/12).
- **Code blocks:** JetBrains Mono, bg `--bg-card`, border `--border`, radius `rounded-md`, padding 12/14.
- **Hover actions:** Copy / Regenerate / thumbs, assistant only, on hover or `:focus-within`.
- **Streaming:** 3-dot pulse 1.2 s, then 600 ms character reveal (reduced-motion → opacity only).

### 5.12 Prompt composer

- bg `--bg-elevated`, border `--border-strong`, radius `rounded-lg`, padding 12/14.
- Auto-grows to ~220 px (web) / ~140 px (extension), then internal scroll.
- Top row: textarea (no border, transparent bg).
- Bottom row: model indicator left, send button right. Disabled when empty or pending.

### 5.13 Modal, tooltip, badge, kbd, avatar

- **Modal:** max-width 480/640/800, padding 24/32, radius `rounded-xl`, bg `--bg-card`, border `--border-strong`, focus trap, `Esc` close, click-outside close. Optional `tone="danger"` variant for destructive confirmations.
- **Tooltip:** delay 200 ms, bg `--bg-card`, border `--border-strong`, `role="tooltip"`.
- **Badge:** neutral / brand / outline. Height 22, padding 0/8, radius `rounded-sm`.
- **Kbd:** bg `--bg-hover`, border `--border`, text `--text-secondary`, radius `rounded-sm`, padding 1/6, mono small. Used in shortcuts reference.
- **Avatar:** radius `rounded-full`, bg `--bg-active`, initial weight 600.

### 5.14 Responsive breakpoints

| Name | Min width | Behavior |
|---|---|---|
| mobile | 0 | Single column, drawer, compare hidden |
| sm | 640 | Two-column marketing grids |
| md | 768 | Tablet chat: 64 px icon sidebar |
| lg | 1024 | Desktop 260 px sidebar, full nav |
| xl | 1280 | Marketing 12-col container |
| 2xl | 1536 | Wider hero spacing |

Extension popup: 380 × 560 logical viewport.

### 5.15 Accessibility tokens

- `--focus-ring`: 2 px `--brand-ring`, 2 px offset.
- Tap target ≥ 44 × 44 px on mobile.
- Contrast: primary text on bg ≥ 16:1, secondary ≥ 7:1, muted ≥ 4.5:1.
- Real `<button>` / `<a>` everywhere; `aria-label` on icon buttons; skip-to-content on every layout.
- `prefers-reduced-motion: reduce` collapses transforms; opacity-only remains at 80 ms.

## 6. UX Specification

### 6.1 Cross-experience shared layer

- Same tokens, fonts, wordmark, icons, motion vocabulary.
- Shared components: `Logo`, `ThemeToggle`, `Button`, `IconButton`, `Input`, `Textarea`, `Badge`, `Avatar`, `Tooltip`, `Modal`, `Dropdown`, `ModelPill`, `Message`, `cn`, `timeAgo`, `copyToClipboard`.
- Shared data: `data/models.ts`, `data/conversations.ts`, `data/messages.ts`, `lib/mock-ai.ts`.
- Shared interaction patterns: red `Send`, selected red dot+edge, `⌘K` / `⌘Enter` / `Esc`.
- Voice: precise, technical, no marketing fluff. Avoid "Unlock the power of AI."

### 6.2 Marketing landing page (`/`)

- **Primary user goal:** convince a technical visitor this is a focused multi-model workspace.
- **Primary CTA:** "Open the workspace" → `/app`. Secondary: "Try the extension" → `/extension`.
- **Locked section order:** Navbar → Hero → ProductPreview → Features → AI Models → How it works → Why EchoGPT → Chrome Extension → FAQ → Final CTA → Footer.
- **Product preview:** built from real `<Message>`, `<PromptComposer>`, `<MessageActions>`, `<QuickActions>` inside a `<ProductPreviewProvider>` supplying frozen state. No `lp/preview/*` mirror components.
- **Subheads:** locked in Appendix C.
- **Mobile:** hamburger → drawer; sections stack; hero type scales down; product preview scales to full width.
- **Empty / loading / error states:** not applicable (static-rendered).
- **Pricing / testimonials:** omitted on purpose.

### 6.3 Web application (`/app/*`)

- **Primary CTA:** Send (red).
- **Layout:** Sidebar (260 / 64 / drawer) + main chat column `max-w-[720px]`.
- **Flows:** new chat, resume, search, switch model, quick actions, regenerate, copy, theme. (Compare is deferred per §13.)
- **Empty states:** no conversations / no search results / unknown id.
- **Loading:** 3-dot pulse + 600 ms char reveal (reduced-motion → opacity only).
- **Error:** red-tinted retry card with Regenerate.
- **Mobile:** top bar + drawer + composer safe area.

### 6.4 Chrome extension concept (`/extension/*`)

- **Primary CTA:** Send (red).
- **Layout:** 380 × 560 framed popup. Single column.
- **Views:** prompt / conversation / history / settings.
- **Mobile:** not a mobile experience; popup scales fluidly when opened directly.
- **Keyboard shortcut concept:** ⌘+Shift+E to open (decorative only).
- **Compactness rules:** send reachable by right thumb; recent list caps at 5; min tap target 32 × 32 (popup tap area is the popup itself); max animation 160 ms.

## 7. Data & State Architecture

### 7.1 Type contracts (no `any`)

```ts
// Model ids are intentional generic labels, not pinned to specific
// versioned model names. The exact list lives in `data/models.ts` and
// is easy to update without churn in the rest of the app. Roughly:
//   * one flagship line per major provider
//   * one open-source line
//   * ids are short, lowercase, provider-prefixed or generic

type ModelId = string;  // e.g. 'openai-flagship', 'anthropic-flagship', 'google-flagship', 'meta-open', 'mistral-open'

interface Model {
  id: ModelId;
  name: string;                       // human-readable, e.g. "OpenAI Flagship"
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'Mistral';
  description: string;
  capabilities: Array<'reasoning' | 'code' | 'long-context' | 'vision' | 'tools'>;
  status: 'available' | 'preview';
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: ModelId;
  createdAt: number;
  status: 'streaming' | 'complete' | 'error';
}

interface Conversation {
  id: string;
  title: string;
  model: ModelId;
  createdAt: number;
  updatedAt: number;
  preview: string;
}

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
type Density = 'comfortable' | 'compact';

interface Preferences {
  defaultModel: ModelId;
  density: Density;
  showModelBadge: boolean;
  sendOnEnter: boolean;
  streamReplies: boolean;
}

interface ToastItem {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'error';
  duration?: number;
}
```

### 7.2 Mock data layout

| File | Contents |
|---|---|
| `data/models.ts` | `MODELS`, `MODEL_MAP`, `DEFAULT_MODEL`. Labels are generic (e.g. "OpenAI Flagship", "Anthropic Flagship", "Google Flagship", "Meta Open", "Mistral Open") — do not pin to specific versioned model names like `gpt-4o`, `claude-3.7-sonnet`, etc. unless they are confirmed to match the current EchoGPT product. |
| `data/conversations.ts` | `SEED_CONVERSATIONS`, `createEmptyConversation`, `titleFromPrompt` |
| `data/messages.ts` | `SEED_MESSAGES`, `buildUserMessage`, `buildAssistantMessage` |
| `data/features.ts` | `FEATURES` (5 items) |
| `data/faq.ts` | `FAQ` (6 items, answers ≤ 80 words) |
| `data/nav.ts` | `LANDING_NAV`, `LEGAL_NAV`, `FOOTER_LINKS` |
| `data/quick-actions.ts` | `QUICK_ACTIONS` |
| `data/example-prompts.ts` | `EXAMPLE_PROMPTS` |
| `data/keyboard-shortcuts.ts` | `KEYBOARD_SHORTCUTS` |
| `data/empty-copy.ts` | All empty-state strings (EchoGPT-voiced) |
| `data/preview-messages.ts` | Frozen product-preview messages |

### 7.3 Mock AI

`lib/mock-ai.ts` exports:

```ts
async function generateMockResponse(prompt: string, model: ModelId, signal?: AbortSignal): Promise<Message>;
```

- Keyword buckets: greeting / code / summarize / explain / rewrite / translate / debug.
- 400–900 ms artificial latency via `await sleep(rand)`.
- Optional `simulateFailure` flag (default false) — throws `MockAiError` ~3% of the time when enabled.
- Returns `Message` with `status: 'complete'`.
- Honors `AbortSignal` so navigation cancels the timer.

### 7.4 State locations

| State | Where | Why |
|---|---|---|
| Theme preference + resolved theme | `useTheme` + `localStorage` (`echogpt:theme:v1`) + no-flash inline script | Shared across all surfaces |
| Conversations | `useConversations` + `localStorage` (`echogpt:conversations:v1`) | Persisted across reloads |
| Preferences | `usePreferences` + `localStorage` (`echogpt:preferences:v1`) | Shared across web + extension |
| Active conversation id | URL: `/app/chat/[id]` | Shareable, back-button |
| Compare mode | URL query `?compare=1` | **Deferred** per §13. Wire only if/when Compare Mode is implemented. |
| Active model | URL query `?model=<ModelId>`, falls back to `usePreferences().defaultModel` | Shareable |
| Sidebar open (mobile) | local `useState` in `AppSidebar` | UI-only |
| Search query | local `useState` in `ConversationList` | UI-only |
| Composer text | local `useState` in `PromptComposer` | UI-only |
| Streaming message | local `useState` in `ChatSurface` | Ephemeral |
| Toast queue | `ToastProvider` context | Cross-app ephemeral |

`useHydrated()` hook gates every `localStorage` read.

### 7.5 Quick-action registry

`lib/quick-action-registry.ts` exposes a typed registry keyed by `QuickActionId`:

```ts
interface QuickAction {
  id: QuickActionId;
  label: string;
  placeholder: string;
  prefix(text: string): string;
}
```

Used by both web app and extension. Replaces ad-hoc helpers.

---

# Part C — Implementation phases

## 8. Phase Map

Each phase is a **plan**, not an execution. Hard stop and report after each phase. The first executable phase, when approved, is **FP-Phase 1** (§15), which combines all phases below into one consolidated build.

| Phase | Topic | Sections |
|---|---|---|
| LP | Landing page | §9 |
| CH | Web app shell | §10 |
| CS | Web app surface (chat) | §11 |
| HS | History + settings | §12 |
| EX | Chrome extension concept | §14 |
| FP | Final polish + ship (single execution unit) | §15 |

§13 (Compare Mode) is **deferred** — see §13 status banner. It is not in the execution sequence.

Every implementation phase in §9–§14 lists: scope, files to create, files to modify, verification, success criteria, out-of-scope. They are sequenced in §15.

## 9. Landing Page

### 9.1 Scope

`/` only. Static, server-rendered. Hero uses one red CTA + one secondary text link. Product preview reuses real components (no mirror files).

### 9.2 Phases (plan only)

| Sub-phase | Files | Verification |
|---|---|---|
| **LP-0** Bootstrap, design tokens, fonts, ThemeProvider, no-flash script, layout shell | `tailwind.config.ts`, `globals.css`, `layout.tsx`, `lib/cn.ts`, `lib/storage.ts`, `lib/format.ts`, `components/shared/ThemeProvider.tsx`, `components/shared/ThemeToggle.tsx`, `components/shared/Logo.tsx`, `components/shared/Container.tsx`, `components/shared/SectionEyebrow.tsx`, `components/shared/MotionFadeIn.tsx`, `components/shared/SkipToContent.tsx`, `components/shared/SiteHeader.tsx`, `components/shared/SiteFooter.tsx`, `components/shared/ModelPill.tsx`, `components/ui/Button.tsx`, `components/ui/IconButton.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`, `components/ui/Kbd.tsx` | `lint` ✅ `build` ✅ |
| **LP-1** Shared primitives (continued) + `useHydrated` + `ToastProvider` | `components/ui/{Input,Textarea,Label,Field,Avatar,Tooltip,Dropdown,Modal,Skeleton,VisuallyHidden}.tsx`, `hooks/use-hydrated.ts`, `hooks/use-toast.ts`, `components/shared/ToastProvider.tsx` | same |
| **LP-2** Landing data files + `<ExtensionFrame>` stub | `data/{models,features,faq,nav,quick-actions,example-prompts,empty-copy,preview-messages}.ts`, `components/shared/ExtensionFrame.tsx` | same |
| **LP-3** Landing sections (real `<Message>`, `<PromptComposer>`, `<MessageActions>`, `<QuickActions>` reused via `<ProductPreviewProvider>`) | `components/landing/{LandingHero,ProductPreview,FeaturesGrid,ModelsStrip,HowItWorks,WhyEchoGPT,ExtensionSection,FAQ,FinalCTA,LandingFooter}.tsx`, `src/app/page.tsx` | same |

### 9.3 Success criteria

1. `npm run lint`, `npm run build` pass.
2. All 11 sections render at 360 / 768 / 1024 / 1440 px.
3. Theme toggle works and persists with no flash.
4. `prefers-reduced-motion` honored.
5. Realistic EchoGPT-voiced copy throughout.
6. Red used only in the six approved places.
7. Product preview built from real components, not an image or a mirror.

### 9.4 Out of scope

- `/app/*`, `/extension/*`, `/privacy`, `/terms`, `not-found.tsx` (placeholder only).
- Real functionality in `ProductPreview` (typing, model switching, quick actions) — visual only.
- Real Chrome extension manifest.

## 10. Web App Shell

### 10.1 Scope

`/app` shell only. The full chat surface (composer, messages, mock AI, settings, compare) is in §11–§13.

### 10.2 Phases (plan only)

| Sub-phase | Files | Verification |
|---|---|---|
| **CH-1** App routes skeleton (no chrome yet) | `app/app/layout.tsx`, `app/app/page.tsx` (renders `<AppShell>` directly — **no redirect**; this route IS the empty workspace), `app/app/chat/[conversationId]/page.tsx`, `app/app/history/page.tsx`, `app/app/settings/page.tsx` | routing smoke |
| **CH-2** Sidebar read-only | `components/chat/{AppShell,AppHeader,AppSidebar,SearchInput,ConversationList,ConversationRow,SidebarSectionLabel}.tsx`, `data/conversations.ts` (extend), `lib/groupConversations.ts` | desktop 1440 / tablet 900 / mobile 375 |
| **CH-3** Mobile drawer + tablet collapsed | `components/chat/{MobileDrawer,CollapsedSidebar}.tsx`, `hooks/{use-focus-trap,use-lock-body-scroll}.ts` | focus trap, `Esc`, focus restore, reduced-motion |
| **CH-4** Shell polish + acceptance | focus styling, `aria-current="page"`, "Conversation not found" panel, metadata | Lighthouse ≥ 95 a11y on `/app` |

### 10.3 Success criteria

1. `/app` is the empty/new chat workspace itself: it renders the sidebar plus an empty main area with `EmptyState` and the composer. No redirect.
2. `/app/chat/<known-id>` highlights the correct row.
3. `/app/chat/<unknown-id>` shows "Conversation not found" panel.
4. Desktop 260 px sidebar, tablet 64 px icon, mobile drawer.
5. Drawer: focus trap, `Esc` close, focus restore, reduced-motion.
6. Focus ring visible on every interactive surface.
7. Shell is stable — adding §11 only touches the main area.

### 10.4 Out of scope

Conversation surface, settings form, history search, compare mode. Reused hooks from LP-1.

## 11. Web App Surface (chat)

### 11.1 Scope

Composer, messages, mock AI wiring, header model selector, copy/regenerate, quick actions, loading/empty/error states.

### 11.2 Phases (plan only)

| Sub-phase | Files | Verification |
|---|---|---|
| **CS-1** Data + mock AI | `types/chat.ts`, `data/messages.ts`, `data/example-prompts.ts`, `lib/mock-ai.ts`, `lib/format.ts`, `lib/id.ts`, `lib/title-from-prompt.ts` | type-checked |
| **CS-2** Conversations hook + storage + Toast | `hooks/use-conversations.ts`, `hooks/use-toast.ts`, `components/shared/ToastProvider.tsx` (already from LP-1) | `localStorage` write |
| **CS-3** AppHeader + ModelSelector + URL model state | `components/chat/{ModelSelector,ModelSwitchedNotice}.tsx`, `hooks/use-active-model.ts` | dropdown keyboard nav |
| **CS-4** EmptyState + Message + MessageActions | `components/chat/{EmptyState,Message,MessageActions,StreamingIndicator,LoadingState,ErrorState,ConversationNotFoundPanel,ChatSurface}.tsx` | `aria-live` placement |
| **CS-5** PromptComposer + Send + mock AI wiring | `components/chat/{PromptComposer,QuickActions}.tsx`, `hooks/use-chat-stream.ts` | end-to-end send flow |
| **CS-6** Quick-action registry + quick-action wiring | `lib/quick-action-registry.ts`, updates to `MessageActions` and `QuickActions` | all five actions inject prompts |
| **CS-7** Polish + accessibility + acceptance | focus styling, reduced-motion, scroll-to-bottom, metadata | Lighthouse ≥ 95 a11y |

### 11.3 Success criteria

1. `/app` shows EmptyState with three example prompts (the empty workspace).
2. Sending an example prompt creates a conversation and navigates to `/app/chat/<new-id>`, showing user + loading + assistant.
3. Mock responses are realistic and EchoGPT-voiced.
4. Copy works with toast.
5. Regenerate replaces the last assistant message.
6. Model switch updates URL `?model=` and shows "Switched to X" notice.
7. All five quick actions inject prefixed prompts.
8. `localStorage` persists; reload restores.
9. Mobile 375 px: composer docked, safe area respected.
10. Accessibility: real controls, `aria-live` on assistant bubble, `role="alert"` on errors, reduced-motion.

### 11.4 Out of scope

Real history search (§12), real settings form (§12), keyboard shortcuts overlay, ⌘K cross-conversation search. (Compare Mode is deferred per §13, not part of this phase's scope at all.)

## 12. History + Settings

### 12.1 Scope

`/app/history` and `/app/settings`. Theme switching must actually work. Reuses `AppShell`, `ConversationList`, `ConversationRow`, `SearchInput`, `ModelSelector`, `ThemeToggle`, `Modal`, `ToastProvider`, `EmptyState`.

### 12.2 Phases (plan only)

| Sub-phase | Files | Verification |
|---|---|---|
| **HS-1** `/app/history` real surface | `components/history/{HistoryHeader,HistorySearch,HistoryGroup,HistoryResultCount,HistoryEmpty,HistoryNoResults,HistoryView}.tsx`, `lib/debounce.ts`; updates `app/app/history/page.tsx` | empty + no-results states, mobile sticky search |
| **HS-2** `/app/settings` skeleton + preferences | `hooks/use-preferences.ts`, `data/keyboard-shortcuts.ts`, `components/settings/{SettingsSection,SettingsView,AppearanceSection,DefaultModelSection,InterfaceSection,KeyboardShortcutsSection,AboutSection}.tsx`, `lib/build-info.ts`; updates `app/app/settings/page.tsx` and `use-active-model` | theme instant switch, default model flows through |
| **HS-3** Reset + About copy + acceptance | `components/settings/{DataSection,ResetConfirmModal,AboutCopy}.tsx`; updates `AboutSection` and `Modal` (adds `tone="danger"` variant) | confirmation modal traps focus, wipes storage |

### 12.3 Success criteria

1. `/app/history` shows grouped conversations; search filters live; empty + no-results render.
2. `/app/settings` exposes Appearance, Default model, Interface, Keyboard shortcuts, Data, About — all working.
3. Theme switching instant, persists, no flash.
4. Reset wipes conversations + preferences + theme, routes to `/app` (the empty workspace).
5. Real `<input>`/`<button>`/`<a>` everywhere.
6. Reuses every shipped component (no duplication).

### 12.4 Out of scope

Edit / delete / pin / rename conversations; export / import; real keyboard-shortcut **handling**; cross-device sync.

## 13. Compare Mode (deferred)

> **Status: deferred.** Compare Mode is a differentiator, not a core requirement. **Do not implement it** until every core assignment feature is complete and polished. Only re-evaluate after FP-Phase 1 ships a clean baseline.

### 13.1 Scope (when implemented)

Two-column, two-model comparison on desktop. Hidden below `md` with an explanatory caption.

### 13.2 Phases (plan only, kept for future use)

| Sub-phase | Files | Verification |
|---|---|---|
| **CM-1** Compare components + hook | `components/chat/{CompareSurface,CompareColumn,CompareToggle,CompareNotAvailable}.tsx`, `hooks/use-compare-stream.ts`; updates `AppHeader`, `ChatSurface`, `app/app/chat/[conversationId]/page.tsx` | two columns on `lg+`; caption on `< md` |

### 13.3 Success criteria

1. Toggle in `AppHeader` switches to compare mode (`?compare=1`).
2. Two equal columns, each with its own model selector and streaming.
3. Hidden below `md` with caption "Compare on desktop."
4. Switches to fresh columns (no inherited messages).

### 13.4 Promotion criteria

Compare Mode moves from deferred to active only when **all** of these hold:

- All landing sections, chat shell, chat surface, history, settings, extension are stable and polished.
- Smoke checklist (§19) passes.
- There is remaining implementation budget (suggested rule of thumb: no more than 1 day).
- The Compare Mode plan (this section) is reconfirmed with you before any code lands for it.

## 14. Chrome Extension Concept

### 14.1 Scope

`/extension`, `/extension/history`, `/extension/settings`. 380 × 560 popup. Shares storage with the web app. **Not a real Chrome extension.**

### 14.2 Phases (plan only)

| Sub-phase | Files | Verification |
|---|---|---|
| **EX-1** Compact/narrow variants on shared components | adds `compact?: boolean` to `Message`, `ConversationRow`, `EmptyState`; `narrow?: boolean` to `HistoryView`, `SettingsSection`, `AppearanceSection`, `DataSection`, `AboutSection`; `size?: 'md'\|'sm'` to `ModelSelector`; new `lib/variants.ts` | no behavior change |
| **EX-2** Popup routes and shell | `app/extension/{layout,page}.tsx`, `components/extension/{ExtensionPopupLayout,ExtensionHeader,ExtensionViewSwitcher,ExtensionPromptView,ExtensionConversationView,ExtensionQuickActions,ExtensionRecentList,ExtensionMessageBubble,ExtensionComposer,ExtensionEmptyState}.tsx`; updates landing `ExtensionSection` to embed live popup | 380 px viewport smoke |
| **EX-3** `/extension/history` + `/extension/settings` | `app/extension/history/page.tsx`, `app/extension/settings/page.tsx`, `components/extension/{ExtensionHistoryView,ExtensionSettingsView,ExtensionBackBar}.tsx`; updates `ExtensionHeader`, `ExtensionPopupLayout` | shared storage confirmed |
| **EX-4** Polish + acceptance | focus styling, micro-animation, reduced-motion, metadata, viewport, theme-color | Lighthouse ≥ 95 a11y |

### 14.3 Success criteria

1. `/extension` shows compact popup with header, recent list, composer, quick actions.
2. Send produces mock response and persists.
3. `/extension/history` and `/extension/settings` are full routes with back arrows.
4. Theme, default model, stream replies, clear data sync with web app.
5. Quick actions inject prompts in the popup composer.
6. Layout holds at 360 / 380 / 414 px viewports.
7. Accessibility: real controls, `aria-label`s, focus rings, reduced-motion.
8. Reuses every shared component (only `compact`/`narrow`/`size` variants + small wrappers are new).

### 14.4 Out of scope

Real Chrome `manifest.json`, service worker, content script, Chrome APIs. Real AI API. Cross-device sync. Page-context integration.

## 15. Final Polish Phase (FP-Phase 1)

> **This is the one execution unit, when you approve it.** It folds every phase above into a single consolidated build and adds the README, smoke checklist, and submission acceptance gate.

### 15.1 Order of operations

1. Bootstrap with `create-next-app` (LP-0 flags) and install approved deps.
2. Apply `.eslintrc.json` rules including the anti-template rule (Appendix B).
3. Apply `tailwind.config.ts` tokens and `globals.css` CSS variables.
4. Wire `next/font` for Inter + JetBrains Mono.
5. Build `ThemeProvider`, `useTheme`, no-flash inline script.
6. Build UI primitives + shared components.
7. Build `src/lib/*` (cn, storage, format, id, debounce, narrow, variants, quick-action-registry, build-info, mock-ai, groupConversations).
8. Build hooks (use-hydrated, use-theme, use-conversations, use-conversation, use-active-conversation, use-active-model, use-media-query, use-keyboard-shortcut, use-toast, use-focus-trap, use-lock-body-scroll, use-chat-stream, use-preferences). **No `use-compare-stream` — Compare Mode is deferred.**
9. Build types and data files.
10. Build landing sections.
11. Build chat pieces (AppShell, sidebar, chat surface). **No Compare components.**
12. Build history + settings pieces.
13. Build extension pieces.
14. Build route files (root, legal, app, extension, not-found).
15. Apply polish pass (typography, spacing, focus, hover, mobile, composer, model selector, animation, empty/loading/error, visual consistency, red accent audit).
16. Write `README.md` from Appendix A verbatim.
17. Run `npm run lint`, `npm run typecheck` (add `tsc --noEmit` if missing), `npm run build`. Fix every genuine error.
18. Run manual smoke against §19.

### 15.2 Verification

- `npm run lint` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- Manual smoke at 360 / 768 / 1024 / 1440 + 380 extension. Light + dark. With and without reduced-motion.
- Accessibility smoke (tab order, `aria-label`s, focus rings, `aria-live`, `Esc` close, focus restore).
- Anti-template smoke (no gradients, no glass, no `shadow-2xl` outside modals, no `rounded-3xl` on cards, no orange/purple/blue/pink, no "Unlock the power of AI").

---

# Part D — Quality & submission

## 16. Senior Frontend Audit

Plan-level audit only — no code exists yet. To be re-run as a code-level audit after FP-Phase 1 executes.

### 16.1 Assignment coverage

| Requirement | Status | Notes |
|---|---|---|
| Marketing landing (11 sections) | ✅ §9 | All sections planned in locked order. |
| Web application | ✅ §10 + §11 + §12 | Shell, chat surface, history, settings. |
| Chrome extension concept | ✅ §14 | Three routes, popup-optimized. |
| Responsive design | ✅ §5.14 | Breakpoints 0/640/768/1024/1280/1536 + 380 extension. |
| Accessibility | ✅ §5.15 + §10/§11/§12 | Real controls, focus ring, aria-live, reduced-motion. |
| Performance | ✅ §6, §11 CS-5 | Server-first boundaries, AbortController on mock streams. |
| Reusable components | ✅ §3 + reuse maps in §14 | No duplication. |
| Mock AI honesty | ✅ §25 of brief + §7.3 + About copy | `lib/mock-ai.ts` is the only mock. |
| Theme switching | ✅ §5.1 + §11 + §12 | Token-driven, no-flash. |
| Multi-model + Compare | ✅ §11 (multi-model) / 🟡 §13 (Compare deferred) | Multi-model is core; Compare Mode is deferred per §13. |
| README per rule #31 | ✅ Appendix A | Verbatim content. |

### 16.2 P0 — Must fix before submission

| # | Issue | Where | Fix |
|---|---|---|---|
| P0-1 | README missing | `README.md` | Write from Appendix A verbatim. |
| P0-2 | Compare Mode | §13 | **Not required for submission.** §13 is now explicitly deferred — Compare Mode is optional. Removed from P0. |
| P0-3 | Landing `ProductPreview` mirrors instead of reusing | §9 LP-3 | Drop mirror; reuse `<Message>`, `<PromptComposer>`, `<MessageActions>`, `<QuickActions>` via `<ProductPreviewProvider>`. |
| P0-4 | Skip-to-content missing from `/app/*` and `/extension/*` | §10 + §14 | Add `<SkipToContent>` to every layout; `<main>` gets `id="main"` + `tabIndex={-1}`. |
| P0-5 | Empty-state copy is placeholder | `data/empty-copy.ts` | All empty-state strings centralized, EchoGPT-voiced. |
| P0-6 | No ESLint rule against generic AI patterns | `.eslintrc.json` | Add the rule in Appendix B. |

### 16.3 P1 — Should fix

| # | Issue | Fix |
|---|---|---|
| P1-1 | Quick-action ad-hoc helper | Typed `QuickActionRegistry` (§7.5). |
| P1-2 | Boolean `compact` / `narrow` props | Discriminated `variant` prop. |
| P1-3 | Hooks may drift on hydration safety | Single `useHydrated()` gates every `localStorage` read. |
| P1-4 | `aria-live` placement | On assistant message bubble, not the dots. |
| P1-5 | Mock streams don't cancel | `AbortController` in `use-chat-stream` and `use-compare-stream`. |
| P1-6 | Touch-target enforcement | `<IconButton>` mobile slot ≥ 44 × 44 px. |
| P1-7 | Framer Motion imported everywhere | Replace simple hover/drawer with CSS; reserve Framer for hero, modal, drawer slide. |
| P1-8 | Disabled-state tokens | `--disabled-fg` / `--disabled-bg` + `cursor-not-allowed`. |
| P1-9 | "Switched to X" auto-dismiss | Auto-dismiss 4 s; `aria-live="polite"`; `Esc` dismisses. |
| P1-10 | Section subheads product-specific | Locked in Appendix C. |

### 16.4 P2 — Polish

- `timeAgo` uses `font-variant-numeric: tabular-nums`.
- Reduce `Debug code` to `Debug` in the popup only.
- Reset modal copy: "Theme returns to system default."
- `next/dynamic({ ssr: false })` for the embedded extension on the landing page.
- `prefers-reduced-motion` keeps 80 ms opacity/color transitions; disables only transforms.
- Replace `scripts/build-info.mjs` with direct `package.json` import + type shim.
- Re-run audit at code level once phases execute.

### 16.5 Anti-template checklist (locked)

- [x] No `bg-gradient-*`.
- [x] No `backdrop-blur-*`.
- [x] No `shadow-2xl` outside modals.
- [x] No `shadow-inner`.
- [x] No `animate-pulse` outside typing indicator.
- [x] No `rounded-3xl` on cards.
- [x] No orange / purple / blue / pink anywhere.
- [x] No "Unlock the power of AI", "Supercharge…", "Transform your workflow…".
- [x] No decorative-only icons.
- [x] No pricing / testimonials.

The ESLint rule in Appendix B enforces the CSS-class half of this list mechanically.

## 17. P0/P1 Fix Plan

Each item from §16.2 and §16.3 mapped to the file where the fix lands. See §16.2 (P0 table) and §16.3 (P1 table) for the full mapping.

| Item | File |
|---|---|
| P0-1 README | `README.md` (Appendix A verbatim) |
| P0-3 ProductPreview reuse | `components/landing/ProductPreview.tsx` |
| P0-4 Skip-to-content | `components/shared/SkipToContent.tsx` in every layout |
| P0-5 Empty copy | `data/empty-copy.ts` |
| P0-6 ESLint rule | `.eslintrc.json` (Appendix B) |
| P1-1 Registry | `lib/quick-action-registry.ts` |
| P1-2 Variants | `lib/variants.ts` |
| P1-3 Hydration | `hooks/use-hydrated.ts` |
| P1-4 aria-live | `components/chat/Message.tsx` + `StreamingIndicator.tsx` |
| P1-5 Abort | `hooks/use-chat-stream.ts`, `hooks/use-compare-stream.ts` |
| P1-6 Tap target | `components/ui/IconButton.tsx` |
| P1-7 Framer reduction | refactor simple motion to CSS |
| P1-8 Disabled tokens | `tailwind.config.ts` + `components/ui/Button.tsx` |
| P1-9 Auto-dismiss | `components/chat/ModelSwitchedNotice.tsx` |
| P1-10 Subheads | `components/landing/*` (Appendix C) |

## 18. Polish Checklist

| Surface | Target |
|---|---|
| **Typography** | Inter / JetBrains Mono via `next/font`. Display-xl only on hero. Tabular numerals on `.time`. |
| **Spacing** | 4 px base; 4/8/12/16/20/24/32/40/48/64/96/128 only. Section gaps 64 mobile / 96 desktop. |
| **Alignment** | Marketing container `max-w-[1200px]`. Chat column `max-w-[720px]`. Settings column `max-w-[640px]`. |
| **Button consistency** | Sizes sm 32 / md 40 / lg 48. Variants primary / secondary / ghost / icon. Focus ring 2 px `--brand-ring`, 2 px offset. |
| **Hover states** | Sidebar rows `--bg-hover`. Cards `--bg-hover`. Buttons per variant. Decorative hover only on assistant actions via `:focus-within`. |
| **Focus states** | One canonical `--focus-ring` token; `:focus-visible` only on real controls. |
| **Mobile spacing** | `pb-[max(0px,env(safe-area-inset-bottom))]` on composer; main area edge-to-edge with safe-area. |
| **Sidebar behavior** | 260 px labeled (desktop), 64 px icon (tablet), drawer (mobile). Footer pinned. Active row: `--bg-active` + 2 px red left edge + red dot. |
| **Prompt composer** | Auto-grow 1 → 6 (web) / 1 → 3 (extension). Enter sends, Shift+Enter newline, ⌘Enter sends. Disabled on empty or pending. |
| **Model selector** | 36 px (web) / 28 px (extension). Selected = `--brand-subtle` + 2 px red left edge + red dot. Keyboard nav. |
| **Animation timing** | Hover 80 ms. State 120 ms. Dropdown / tooltip 200 ms. Modal / drawer 200–280 ms. Section reveal 360 ms. Reduced-motion → opacity-only. |
| **Empty states** | Centered, calm, one CTA when useful. From `data/empty-copy.ts`. |
| **Loading states** | 3-dot pulse 1.2 s; replaced by 600 ms char reveal (reduced-motion → opacity). |
| **Visual consistency** | Tokens everywhere. No raw hex/px. Identical headers/footers/brand mark across surfaces. |
| **Red accent** | Only the six approved cases. |

## 19. Smoke Checklist

**Routes:**

- `/` — marketing landing renders fully.
- `/privacy`, `/terms` — render fully under legal layout.
- `/app` — empty workspace with EmptyState + composer (no redirect).
- `/app/chat/<seeded-id>` — conversation loads.
- `/app/chat/<bogus-id>` — "Conversation not found" panel.
- `/app/history` — grouped list + search.
- `/app/settings` — all six sections + reset.
- `/extension` — popup prompt + recent list.
- `/extension?conversation=<id>` — popup conversation view.
- `/extension/history`, `/extension/settings` — popup variants.
- `/not-found` — 404.

**Widths:** 360 / 768 / 1024 / 1440 + 380 (extension). Light + dark. With and without reduced-motion.

**Functional:**

- Send prompt → user → loading dots → mock response.
- Copy response → toast confirms.
- Regenerate → response replaced.
- All five quick actions inject prefixed prompts.
- Model switch updates URL; "Switched to X" appears and dismisses.
- Theme toggle instant, persists across reload with no flash.
- Default model change in settings changes the default used at `/app` (the empty workspace).
- Reset wipes everything with confirmation modal.
- Extension shares storage with web app.

(Compare Mode is deferred per §13 — not part of this smoke checklist.)

**Accessibility:**

- Tab from skip-link reaches every section.
- All icon buttons have `aria-label`.
- Live region announces assistant responses; error region announces errors.
- Focus ring visible against every background.
- Esc closes overlays, focus restored.

**Anti-template:**

- No gradients anywhere.
- No glassmorphism.
- No `shadow-2xl` outside modals.
- No `rounded-3xl` on cards.
- No orange / purple / blue / pink.
- No "Unlock the power of AI", "Supercharge…", "Transform your workflow…".

## 20. Submission Acceptance Gate

The project is shippable when **all** of these hold:

1. `npm run lint`, `npm run typecheck`, `npm run build` all pass.
2. Every route in §19 passes at every breakpoint in both themes.
3. No console errors or warnings beyond framework defaults.
4. `README.md` matches Appendix A verbatim.
5. All P0 items in §16.2 are addressed.
6. All P1 items in §16.3 are addressed.
7. P2 items are either addressed or explicitly listed in the README's "Future Improvements" section.

## 21. Status

| Area | Status |
|---|---|
| Plan + brief + audit + README | ✅ Documented in this file |
| Bootstrap (Next.js project) | ❌ Not started (awaits FP-Phase 1 approval) |
| UI primitives | ❌ Not started |
| Landing page | ❌ Not started |
| Web app shell | ❌ Not started |
| Web app surface (chat) | ❌ Not started |
| History + settings | ❌ Not started |
| Compare Mode | ❌ Not started |
| Chrome extension concept | ❌ Not started |
| Polish + acceptance | ❌ Not started |
| README | ✅ Content ready in Appendix A |
| Verification (lint/typecheck/build/Lighthouse) | ❌ Not started |

**Awaiting explicit approval of FP-Phase 1** before any code is written.

---

# Appendices

## Appendix A — README content (verbatim)

The phase will write the following content directly to `README.md`. No additions, no embellishments.

````markdown
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
````

## Appendix B — Anti-template ESLint rule

Add to `.eslintrc.json` under `rules`:

```json
{
  "no-restricted-syntax": [
    "error",
    {
      "selector": "Literal[value=/\\\\b(bg-gradient-|backdrop-blur-|shadow-2xl|shadow-inner|animate-pulse)\\\\b/]",
      "message": "Generic AI-SaaS pattern. See plan.md §16.5."
    },
    {
      "selector": "Literal[value=/\\\\brounded-3xl\\\\b/]",
      "message": "Cards must use rounded-lg. See plan.md §5.4."
    },
    {
      "selector": "TemplateElement[value.raw=/\\\\b(bg-gradient-|backdrop-blur-|shadow-2xl|shadow-inner|animate-pulse)\\\\b/]",
      "message": "Generic AI-SaaS pattern. See plan.md §16.5."
    },
    {
      "selector": "TemplateElement[value.raw=/\\\\brounded-3xl\\\\b/]",
      "message": "Cards must use rounded-lg. See plan.md §5.4."
    }
  ],
  "no-restricted-imports": [
    "error",
    {
      "patterns": ["react-spring", "motion-canvas", "three", "@react-three/*"]
    }
  ]
}
```

The copy block also requires a manual code-review pass for the prose half of the anti-template checklist (no "Unlock the power of AI", etc.).

## Appendix C — Locked section subheads

| Section | Subhead |
|---|---|
| Hero | "Switch models without losing your place." |
| ProductPreview | (none — preview speaks for itself) |
| Features | "A workspace built around the prompt, not the dashboard." |
| AI Models | "Five models. One composer. Switch mid-thread." |
| How it works | "Three steps. No setup." |
| Why EchoGPT | "What it does, and what it doesn't do." |
| Extension | "Ask from any tab. Read in this tab. Skip the round trip." |
| FAQ | (none) |
| Final CTA | "Open the workspace." |

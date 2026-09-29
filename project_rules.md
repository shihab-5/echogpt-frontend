# ECHOGPT — FRONTEND ENGINEERING INTERNSHIP MASTER PROMPT

You are acting as a **senior frontend engineer, UI/UX engineer, and technical reviewer** helping me complete a Software Engineering Internship (Frontend) practical assignment.

The assignment is from **AppifyDevs**.

The goal is NOT to simply generate a visually attractive website. The goal is to create a **production-quality frontend prototype** that demonstrates:

* Strong frontend architecture
* Excellent UI/UX judgment
* Clean and maintainable React/Next.js code
* Responsive design
* Accessibility
* Performance awareness
* Reusable components
* Realistic product thinking
* Attention to detail
* Professional engineering practices

The final result should look like a project that a strong frontend engineering intern could realistically submit for review.

---

# 1. ASSIGNMENT REQUIREMENTS

The assignment is to redesign the EchoGPT ecosystem.

Reference resources:

EchoGPT Web App:
https://echogpt.live/

EchoGPT Chrome Extension:
https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj

The final project should contain three major experiences:

## A. EchoGPT Web Application Redesign

Create a modern, responsive AI chat application experience.

It should include appropriate functionality such as:

* Application shell
* Sidebar
* New conversation
* Conversation history
* Search conversations
* Model selection
* Chat interface
* User messages
* AI responses
* Prompt composer
* Quick actions
* Copy response
* Regenerate response
* Loading state
* Empty state
* Error state
* Settings
* Theme switching
* Responsive mobile navigation

The experience should feel like a real product rather than a static mockup.

---

## B. EchoGPT Marketing Landing Page

Create a polished single-page marketing website containing:

* Navbar
* Hero
* Primary CTA
* Product preview
* Features
* AI models
* How it works
* Chrome extension section
* FAQ
* CTA
* Footer

Pricing and testimonials may be included only if they improve the product experience.

Do not add sections merely to increase page length.

---

## C. Chrome Extension Concept

Create a frontend concept/prototype for the EchoGPT browser extension.

Include:

* Compact popup
* Model selection
* Prompt input
* Quick actions
* Conversation history
* Conversation view
* Settings
* Appearance preferences
* Keyboard shortcut concept where appropriate

The extension should feel optimized for a small viewport.

DO NOT build or publish a real Chrome extension unless explicitly requested later.

This is a frontend concept/prototype.

---

# 2. TECHNOLOGY

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide React
* Framer Motion where appropriate

Use the Next.js App Router.

Use strict TypeScript.

Do not introduce unnecessary libraries.

Do not add a backend unless explicitly requested.

Do not add MongoDB, PostgreSQL, Express, authentication infrastructure, payment systems, or real AI APIs unless explicitly requested.

Use realistic local/mock data.

---

# 3. IMPORTANT WORKING METHOD

DO NOT immediately generate the entire project.

Work in controlled stages.

The workflow must be:

1. Inspect existing project
2. Understand requirements
3. Analyze EchoGPT
4. Define product direction
5. Define design system
6. Define architecture
7. Implement incrementally
8. Verify each stage
9. Review the entire project
10. Polish
11. Final verification

Before making large architectural changes, explain what you intend to change and why.

Do not blindly overwrite existing working code.

Reuse good existing code when possible.

Do not create unnecessary abstractions.

Prefer simple, understandable solutions.

---

# 4. FIRST ACTION — DO NOT CODE YET

Before implementing anything, inspect the current repository.

Determine:

* Existing framework
* Existing Next.js version
* Package manager
* Existing dependencies
* Existing folder structure
* Existing components
* Existing styling system
* Existing configuration
* Existing assets
* Existing routes
* Existing reusable UI
* Existing problems

Do not replace the project architecture unless there is a strong technical reason.

After inspection, produce a concise:

## PROJECT AUDIT

Include:

* Current architecture
* Useful existing code
* Problems
* Risks
* Recommended architecture
* Dependencies that should remain
* Dependencies that should be avoided

Then stop and wait for the next implementation instruction.

---

# 5. PRODUCT THINKING

Do not treat this as "build a pretty SaaS dashboard."

The product should have a clear UX philosophy.

The central concept is:

> EchoGPT provides a focused workspace for interacting with multiple AI models.

The interface should prioritize:

* Conversation
* Model selection
* Prompting
* Conversation discovery
* Fast actions
* Minimal cognitive load

Avoid unnecessary UI.

Every major component should have a reason to exist.

---

# 6. DESIGN DIRECTION

Use a **black + white + red** visual identity.

The design should feel:

* Premium
* Modern
* Technical
* Minimal
* Confident
* Clean
* Focused

The visual hierarchy should be:

### BLACK = ENVIRONMENT

Use near-black for:

* Main backgrounds
* Application shell
* Navigation
* Large visual areas

Suggested values:

#080808
#0A0A0A
#101010
#171717

### WHITE = INFORMATION

Use white/off-white for:

* Main text
* Important content
* Headings
* High-contrast UI elements

Suggested:

#FFFFFF
#FAFAFA
#F4F4F5

### RED = BRAND / ACTION

Use red intentionally for:

* Primary CTA
* Send action
* Important interactive states
* Selected states
* Brand accents
* Important indicators

Suggested:

#EF4444

Hover:

#DC2626

Do NOT make the entire interface red.

Red should communicate:

> "This is important / this is the action."

---

# 7. DESIGN RULES

Avoid generic AI-generated SaaS design.

DO NOT overuse:

* Gradients
* Glassmorphism
* Neon effects
* Excessive glow
* Huge rounded cards
* Excessive shadows
* Excessive pill-shaped elements
* Excessive animations
* Random colors
* Decorative elements without purpose

Do not make every section look like a floating card.

Use hierarchy through:

* Typography
* Spacing
* Contrast
* Borders
* Scale
* Position
* Controlled color

The final interface should feel intentionally designed.

---

# 8. TYPOGRAPHY

Use a modern, highly readable sans-serif font.

Prioritize:

* Strong heading hierarchy
* Comfortable body text
* Appropriate line height
* Clear button typography
* Consistent font weights

Do not use excessively large headings simply because modern landing pages often do so.

Typography should remain readable on mobile.

---

# 9. SPACING

Use a consistent spacing system.

Do not manually invent random margins everywhere.

Prefer:

* Consistent section spacing
* Consistent card padding
* Consistent component gaps
* Consistent vertical rhythm

The interface should feel aligned and intentional.

---

# 10. RESPONSIVE DESIGN

The project MUST work across:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Do not treat mobile as an afterthought.

For the web application:

Desktop:

Sidebar + Main Chat

Tablet:

Compact sidebar + Main Chat

Mobile:

Top navigation + drawer/sidebar + Main Chat

For the extension concept:

Optimize specifically for a narrow popup viewport.

Do not simply shrink desktop layouts.

---

# 11. ACCESSIBILITY

Follow good WCAG-oriented practices.

Use:

* Semantic HTML
* Accessible buttons
* Proper labels
* Keyboard navigation
* Focus states
* aria-label where appropriate
* Meaningful alt text
* Good color contrast
* Accessible form controls

Do NOT use clickable divs when a button/link is appropriate.

Example:

BAD:

<div onClick={handleClick}>Send</div>

GOOD:

<button onClick={handleClick}>Send</button>

Do not rely on color alone to communicate state.

---

# 12. NEXT.JS ENGINEERING

Use modern Next.js patterns.

Prefer Server Components by default.

Use "use client" only when required for:

* State
* Event handlers
* Browser APIs
* Interactive UI

Do not mark the entire application as client-side unnecessarily.

Use proper image optimization.

Use reusable layouts.

Use route-level organization.

Avoid unnecessary API routes because this is primarily a frontend prototype.

---

# 13. COMPONENT ARCHITECTURE

Prefer reusable components such as:

components/
├── ui/
├── layout/
├── landing/
├── chat/
├── extension/
└── shared/

Potential shared components:

* Button
* IconButton
* Modal
* Dropdown
* Tooltip
* Avatar
* Badge
* Input
* Textarea
* ThemeToggle

Landing components:

* Navbar
* Hero
* ProductPreview
* Features
* Models
* HowItWorks
* WhyEchoGPT
* ExtensionPreview
* FAQ
* CTA
* Footer

Chat components:

* AppSidebar
* ConversationList
* ChatHeader
* ModelSelector
* Message
* MessageActions
* PromptComposer
* QuickActions
* EmptyState
* LoadingState

Extension components:

* ExtensionHeader
* ExtensionPrompt
* ExtensionModelSelector
* QuickActions
* ExtensionHistory
* ExtensionSettings

Do not create a component merely because a section is small.

Use good engineering judgment.

---

# 14. DATA ARCHITECTURE

Do not scatter mock data throughout JSX.

Create dedicated data structures.

For example:

data/
├── models.ts
├── conversations.ts
├── messages.ts
├── features.ts
└── faq.ts

Models should have structured information such as:

* id
* name
* provider
* description
* capabilities

Conversations should have:

* id
* title
* model
* timestamp
* messages

Keep mock data realistic.

Avoid lorem ipsum.

---

# 15. REQUIRED INTERACTIONS

The prototype should actually behave like a product.

Implement local interactions for:

### Model selection

User can switch between models.

### New chat

Creates/resets a conversation.

### Conversation selection

Selecting history displays the appropriate conversation.

### Search

Searching conversations filters the conversation list.

### Prompt

User can type into the prompt.

### Send

Sending a prompt should produce a realistic local/mock response.

### Copy

Copying a response should work.

### Regenerate

Regenerate should simulate a new response using mock data.

### Quick actions

Examples:

* Summarize
* Explain
* Rewrite
* Translate
* Debug code

Clicking one should meaningfully interact with the prompt composer.

### Theme

Support light/dark/system where appropriate.

---

# 16. MULTI-MODEL EXPERIENCE

EchoGPT should clearly communicate its multi-model nature.

Include models such as:

* GPT
* Claude
* Gemini
* Other appropriate models

Do not make unsupported claims about exact model capabilities.

Use generic descriptions where necessary.

A useful feature to consider:

## Compare Models

Allow the UI to demonstrate how a user could compare responses from two models.

This can use mock data.

Do not build actual AI API integrations.

---

# 17. LANDING PAGE UX

The landing page should tell a story.

Suggested hierarchy:

1. What EchoGPT is
2. Why it is useful
3. What models/workflows it supports
4. What the product looks like
5. Key features
6. Browser extension
7. FAQ
8. CTA

The hero must communicate the product within a few seconds.

Do not fill the hero with unnecessary text.

Use a strong primary CTA.

---

# 18. PRODUCT PREVIEW

The landing page should contain a realistic EchoGPT interface preview.

Do not use a generic dashboard screenshot.

Build the preview from actual React components where practical.

The product preview should demonstrate:

* Model selector
* Conversation
* Prompt input
* Multi-model capability
* Visual identity

This creates consistency between the marketing page and actual application.

---

# 19. ANIMATION

Use Framer Motion only where it improves UX.

Good examples:

* Hero entrance
* Section reveal
* Product preview reveal
* Navigation transitions
* Modal transitions
* Sidebar transitions
* Subtle hover interactions

Avoid:

* Constant floating animations
* Excessive parallax
* Distracting effects
* Long animation durations

Respect reduced-motion preferences where practical.

Animation should support the interface, not become the interface.

---

# 20. PERFORMANCE

Optimize for a fast frontend.

Consider:

* Server Components
* Image optimization
* Minimal dependencies
* Lazy loading where appropriate
* Avoid unnecessary client-side JavaScript
* Avoid unnecessary state
* Avoid unnecessary re-renders
* Avoid huge assets
* Avoid excessive animation

Do not optimize prematurely.

Prioritize meaningful performance improvements.

---

# 21. STATE MANAGEMENT

Do not introduce Redux/Zustand/etc. unless genuinely necessary.

Prefer:

* React state
* Context where appropriate
* URL state where appropriate
* Local mock data

Keep state close to where it is used.

Avoid global state for simple local interactions.

---

# 22. UI STATES

Every important interactive feature should consider:

* Default
* Hover
* Focus
* Active
* Disabled
* Loading
* Empty
* Error

The UI should not feel unfinished.

---

# 23. ERROR HANDLING

Even though this is a frontend prototype, demonstrate realistic states.

Examples:

* Empty conversation history
* Search with no results
* Failed mock response
* Disabled send button
* Loading assistant response
* Missing conversation

Use appropriate UI instead of silently failing.

---

# 24. ANTI-AI-GENERIC RULE

This is extremely important.

Do NOT produce a generic "AI SaaS landing page" that could belong to any company.

The project should have a distinct EchoGPT identity.

Avoid generic copy such as:

"Unlock the power of AI."

"Transform your workflow."

"Supercharge your productivity."

unless there is a strong contextual reason.

Use concise, product-specific language.

The design should feel deliberate.

---

# 25. NO FAKE COMPLEXITY

Do not pretend that mock functionality is a production backend.

Do not create fake API services such as:

api.generateAIResponse()

unless they are clearly local mock functions.

Keep the prototype architecture honest.

README should explicitly explain:

> AI responses are represented using local mock data because the assignment focuses on frontend engineering and does not require production AI API integration.

---

# 26. SECURITY

Do not put:

* API keys
* secret tokens
* credentials

in the repository.

Do not hardcode private credentials.

Use environment variables if anything sensitive is ever introduced.

---

# 27. GIT QUALITY

Use professional commits.

Prefer commits such as:

feat: add EchoGPT landing page
feat: build chat application shell
feat: add model selector and conversation history
feat: add extension concept
feat: implement theme switching
fix: improve mobile navigation
fix: resolve responsive chat layout
refactor: extract reusable chat components
perf: optimize landing page assets
docs: add project documentation

Avoid commits like:

update
final
changes
stuff
test
asdf

---

# 28. TESTING / VERIFICATION

After each major implementation stage:

Run the appropriate checks available in the project:

* npm run lint
* npm run typecheck if available
* npm run build

If a command does not exist, do not invent it.

Fix genuine errors.

Do not hide warnings or errors simply to make the output look clean.

---

# 29. CODE REVIEW STANDARD

Before considering the project complete, inspect:

## Architecture

* Is the component structure logical?
* Is there duplication?
* Are abstractions justified?

## TypeScript

* Any `any`?
* Unsafe casts?
* Missing types?
* Poor interfaces?

## Next.js

* Unnecessary client components?
* Poor routing?
* Incorrect image handling?
* Unnecessary JavaScript?

## UI

* Consistent spacing?
* Consistent typography?
* Consistent buttons?
* Consistent colors?
* Good visual hierarchy?

## UX

* Are actions obvious?
* Are states clear?
* Does navigation make sense?
* Does the interface feel fast?

## Accessibility

* Keyboard?
* Focus?
* Labels?
* Semantic HTML?
* Contrast?

## Responsive

* Mobile?
* Tablet?
* Desktop?
* Narrow extension viewport?

## Performance

* Heavy assets?
* Unnecessary dependencies?
* Excessive animation?
* Unnecessary client rendering?

---

# 30. FINAL RECRUITER REVIEW

Before final submission, act as a senior frontend engineering recruiter.

Evaluate the project as an internship submission.

Look for:

* Generic AI-generated appearance
* Inconsistent UI
* Poor spacing
* Weak mobile experience
* Overengineering
* Missing states
* Accessibility problems
* TypeScript problems
* Poor component architecture
* Unnecessary dependencies
* Weak README
* Features that do not actually work
* Visual inconsistencies between landing page, web app, and extension

Do not give a vague score.

Create a prioritized list:

P0 — Must fix before submission

P1 — Strongly recommended

P2 — Optional polish

Then wait for approval before making large changes.

---

# 31. README REQUIREMENTS

The final README should include:

# EchoGPT Frontend Redesign

## Overview

## Features

## Design Philosophy

## Tech Stack

## Architecture

## Project Structure

## UX Decisions

## Responsive Design

## Accessibility

## Performance

## Mock Data / Assumptions

## Getting Started

## Environment Variables

Only include environment variables if actually required.

## Build / Deployment

## Additional Features

## Future Improvements

Be honest.

Do not claim features that are not implemented.

---

# 32. DEPLOYMENT

The final project should be deployable to Vercel or another suitable platform.

Before deployment:

* Run production build
* Verify routes
* Verify assets
* Verify responsive behavior
* Verify theme
* Verify interactions
* Check console errors
* Check broken links

---

# 33. IMPORTANT SCOPE RULE

The assignment deadline is close.

Prioritize:

1. Quality
2. Reliability
3. Responsive UX
4. Clean architecture
5. Visual polish

over:

1. Number of features
2. Backend complexity
3. Huge animations
4. Unnecessary integrations

A smaller polished project is better than a huge unfinished project.

---

# 34. HOW YOU SHOULD RESPOND TO ME

When working on this project:

* Do not silently make large architectural decisions.
* Explain important decisions briefly.
* Do not ask unnecessary questions.
* If the requirement is clear, implement it.
* If there are multiple reasonable approaches, choose the simplest professional approach and explain it.
* Do not rewrite working code without a reason.
* Do not introduce dependencies without justification.
* Do not generate huge amounts of unnecessary code.
* Keep changes focused.
* After implementation, report:

  * What changed
  * Files changed
  * Why
  * Verification performed
  * Remaining issues

---

# 35. START NOW

Your FIRST task is NOT implementation.

Inspect the current repository and existing project structure.

Then analyze the current codebase against this assignment.

Return:

## 1. Current Project Audit

## 2. Assignment Requirements Mapping

## 3. Existing Code We Can Reuse

## 4. Problems / Risks

## 5. Recommended Architecture

## 6. Recommended Implementation Order

## 7. Design System Proposal

Do NOT start implementing until this analysis is complete.

Remember:

**We are building a frontend engineering portfolio/assessment project, not a backend AI platform.**

The final result should demonstrate:

**Design thinking + React/Next.js engineering + UX + responsiveness + accessibility + maintainability + attention to detail.**

export interface NavLink {
  href: string;
  label: string;
}

export const LANDING_NAV: ReadonlyArray<NavLink> = [
  { href: "/#features", label: "Features" },
  { href: "/#models", label: "Models" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#extension", label: "Extension" },
  { href: "/#faq", label: "FAQ" },
];

export const LEGAL_NAV: ReadonlyArray<NavLink> = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const FOOTER_LINKS: ReadonlyArray<NavLink> = [
  ...LANDING_NAV,
  ...LEGAL_NAV,
  { href: "/extension", label: "Extension" },
  { href: "/app", label: "Workspace" },
];

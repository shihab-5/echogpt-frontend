"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "/#features", label: "Features" },
  { href: "/#models", label: "Models" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#extension", label: "Extension" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function NavMenu({ className }: { className?: string }) {
  return (
    <nav className={cn("items-center gap-6 md:flex", className)} aria-label="Primary">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="text-sm text-fg-secondary transition-colors duration-fast hover:text-fg-primary"
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

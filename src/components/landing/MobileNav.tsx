"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "/#features", label: "Features" },
  { href: "/#models", label: "Models" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#extension", label: "Extension" },
  { href: "/#faq", label: "FAQ" },
  { href: "/app", label: "Open the workspace" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(dialogRef, open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <IconButton
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        mobileTapTarget
      >
        <Menu size={18} aria-hidden="true" />
      </IconButton>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            id="mobile-nav"
            tabIndex={-1}
            className={cn(
              "absolute left-0 top-0 flex h-full w-[min(86vw,320px)] flex-col",
              "border-r border-border bg-bg-elevated p-5 outline-none",
            )}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-fg-primary">
                Menu
              </span>
              <IconButton
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                size="sm"
              >
                <X size={16} aria-hidden="true" />
              </IconButton>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm",
                    it.href === "/app"
                      ? "bg-brand text-white"
                      : "text-fg-secondary hover:bg-bg-hover hover:text-fg-primary",
                  )}
                >
                  {it.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <ThemeToggle size="sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

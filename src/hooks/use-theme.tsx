"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
} from "@/lib/theme";
import { getJSON, setJSON } from "@/lib/storage";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (next: Theme) => void;
  /** Toggle used by the segmented control. Cycles light → dark → system. */
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_CHANGE_EVENT = "echogpt:theme-change";

function readThemeFromStorage(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = getJSON<{ value: Theme } | null>(THEME_STORAGE_KEY, null);
  return stored?.value ?? DEFAULT_THEME;
}

function subscribeTheme(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(THEME_CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

function getThemeSnapshot(): Theme {
  return readThemeFromStorage();
}

function getThemeServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function subscribeSystem(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

function getSystemSnapshot(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getSystemServerSnapshot(): ResolvedTheme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const systemResolved = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getSystemServerSnapshot,
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemResolved : theme;

  // Apply theme to DOM on every change. Side-effect-only, no setState.
  if (typeof document !== "undefined") {
    const current = document.documentElement.getAttribute("data-theme");
    if (current !== resolvedTheme) {
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    }
  }

  const setTheme = useCallback(
    (next: Theme) => {
      setJSON(THEME_STORAGE_KEY, { value: next });
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    },
    [],
  );

  const cycle = useCallback(() => {
    const order: Theme[] = ["light", "dark", "system"];
    const current = readThemeFromStorage();
    const next = order[(order.indexOf(current) + 1) % order.length]!;
    setJSON(THEME_STORAGE_KEY, { value: next });
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, cycle }),
    [theme, resolvedTheme, setTheme, cycle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider />");
  }
  return ctx;
}

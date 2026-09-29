/**
 * UI variant helpers. Used to discriminate `default | compact | narrow`
 * shapes across surfaces. Keeping these typed here prevents inline
 * boolean prop sprawl (e.g. `compact` + `narrow` + `dense` mixing).
 */
export type UI = "default" | "compact" | "narrow";

export function isCompact(ui: UI): boolean {
  return ui === "compact";
}

export function isNarrow(ui: UI): boolean {
  return ui === "narrow";
}

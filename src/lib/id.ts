/**
 * Generate short unique IDs with a prefix.
 * Uses crypto.randomUUID when available, falls back to Math.random.
 */
export function createId(prefix: string = "id"): string {
  let suffix: string;
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    suffix = crypto.randomUUID().split("-")[0]!;
  } else {
    suffix = Math.random().toString(36).slice(2, 10);
  }
  return `${prefix}_${suffix}`;
}

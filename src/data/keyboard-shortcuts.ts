export interface KeyboardShortcut {
  id: string;
  description: string;
  combo: string[];
}

export const KEYBOARD_SHORTCUTS: ReadonlyArray<KeyboardShortcut> = [
  {
    id: "ks_send",
    description: "Send the prompt",
    combo: ["Enter"],
  },
  {
    id: "ks_newline",
    description: "Add a newline",
    combo: ["Shift", "Enter"],
  },
  {
    id: "ks_send_meta",
    description: "Send (alternative)",
    combo: ["\u2318", "Enter"],
  },
  {
    id: "ks_focus_composer",
    description: "Focus the composer",
    combo: ["/"],
  },
  {
    id: "ks_open_extension",
    description: "Open the extension",
    combo: ["\u2318", "Shift", "E"],
  },
  {
    id: "ks_toggle_theme",
    description: "Cycle theme",
    combo: ["\u2318", "Shift", "T"],
  },
];

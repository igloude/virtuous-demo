export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "vds-theme";

/** Apply a theme by setting (or clearing) `data-theme` on <html>. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — ignore */
  }
}

/** Read the persisted theme preference, defaulting to "system". */
export function getStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "system";
}

'use client';

const STORAGE_KEY = 'theme';

/**
 * Theme toggle with no React state.
 *
 * The `dark` class on `<html>` is the one source of truth: the pre-paint script
 * in the root layout sets it before first paint, this button flips it, and CSS
 * (including which half of the label is displayed) follows from it.
 *
 * An earlier version mirrored the theme into React state and read it back out of
 * the DOM on mount. Server and client then disagreed about the button's label,
 * React threw away the hydrated tree, re-rendered `<html className="dark">` from
 * the JSX, and the mount effect read that back — so a saved light theme was
 * silently reset to dark on every reload. Rendering the label from CSS removes
 * the mismatch, and with it the bug.
 */
export default function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors"
    >
      {/* Only the displayed branch contributes to the accessible name, so it reads
          "Switch to Light" / "Switch to Dark" and still contains the visible word. */}
      <span className="hidden dark:inline">
        <span aria-hidden="true">☀️</span> <span className="sr-only">Switch to </span>Light
      </span>
      <span className="dark:hidden">
        <span aria-hidden="true">🌙</span> <span className="sr-only">Switch to </span>Dark
      </span>
    </button>
  );
}

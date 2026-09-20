/**
 * Class strings shared by more than one page.
 *
 * The blue used for small text is `blue-600` in light mode rather than
 * `blue-500`: at 12–14px on the near-white glass panel, `blue-500` lands at
 * about 3.7:1 against the background and misses WCAG AA's 4.5:1 for body text.
 * Dark mode keeps the lighter `blue-400` for the same reason in reverse.
 */

export const SECTION_HEADING =
  'text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold';

export const LINK = 'text-blue-600 dark:text-blue-400 hover:underline underline-offset-2';

/** Bordered surface used for app cards, repo cards, feature cards, and FAQ entries. */
export const CARD =
  'p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03]';

/** Small rounded label — skills, technologies, categories. */
export const CHIP =
  'px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300';

export const PILL_BASE = 'px-3 py-1 rounded-full font-mono text-xs border transition-colors';

export const PILL_ACTIVE = 'bg-blue-500/15 border-blue-500/60 text-blue-700 dark:text-cyan-300';

export const PILL_INACTIVE =
  'border-black/15 dark:border-white/15 text-gray-600 dark:text-gray-400 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400';

/** Muted mono text: breadcrumbs, timestamps, editor-comment asides. */
export const MUTED_MONO = 'font-mono text-xs text-gray-600 dark:text-gray-400';

/** The dimmest readable step, for the non-semantic half of a breadcrumb. */
export const MUTED_MONO_FAINT = 'text-gray-500 dark:text-gray-500';

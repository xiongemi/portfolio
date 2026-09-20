import Link from 'next/link';
import type { Route } from './routes';

const FILE_ICONS: Record<string, string> = {
  tsx: '⚛️',
  json: '🗂️',
  md: '📝',
};

// The focus ring is inset: the card that wraps the tab strip is `overflow-hidden`,
// so the global outward offset would be clipped on the first and last tab. Only
// the offset is overridden — the colour stays the site-wide `--focus-ring`.
const BASE_CLASSES = `
  flex items-center gap-2 px-4 sm:px-6 py-4
  text-sm font-mono no-underline
  cursor-pointer select-none
  border-r border-black/10 dark:border-white/10
  focus-visible:-outline-offset-2
`;

const ACTIVE_CLASSES =
  'text-blue-600 dark:text-blue-400 bg-black/5 dark:bg-white/10 border-b-2 border-b-blue-500 pb-[calc(1rem-2px)]';

const INACTIVE_CLASSES =
  'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200';

export function FileTab({
  fileName,
  name,
  url,
  isExternal = false,
  isActive = false,
}: Route & { isActive?: boolean }) {
  const extension = fileName.split('.').pop() ?? '';
  const className = `${BASE_CLASSES} ${isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES}`;

  const label = (
    <>
      <span aria-hidden="true" className="opacity-70">
        {FILE_ICONS[extension] ?? '📄'}
      </span>
      <span>{fileName}</span>
      {isExternal && (
        <span aria-hidden="true" className="opacity-50 text-xs">
          ↗
        </span>
      )}
      {isActive && !isExternal && (
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
      )}
    </>
  );

  // The accessible name has to contain the visible text (WCAG 2.5.3, Label in Name),
  // so a voice-control user saying "about.json" still activates the tab — the plain
  // name is appended for context rather than replacing the file name.
  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${fileName} — ${name} (opens in a new tab)`}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={url}
      aria-label={`${fileName} — ${name}`}
      aria-current={isActive ? 'page' : undefined}
      className={className}
    >
      {label}
    </Link>
  );
}

export default FileTab;

import Link from 'next/link';
import type { Route } from './routes';

const FILE_ICONS: Record<string, string> = {
  tsx: '⚛️',
  json: '🗂️',
  md: '📝',
};

const BASE_CLASSES = `
  flex items-center gap-2 px-4 sm:px-6 py-4
  text-sm font-mono no-underline
  cursor-pointer select-none
  border-r border-white/10
`;

const ACTIVE_CLASSES =
  'text-blue-500 bg-white/5 dark:bg-white/10 border-b-2 border-blue-500 pb-[calc(1rem-2px)]';

const INACTIVE_CLASSES =
  'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/5 transition-all duration-200';

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

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} (opens in a new tab)`}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={url}
      aria-label={name}
      aria-current={isActive ? 'page' : undefined}
      className={className}
    >
      {label}
    </Link>
  );
}

export default FileTab;

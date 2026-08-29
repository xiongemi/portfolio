'use client';

import { usePathname } from 'next/navigation';
import FileTab from './FileTab';
import { routes } from './routes';

/** Longest matching internal route wins, so `/projects/x` still highlights `/projects`. */
function activeUrl(pathname: string): string | undefined {
  return routes
    .filter((route) => !route.isExternal)
    .filter(
      (route) => route.url === pathname || (route.url !== '/' && pathname.startsWith(route.url)),
    )
    .sort((a, b) => b.url.length - a.url.length)[0]?.url;
}

export function EditorHeader() {
  const pathname = usePathname();
  const active = activeUrl(pathname);

  return (
    <nav
      aria-label="Site sections"
      className="flex border-y border-gray-200 dark:border-gray-900 flex-wrap w-full"
    >
      {routes.map((route) => (
        <FileTab key={route.url} {...route} isActive={route.url === active} />
      ))}
    </nav>
  );
}

export default EditorHeader;

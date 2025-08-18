import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FileTab from './FileTab';
import { routes } from './routes';

export function EditorHeader() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const matchingRoute = routes.find((route) => {
      if (route.url === pathname) return true;
      if (route.url !== '/' && pathname.startsWith(route.url)) return true;
      return false;
    });

    if (matchingRoute) {
      setActiveTab(matchingRoute.url);
    }
  }, [pathname]);

  if (!activeTab) {
    // Avoid rendering until we know the active tab on client
    return null;
  }

  const handleTabClick = (url: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(url, '_blank');
    } else {
      setActiveTab(url);
      router.push(url);
    }
  };

  return (
    <div
      className="flex border-y border-gray-200 dark:border-gray-900 flex-wrap w-full"
      role="navigation"
    >
      {routes.map((tab) => (
        <FileTab
          key={tab.url}
          fileName={tab.name}
          isActive={activeTab === tab.url}
          onClick={() => handleTabClick(tab.url, (tab as any).isExternal)}
        />
      ))}
    </div>
  );
}

export default EditorHeader;

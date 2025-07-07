'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FileTab from './FileTab';
import { routes } from './routes';

export function EditorHeader() {
  const [activeTab, setActiveTab] = useState('/');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Find the matching route for the current pathname
    const matchingRoute = routes.find((route) => {
      if (route.url === pathname) return true;
      if (route.url !== '/' && pathname.startsWith(route.url)) return true;
      return false;
    });

    if (matchingRoute) {
      setActiveTab(matchingRoute.url);
    }
  }, [pathname]);

  const handleTabClick = (url: string) => {
    setActiveTab(url);
    router.push(url);
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
          onClick={() => handleTabClick(tab.url)}
        />
      ))}
    </div>
  );
}

export default EditorHeader;

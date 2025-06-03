'use client'

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import FileTab from './FileTab'; 
import { routes } from './routes';

export function EditorHeader() {
  const [activeTab, setActiveTab] = useState('/');
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (activeTab != pathname) {
      router.push(activeTab)
    }
  }, [pathname, activeTab, router])

  return (
    <div className="flex border-y border-gray-200 dark:border-gray-900 flex-wrap w-full" role="navigation">
      {routes.map((tab) => (
        <FileTab
          key={tab.url}
          fileName={tab.name}
          isActive={activeTab === tab.url}
          onClick={() => setActiveTab(tab.url)} // Make tabs clickable to change active state
        />
      ))}
    </div>
  );
};

export default EditorHeader;
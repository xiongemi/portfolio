'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EditorHeader from './EditorHeader';

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center w-full">
    <div className="bg-gray-100 shadow-lg dark:bg-gray-800 dark:shadow-2xl rounded-lg overflow-hidden lg:w-3/4 xl:w-1/2">
      <div className="bg-slate-200 dark:bg-gray-700 px-4 py-2 flex items-center space-x-2 justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <button
          onClick={toggleTheme}
          className="bg-inherit text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white text-sm font-semibold focus:outline-none"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <EditorHeader />
      {children}
    </div>
    </div>
  );
}

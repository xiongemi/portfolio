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
    <div className="flex items-center justify-center min-h-screen w-full p-4 md:p-8">
      <div className="glass shadow-2xl rounded-2xl overflow-hidden w-full lg:w-4/5 xl:w-2/3 transition-all duration-500 hover:shadow-blue-500/10">
        <div className="bg-white/10 dark:bg-black/20 px-6 py-4 flex items-center space-x-2 justify-between border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-inner"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-inner"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-inner"></div>
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest hidden sm:block">
            portfolio-editor v1.0
          </div>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-semibold transition-colors"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <EditorHeader />
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}

import type React from 'react';
import EditorHeader from './EditorHeader';
import ThemeToggle from './ThemeToggle';

const MAIN_ID = 'main-content';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-center min-h-screen w-full p-4 md:p-8">
      {/* First focusable element on the page, so keyboard and switch users can jump
          past the editor tabs straight to the content. */}
      <a
        href={`#${MAIN_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:font-medium focus:no-underline"
      >
        Skip to content
      </a>

      <div className="glass shadow-2xl rounded-2xl overflow-hidden w-full lg:w-4/5 xl:w-2/3 transition-shadow duration-500 hover:shadow-blue-500/10">
        <header className="bg-white/10 dark:bg-black/20 px-6 py-4 flex items-center gap-4 justify-between border-b border-black/10 dark:border-white/10">
          <div aria-hidden="true" className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full inset-shadow-sm" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full inset-shadow-sm" />
            <div className="w-3 h-3 bg-green-500 rounded-full inset-shadow-sm" />
          </div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-widest hidden sm:block">
            portfolio-editor v1.0
          </div>
          <ThemeToggle />
        </header>
        <EditorHeader />
        <main id={MAIN_ID} className="p-2">
          {children}
        </main>
      </div>
    </div>
  );
}

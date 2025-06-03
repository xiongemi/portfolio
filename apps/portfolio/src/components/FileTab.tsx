import React from 'react';

interface FileTabProps {
  fileName: string;
  isActive?: boolean;
  onClick: () => void
}

export function FileTab({ fileName, isActive = false, onClick }: FileTabProps) {
  // Determine background and text colors based on active state
  const tabClasses = isActive
    ? 'text-amber-800 bg-gray-100 bg-gray dark:bg-gray-800 dark:text-gray-200' // Active tab styles
    : 'text-amber-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'; // Inactive tab styles

  return (
    <button
      className={`
        flex text-xl items-center space-x-2 px-4 py-3
        text-sm font-sans
        cursor-pointer select-none
        border-r border-gray-300 dark:border-gray-700
        ${tabClasses}
      `}
      onClick={onClick}
    >
      <span>⚛️</span>
      <span>{fileName}</span>
    </button>
  );
}

export default FileTab;

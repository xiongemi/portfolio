import React from 'react';

interface FileTabProps {
  fileName: string;
  isActive?: boolean;
  onClick: () => void;
}

export function FileTab({ fileName, isActive = false, onClick }: FileTabProps) {
  const tabClasses = isActive
    ? 'text-blue-500 bg-white/5 dark:bg-white/10 border-b-2 border-blue-500'
    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/5 transition-all duration-200';

  return (
    <button
      className={`
        flex items-center space-x-2 px-6 py-4
        text-sm font-medium
        cursor-pointer select-none
        border-r border-white/10
        ${tabClasses}
      `}
      onClick={onClick}
    >
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {fileName.endsWith('.tsx') ? '⚛️' : '📄'}
      </span>
      <span>{fileName}</span>
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-2" />}
    </button>
  );
}

export default FileTab;

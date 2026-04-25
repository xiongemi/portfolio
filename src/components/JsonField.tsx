import { ReactNode } from 'react';

interface JsonFieldProps {
  fieldName: string;
  children: string | ReactNode;
  isLast?: boolean;
  className?: string;
}

export function JsonField({ fieldName, children, isLast = false, className = '' }: JsonFieldProps) {
  return (
    <div
      className={`ml-8 py-0.5 group transition-all duration-200 hover:bg-white/5 rounded px-2 -mx-2 ${className}`}
    >
      <span className="text-blue-600 dark:text-cyan-400 font-medium">&quot;{fieldName}&quot;</span>
      <span className="text-gray-600 dark:text-gray-500 mx-1">:</span>
      <span className="text-green-700 dark:text-emerald-400">&quot;{children}&quot;</span>
      {!isLast && <span className="text-gray-600 dark:text-gray-500">,</span>}
    </div>
  );
}

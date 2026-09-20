import type { ReactNode } from 'react';

interface JsonFieldProps {
  fieldName: string;
  children: ReactNode;
  isLast?: boolean;
  className?: string;
}

/**
 * One `"key": "value",` row of the JSON-shaped home page. The JSON punctuation is
 * decoration around real content, so it is hidden from assistive tech — otherwise
 * every line is read as `quote name quote colon quote ... quote comma`.
 */
export function JsonField({ fieldName, children, isLast = false, className = '' }: JsonFieldProps) {
  return (
    <div
      className={`ml-4 py-0.5 rounded-sm pl-10 -indent-8 pr-2 -mx-2 transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 ${className}`}
    >
      <span className="text-blue-600 dark:text-cyan-400 font-medium">
        <span aria-hidden="true">&quot;</span>
        {fieldName}
        <span aria-hidden="true">&quot;</span>
      </span>
      <span aria-hidden="true" className="text-gray-600 dark:text-gray-400 mx-1">
        :
      </span>
      <span className="text-green-700 dark:text-emerald-400">
        <span aria-hidden="true">&quot;</span>
        {children}
        <span aria-hidden="true">&quot;</span>
      </span>
      {!isLast && (
        <span aria-hidden="true" className="text-gray-600 dark:text-gray-400">
          ,
        </span>
      )}
    </div>
  );
}

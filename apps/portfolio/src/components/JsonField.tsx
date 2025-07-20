import { ReactNode } from 'react';

interface JsonFieldProps {
  fieldName: string;
  children: string | ReactNode;
  isLast?: boolean;
  className?: string;
}

export function JsonField({
  fieldName,
  children,
  isLast = false,
  className = '',
}: JsonFieldProps) {
  return (
    <div className={`ml-8 -indent-8 ${className}`}>
      <span className="text-blue-800 dark:text-cyan-400">
        &quot;{fieldName}&quot;
      </span>
      <span className="text-black dark:text-yellow-400">:</span>
      <span> </span>
      <span className="text-red-500 dark:text-purple-400">
        &quot;{children}&quot;
      </span>
      {!isLast && <span className="text-black dark:text-yellow-400">,</span>}
    </div>
  );
}

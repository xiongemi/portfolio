import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-6 font-sans min-h-[400px] flex items-center justify-center fade-up">
      <div className="text-center">
        <p className="font-mono text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Page not found</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-md mx-auto">
          This page doesn&rsquo;t exist, or it has moved. The tabs above still work.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors no-underline font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

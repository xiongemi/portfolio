import Link from 'next/link';
import { getAllPosts } from '../../lib/api';
import { formatDate } from '../../lib/utils';

export const metadata = {
  title: 'Blog Posts',
  description: 'All blog posts by Emily Xiong',
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Blog Posts
      </h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <Link
              href={`/blogs/${post.slug}`}
              className="no-underline block hover:opacity-80 transition-opacity"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <time>{formatDate(post.date)}</time>
                {post.author && <span>by {post.author}</span>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

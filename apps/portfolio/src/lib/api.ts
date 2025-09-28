import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  coverImage?: string;
};

export function getPostSlugs() {
  try {
    return readdirSync(postsDirectory);
  } catch (error) {
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      author: data.author,
      coverImage: data.coverImage,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => {
      const t1 = new Date(post1.date).getTime();
      const t2 = new Date(post2.date).getTime();
      const a = Number.isNaN(t1) ? 0 : t1;
      const b = Number.isNaN(t2) ? 0 : t2;
      return b - a; // newest first
    });
  return posts;
}

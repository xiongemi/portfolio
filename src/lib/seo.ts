import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Where search engines are pointed — see NEXT_PUBLIC_CANONICAL_URL in next.config.js. */
export const CANONICAL_URL = process.env.NEXT_PUBLIC_CANONICAL_URL ?? SITE_URL;

export const SITE_NAME = "Emily Xiong's Portfolio";
export const AUTHOR_NAME = 'Emily Xiong';

export const OG_IMAGE = `${CANONICAL_URL}/og.png`;
export const OG_IMAGE_ALT = 'Emily Xiong — Software Engineer in Toronto';

/** Profiles that identify the same person, for search and answer engines. */
export const SAME_AS = [
  'https://github.com/xiongemi',
  'https://www.linkedin.com/in/xiongemi/',
  'https://emilyxiong.medium.com/',
];

export function absoluteUrl(path: string): string {
  return path === '/' ? `${CANONICAL_URL}/` : `${CANONICAL_URL}${path}`;
}

/**
 * Page metadata with the Open Graph and Twitter blocks filled in.
 *
 * Both are nested objects, and Next replaces a nested object wholesale when a
 * child segment redefines it. A page that set `openGraph` by hand therefore
 * dropped the root's `images`, `siteName`, and `locale` — so every route builds
 * its card through here instead.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  /** Defaults to `title`; use when the card reads better with more context. */
  ogTitle?: string;
  type?: 'website' | 'profile' | 'article';
}): Metadata {
  const url = absoluteUrl(path);
  const cardTitle = ogTitle ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_CA',
      title: cardTitle,
      description,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cardTitle,
      description,
      images: [{ url: OG_IMAGE, alt: OG_IMAGE_ALT }],
    },
  };
}

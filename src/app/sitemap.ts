import type { MetadataRoute } from 'next';
import { routes } from '../components/routes';
import { apps } from '../lib/apps';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const pages = routes
    .filter((route) => !route.isExternal)
    .map((route) => ({
      url: route.url === '/' ? `${siteUrl}/` : `${siteUrl}${route.url}`,
      changeFrequency: 'monthly' as const,
      priority: route.url === '/' ? 1 : 0.8,
    }));

  // The three pages each App Store listing points at.
  const appPages = apps.flatMap((app) =>
    ['', '/support', '/terms', '/privacy'].map((suffix) => ({
      url: `${siteUrl}/projects/${app.slug}${suffix}`,
      changeFrequency: 'monthly' as const,
      priority: suffix === '' ? 0.7 : 0.5,
    })),
  );

  return [...pages, ...appPages];
}

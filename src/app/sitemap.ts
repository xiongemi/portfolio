import type { MetadataRoute } from 'next';
import { routes } from '../components/routes';
import { apps } from '../lib/apps';
import { absoluteUrl } from '../lib/seo';

export const dynamic = 'force-static';

/** Fallback for pages with no date of their own — the newest app release. */
const lastContentChange = apps
  .map((app) => app.updated)
  .filter((date): date is string => Boolean(date))
  .sort()
  .at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes
    .filter((route) => !route.isExternal)
    .map((route) => ({
      url: absoluteUrl(route.url),
      lastModified: lastContentChange,
      changeFrequency: 'monthly' as const,
      priority: route.url === '/' ? 1 : 0.8,
    }));

  // The four pages each store listing points at.
  const appPages = apps.flatMap((app) =>
    ['', '/support', '/terms', '/privacy'].map((suffix) => ({
      url: absoluteUrl(`/projects/${app.slug}${suffix}`),
      lastModified: app.updated ?? lastContentChange,
      changeFrequency: 'monthly' as const,
      priority: suffix === '' ? 0.7 : 0.5,
    })),
  );

  return [...pages, ...appPages];
}

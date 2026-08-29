import type { MetadataRoute } from 'next';
import { routes } from '../components/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return routes
    .filter((route) => !route.isExternal)
    .map((route) => ({
      url: route.url === '/' ? `${siteUrl}/` : `${siteUrl}${route.url}`,
      changeFrequency: 'monthly' as const,
      priority: route.url === '/' ? 1 : 0.8,
    }));
}

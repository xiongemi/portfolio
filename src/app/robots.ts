import type { MetadataRoute } from 'next';
import { absoluteUrl, CANONICAL_URL } from '../lib/seo';

export const dynamic = 'force-static';

// Answer engines read the same robots.txt as search crawlers. Naming them is
// not required by an allow-all rule, but it states the intent explicitly.
const ANSWER_ENGINES = [
  'ChatGPT-User',
  'OAI-SearchBot',
  'GPTBot',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ANSWER_ENGINES, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: CANONICAL_URL,
  };
}

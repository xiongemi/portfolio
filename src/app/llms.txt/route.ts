import { apps, publishedApps } from '../../lib/apps';
import { absoluteUrl } from '../../lib/seo';

export const dynamic = 'force-static';

/**
 * /llms.txt — a plain-text map of the site for answer engines, which read it in
 * preference to crawling the rendered pages. Generated from the same catalogue
 * the pages render, so it cannot drift.
 */
export function GET() {
  const appLines = apps.map((app) => {
    const state = app.status === 'unreleased' ? ' (in review, not yet released)' : '';
    return `- [${app.name}](${absoluteUrl(`/projects/${app.slug}`)})${state}: ${app.tagline} Support: ${absoluteUrl(`/projects/${app.slug}/support`)} · Terms: ${absoluteUrl(`/projects/${app.slug}/terms`)} · Privacy: ${absoluteUrl(`/projects/${app.slug}/privacy`)}`;
  });

  const body = `# Emily Xiong

> Software developer based in Toronto, building with React, React Native, and Expo. Core maintainer of Nx from 2021 to 2025, and the solo developer behind ${publishedApps.length} free apps on the App Store and Google Play.

## Pages

- [Home](${absoluteUrl('/')}): who Emily Xiong is, the stack behind the work, and links to profiles elsewhere.
- [Resume](${absoluteUrl('/resume')}): experience, core skills, education, and conference talks.
- [Projects](${absoluteUrl('/projects')}): every shipped app, plus open-source work and Nx maintenance.

## Apps

${appLines.join('\n')}

## Notes

- Every app is free to download and needs no account, except BrainDump, which has an optional Premium subscription.
- Each app has its own marketing, support, terms, and privacy pages under /projects/<slug>/.
`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

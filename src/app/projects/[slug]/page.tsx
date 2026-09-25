import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AppDocShell, { DocSection } from '../../../components/AppDocShell';
import JsonLd from '../../../components/JsonLd';
import { appParams, formatDate, getApp, getAppPageContent, STORE_LABELS } from '../../../lib/apps';
import { pageMetadata } from '../../../lib/seo';
import { appSchema, breadcrumbSchema } from '../../../lib/structuredData';
import { CARD, SECTION_HEADING } from '../../../lib/styles';

export function generateStaticParams() {
  return appParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return pageMetadata({
    title: app.name,
    description: app.tagline,
    path: `/projects/${slug}`,
    ogTitle: `${app.name} — ${app.tagline}`,
  });
}

/** The marketing URL submitted with each App Store listing. */
export default async function AppMarketingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  const content = getAppPageContent(slug);
  if (!app || !content) notFound();

  const unreleased = app.status === 'unreleased';

  const facts = [
    { k: 'price', v: app.price },
    { k: 'version', v: app.version },
    { k: 'category', v: app.category },
    { k: 'platforms', v: 'android' in app.stores ? 'iOS · Android' : 'iOS' },
  ];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: app.name, path: `/projects/${app.slug}` },
  ]);

  return (
    <AppDocShell
      app={app}
      current="marketing"
      fileName="overview.md"
      title={app.name}
      subtitle={content.headline}
    >
      <JsonLd data={appSchema(app, content.summary)} />
      <JsonLd data={breadcrumbs} />

      <DocSection title="What it is">
        <p>{content.summary}</p>
        <p className="text-gray-700 dark:text-gray-400 italic">{content.audience}</p>
      </DocSection>

      <section className="mb-10">
        <h2 className={`${SECTION_HEADING} mb-4`}>Highlights</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {content.features.map((feature) => (
            <li key={feature.title} className={CARD}>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className={`${SECTION_HEADING} mb-4`}>Download</h2>
        {unreleased && (
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {app.name} has not been released yet. This page is live so the store listing has
            somewhere to point while the app is in review.
          </p>
        )}
        <p className="flex flex-wrap gap-3">
          {Object.entries(app.stores).map(([store, url]) => {
            const storeLabel = STORE_LABELS[store as keyof typeof STORE_LABELS];
            return (
              <a
                key={store}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get ${app.name} on the ${storeLabel} (opens in a new tab)`}
                className="px-4 py-2 rounded-lg border border-blue-500/50 bg-blue-500/10 font-mono text-xs text-blue-700 dark:text-cyan-300 hover:bg-blue-500/20 transition-colors"
              >
                {storeLabel} <span aria-hidden="true">↗</span>
              </a>
            );
          })}
        </p>
      </section>

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10 font-mono text-center bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        {facts.map(({ k, v }) => (
          <div key={k} className="flex flex-col-reverse bg-white/40 dark:bg-black/30 px-3 py-4">
            <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">
              {k}
            </dt>
            <dd className="text-base md:text-lg font-bold text-blue-600 dark:text-cyan-400">{v}</dd>
          </div>
        ))}
      </dl>

      <DocSection title="Release">
        <p className="font-mono text-sm text-gray-700 dark:text-gray-400">
          {app.released && app.updated ? (
            <>
              Released <time dateTime={app.released}>{formatDate(app.released)}</time>, last updated{' '}
              <time dateTime={app.updated}>{formatDate(app.updated)}</time>.
            </>
          ) : (
            <>Awaiting first release. Version {app.version} is the build in submission.</>
          )}
        </p>
      </DocSection>

      <DocSection title="Good to know">
        <p className="text-sm text-gray-700 dark:text-gray-400 border-l-2 border-blue-500/40 pl-4">
          {content.disclaimer}
        </p>
      </DocSection>
    </AppDocShell>
  );
}

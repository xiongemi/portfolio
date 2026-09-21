import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AppDocShell, { DocSection } from '../../../../components/AppDocShell';
import {
  appParams,
  developer,
  getApp,
  getAppPageContent,
  STORE_LABELS,
  sharedFaq,
} from '../../../../lib/apps';
import { CARD, LINK, SECTION_HEADING } from '../../../../lib/styles';

const canonicalUrl =
  process.env.NEXT_PUBLIC_CANONICAL_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000';

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

  const description = `Support for ${app.name} — how to report a bug, request a feature, and answers to common questions.`;

  return {
    title: `${app.name} Support`,
    description,
    alternates: { canonical: `${canonicalUrl}/projects/${slug}/support` },
    openGraph: {
      type: 'website',
      title: `${app.name} Support`,
      description,
      url: `${canonicalUrl}/projects/${slug}/support`,
    },
  };
}

/** The support URL submitted with each App Store listing. */
export default async function AppSupportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  const content = getAppPageContent(slug);
  if (!app || !content) notFound();

  const faq = [...sharedFaq(app, content), ...content.faq];

  return (
    <AppDocShell
      app={app}
      current="support"
      fileName="support.md"
      title={`${app.name} Support`}
      subtitle={`Something broken, missing, or confusing in ${app.name}? Email is the way to reach a human — one developer builds and maintains this app, and reads what arrives.`}
    >
      <DocSection title="Contact">
        <p>
          For help, a bug report, or a feature request, email{' '}
          <a
            href={`mailto:${developer.email}?subject=${encodeURIComponent(`${app.name} support`)}`}
            className={`${LINK} font-medium`}
          >
            {developer.email}
          </a>
          .
        </p>
      </DocSection>

      <DocSection title="What to include">
        <p>A report with these details can usually be acted on without a round trip:</p>
        <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
          <li>
            The app name — <strong>{app.name}</strong> — and the version you are running (currently
            v{app.version}).
          </li>
          <li>Your device model, for example iPhone 15 or Pixel 8.</li>
          <li>Your iOS or Android version.</li>
          <li>What you expected to happen, what happened instead, and the steps that led there.</li>
          <li>A screenshot or screen recording, if it makes the problem easier to see.</li>
        </ul>
      </DocSection>

      <section className="mb-8">
        <h2 className={`${SECTION_HEADING} mb-4`}>Common questions</h2>
        <dl className="space-y-4">
          {faq.map((entry) => (
            <div key={entry.q} className={CARD}>
              <dt className="font-bold text-gray-900 dark:text-gray-100 leading-snug mb-1.5">
                {entry.q}
              </dt>
              <dd className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                {entry.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <DocSection title="Store listings">
        {app.status === 'unreleased' && (
          <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
            Not on a store yet — {app.name} is awaiting its first release.
          </p>
        )}
        <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
          {Object.entries(app.stores).map(([store, url]) => {
            const storeLabel = STORE_LABELS[store as keyof typeof STORE_LABELS];
            return (
              <a
                key={store}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${storeLabel} listing for ${app.name} (opens in a new tab)`}
                className={LINK}
              >
                {storeLabel} <span aria-hidden="true">↗</span>
              </a>
            );
          })}
        </p>
      </DocSection>
    </AppDocShell>
  );
}

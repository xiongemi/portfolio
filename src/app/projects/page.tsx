'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import ossData from '../../assets/projects.json';
import JsonLd from '../../components/JsonLd';
import {
  androidApps,
  appStoreDeveloperUrl,
  apps,
  playDeveloperUrl,
  publishedApps,
  STORE_LABELS,
} from '../../lib/apps';
import { appListSchema } from '../../lib/structuredData';
import {
  CARD,
  LINK,
  PILL_ACTIVE,
  PILL_BASE,
  PILL_INACTIVE,
  SECTION_HEADING,
} from '../../lib/styles';

const { projects: oss } = ossData;

// `next/image` with `unoptimized: true` passes src straight through, so public/
// assets need the basePath applied by hand for the GitHub Pages build.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const ALL = 'All';
const CATEGORIES = [ALL, ...Array.from(new Set(apps.map((a) => a.category)))];

const androidCount = androidApps.length;

const LISTING_DESCRIPTION =
  'Free iOS and Android apps built solo by Emily Xiong — citizenship and language exam prep, ' +
  'and local-first utilities — plus open-source work and Nx maintenance.';

// Dates in apps.json are plain ISO days, which parse as UTC midnight. Formatting
// them in the viewer's zone shifts anything dated the 1st back into the previous
// month (and would differ between the build machine and the browser), so pin the
// zone to UTC and the label always matches the data.
const monthFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

export default function ProjectsPage() {
  const [category, setCategory] = useState(ALL);

  const visible = useMemo(
    () => (category === ALL ? apps : apps.filter((a) => a.category === category)),
    [category],
  );

  return (
    <div className="p-2 md:p-12 font-sans max-w-5xl mx-auto fade-up">
      <JsonLd data={appListSchema(apps, LISTING_DESCRIPTION)} />
      {/* Header — editor breadcrumb + comment block */}
      <header className="border-b border-black/10 dark:border-white/10 pb-8 mb-10">
        <p aria-hidden="true" className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-4">
          <span className="text-gray-500 dark:text-gray-500">~/portfolio/</span>
          projects.tsx
        </p>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
          Things I&apos;ve shipped
        </h1>
        <p className="font-mono text-sm md:text-base text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {'/**'}
            <br />
            {' * '}
          </span>
          {publishedApps.length} apps on the App Store, {androidCount} of them also on Google Play.
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' * '}
          </span>
          All free, all shipped solo.
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' * '}
          </span>
          Most are study tools for people sitting citizenship and language exams
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' * '}
          </span>
          in a country they have just moved to.
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' * '}
          </span>
          The rest are local-first utilities that keep your data on your phone,
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' * '}
          </span>
          plus whatever is still in review.
          <br />
          <span aria-hidden="true" className="text-green-700 dark:text-emerald-400">
            {' */'}
          </span>
        </p>
      </header>

      {/* Status bar — quick facts */}
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 font-mono text-center bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        {[
          { k: 'apps shipped', v: String(publishedApps.length) },
          { k: 'also on Android', v: String(androidCount) },
          { k: 'price, every one', v: 'Free' },
          { k: 'account required', v: 'None' },
        ].map(({ k, v }) => (
          <div key={k} className="flex flex-col-reverse bg-white/40 dark:bg-black/30 px-3 py-5">
            <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">
              {k}
            </dt>
            <dd className="text-xl md:text-2xl font-bold text-blue-600 dark:text-cyan-400">{v}</dd>
          </div>
        ))}
      </dl>

      {/* iOS apps */}
      <section className="mb-16" aria-labelledby="published-apps-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <h2 id="published-apps-heading" className={SECTION_HEADING}>
            Published Apps
          </h2>
          <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
            <legend className="sr-only">Filter apps by category</legend>
            {CATEGORIES.map((c) => {
              const active = c === category;
              const count = c === ALL ? apps.length : apps.filter((a) => a.category === c).length;
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_INACTIVE}`}
                >
                  {c}
                  {c !== ALL && <span className="ml-1.5 opacity-70">{count}</span>}
                </button>
              );
            })}
          </fieldset>
        </div>

        {/* Filtering swaps the list out from under a screen reader with no other
            signal that anything happened. */}
        <p role="status" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? 'app' : 'apps'}
          {category === ALL ? '' : ` in ${category}`}.
        </p>

        <ul className="grid gap-4 md:grid-cols-2">
          {visible.map((app) => (
            <li
              key={app.slug}
              className={`${CARD} h-full flex gap-4 hover:border-blue-500/40 transition-colors`}
            >
              <Image
                src={`${BASE_PATH}${app.icon}`}
                alt=""
                width={256}
                height={256}
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl shrink-0 shadow-sm"
              />
              <div className="min-w-0 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  <Link
                    href={`/projects/${app.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {app.name}
                  </Link>
                  {app.nameAlt ? (
                    <span className="ml-2 font-normal text-sm text-gray-600 dark:text-gray-400">
                      {app.nameAlt}
                    </span>
                  ) : null}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1.5 leading-snug">
                  {app.tagline}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {app.detail}
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                    {app.category}
                  </span>
                  <span>v{app.version}</span>
                  <span aria-hidden="true">·</span>
                  {app.updated ? (
                    <span>
                      updated{' '}
                      <time dateTime={app.updated}>
                        {monthFormatter.format(new Date(app.updated))}
                      </time>
                    </span>
                  ) : (
                    <span className="text-blue-600 dark:text-cyan-400">in review</span>
                  )}
                </p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-black/10 dark:border-white/10 font-mono text-xs">
                  <Link
                    href={`/projects/${app.slug}`}
                    aria-label={`Details, support, and terms for ${app.name}`}
                    className={LINK}
                  >
                    Details
                  </Link>
                  {Object.entries(app.stores).map(([store, url]) => {
                    const storeLabel = STORE_LABELS[store as keyof typeof STORE_LABELS];
                    return (
                      <a
                        key={store}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        // Without the app name every card repeats "App Store", which is
                        // useless in a screen reader's list of links.
                        aria-label={`${storeLabel} — ${app.name} (opens in a new tab)`}
                        className={LINK}
                      >
                        {storeLabel} <span aria-hidden="true">↗</span>
                      </a>
                    );
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="flex flex-wrap gap-x-6 gap-y-1 mt-6 font-mono text-xs text-gray-600 dark:text-gray-400">
          <a
            href={appStoreDeveloperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-blue-500/40 underline-offset-2"
          >
            <span aria-hidden="true">→</span> All apps on the App Store
          </a>
          <a
            href={playDeveloperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-blue-500/40 underline-offset-2"
          >
            <span aria-hidden="true">→</span> All apps on Google Play
          </a>
        </p>
      </section>

      {/* Open source */}
      <section className="mb-16" aria-labelledby="open-source-heading">
        <h2 id="open-source-heading" className={`${SECTION_HEADING} mb-6`}>
          Open Source
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {oss.map((p) => (
            <li key={p.githubUrl} className={`${CARD} flex flex-col`}>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {p.description}
              </p>
              <ul className="flex flex-wrap gap-1.5 mb-4">
                {p.technologies.map((t) => (
                  <li
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-mono text-xs text-gray-700 dark:text-gray-300"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="flex gap-4 mt-auto font-mono text-xs">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Code for ${p.name} on GitHub (opens in a new tab)`}
                  className={LINK}
                >
                  Code <span aria-hidden="true">↗</span>
                </a>
                {p.websiteUrl && (
                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Demo of ${p.name} (opens in a new tab)`}
                    className={LINK}
                  >
                    Demo <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Maintainer note */}
      <section className="mb-12" aria-labelledby="also-maintained-heading">
        <h2 id="also-maintained-heading" className={`${SECTION_HEADING} mb-4`}>
          Also Maintained
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-2 border-blue-500/40 pl-6">
          Core maintainer of{' '}
          <a
            href="https://nx.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nx (opens in a new tab)"
            className="not-italic font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Nx
          </a>{' '}
          from 2021 to 2025, working on the React, React Native, Expo, and Vite integrations —
          including the automated migrations that move thousands of workspaces between major
          versions.
        </p>
      </section>

      {/* CTA */}
      <footer className="border-t border-black/10 dark:border-white/10 pt-8">
        <p className="font-mono text-sm text-gray-700 dark:text-gray-400">
          <span aria-hidden="true" className="text-gray-500 dark:text-gray-500">
            {'// '}
          </span>
          Building something in this space?{' '}
          <a
            href="mailto:xiongemi@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
          >
            xiongemi@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}

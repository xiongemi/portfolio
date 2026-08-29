'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import appsData from '../../assets/apps.json';
import ossData from '../../assets/projects.json';

const { apps, appStoreDeveloperUrl, playDeveloperUrl } = appsData;
const { projects: oss } = ossData;

// `next/image` with `unoptimized: true` passes src straight through, so public/
// assets need the basePath applied by hand for the GitHub Pages build.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const CATEGORIES = ['All', ...Array.from(new Set(apps.map((a) => a.category)))];

const STORE_LABELS = { ios: 'App Store', android: 'Google Play' } as const;

const androidCount = apps.filter((a) => 'android' in a.stores).length;

export default function ProjectsPage() {
  const [category, setCategory] = useState('All');

  const visible = useMemo(
    () => (category === 'All' ? apps : apps.filter((a) => a.category === category)),
    [category],
  );

  return (
    <div className="p-2 md:p-12 font-sans max-w-5xl mx-auto fade-up">
      {/* Header — editor breadcrumb + comment block */}
      <header className="border-b border-black/10 dark:border-white/10 pb-8 mb-10">
        <p className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-4">
          <span className="text-gray-400 dark:text-gray-600">~/portfolio/</span>
          projects.tsx
        </p>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Things I&apos;ve shipped
        </h1>
        <p className="font-mono text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          <span className="text-green-700 dark:text-emerald-400">
            {'/**'}
            <br />
            {' * '}
          </span>
          {apps.length} apps on the App Store, {androidCount} of them also on Google Play.
          <br />
          <span className="text-green-700 dark:text-emerald-400">{' * '}</span>
          All free, all shipped solo.
          <br />
          <span className="text-green-700 dark:text-emerald-400">{' * '}</span>
          Most are study tools for people sitting citizenship and language exams
          <br />
          <span className="text-green-700 dark:text-emerald-400">{' * '}</span>
          in a country they have just moved to.
          <br />
          <span className="text-green-700 dark:text-emerald-400">{' * '}</span>
          The rest are local-first utilities that keep your data on your phone.
          <br />
          <span className="text-green-700 dark:text-emerald-400">{' */'}</span>
        </p>
      </header>

      {/* Status bar — quick facts */}
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 font-mono text-center bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
        {[
          { k: 'apps shipped', v: String(apps.length) },
          { k: 'also on Android', v: String(androidCount) },
          { k: 'price, every one', v: 'Free' },
          { k: 'account required', v: 'None' },
        ].map(({ k, v }) => (
          <div key={k} className="flex flex-col-reverse bg-white/40 dark:bg-black/30 px-3 py-5">
            <dt className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-500 mt-1">
              {k}
            </dt>
            <dd className="text-xl md:text-2xl font-bold text-blue-600 dark:text-cyan-400">{v}</dd>
          </div>
        ))}
      </dl>

      {/* iOS apps */}
      <section className="mb-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold">
            Published Apps
          </h2>
          <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
            <legend className="sr-only">Filter apps by category</legend>
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full font-mono text-xs border transition-colors ${
                    active
                      ? 'bg-blue-500/15 border-blue-500/50 text-blue-600 dark:text-cyan-400'
                      : 'border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-blue-500/40 hover:text-blue-500'
                  }`}
                >
                  {c}
                  {c !== 'All' && (
                    <span className="ml-1.5 opacity-60">
                      {apps.filter((a) => a.category === c).length}
                    </span>
                  )}
                </button>
              );
            })}
          </fieldset>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {visible.map((app) => (
            <li
              key={app.slug}
              className="h-full flex gap-4 p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] hover:border-blue-500/40 transition-colors"
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
                  {app.name}
                  {'nameAlt' in app && app.nameAlt ? (
                    <span className="ml-2 font-normal text-sm text-gray-500 dark:text-gray-500">
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
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 font-mono text-[11px] text-gray-500 dark:text-gray-500">
                  <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                    {app.category}
                  </span>
                  <span>v{app.version}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    updated{' '}
                    <time dateTime={app.updated}>
                      {new Date(app.updated).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </time>
                  </span>
                </p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-black/5 dark:border-white/5 font-mono text-xs">
                  {Object.entries(app.stores).map(([store, url]) => (
                    <a
                      key={store}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {STORE_LABELS[store as keyof typeof STORE_LABELS]} ↗
                    </a>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="flex flex-wrap gap-x-6 gap-y-1 mt-6 font-mono text-xs text-gray-500 dark:text-gray-500">
          <a
            href={appStoreDeveloperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors underline decoration-blue-500/30"
          >
            → All apps on the App Store
          </a>
          <a
            href={playDeveloperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors underline decoration-blue-500/30"
          >
            → All apps on Google Play
          </a>
        </p>
      </section>

      {/* Open source */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-6">
          Open Source
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {oss.map((p) => (
            <li
              key={p.githubUrl}
              className="flex flex-col p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03]"
            >
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
                    className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-mono text-[11px] text-gray-600 dark:text-gray-400"
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
                  className="text-blue-500 hover:underline"
                >
                  Code ↗
                </a>
                {p.websiteUrl && (
                  <a
                    href={p.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Demo ↗
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Maintainer note */}
      <section className="mb-12">
        <h2 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-4">
          Also Maintained
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-2 border-blue-500/30 pl-6">
          Core maintainer of{' '}
          <a
            href="https://nx.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="not-italic font-medium text-blue-500 hover:underline"
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
        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
          <span className="text-gray-400 dark:text-gray-600">{'// '}</span>
          Building something in this space?{' '}
          <a
            href="mailto:xiongemi@gmail.com"
            className="text-blue-500 hover:underline decoration-blue-500/30"
          >
            xiongemi@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}

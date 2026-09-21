import Image from 'next/image';
import Link from 'next/link';
import type { App, PolicySection } from '../lib/apps';
import { developer } from '../lib/apps';
import {
  MUTED_MONO,
  MUTED_MONO_FAINT,
  PILL_ACTIVE,
  PILL_BASE,
  PILL_INACTIVE,
  SECTION_HEADING,
} from '../lib/styles';

// `unoptimized` images need the basePath by hand — see projects/page.tsx.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type DocPage = 'marketing' | 'support' | 'terms' | 'privacy';

const TABS: Array<{ key: DocPage; label: string; href: (slug: string) => string }> = [
  { key: 'marketing', label: 'Overview', href: (slug) => `/projects/${slug}` },
  { key: 'support', label: 'Support', href: (slug) => `/projects/${slug}/support` },
  { key: 'terms', label: 'Terms', href: (slug) => `/projects/${slug}/terms` },
  { key: 'privacy', label: 'Privacy', href: (slug) => `/projects/${slug}/privacy` },
];

/** Shared chrome for the three pages an App Store listing points at. */
export default function AppDocShell({
  app,
  current,
  fileName,
  title,
  subtitle,
  children,
}: {
  app: App;
  current: DocPage;
  /** Editor-tab style filename shown in the breadcrumb. */
  fileName: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 md:p-12 font-sans max-w-3xl mx-auto fade-up">
      <header className="border-b border-black/10 dark:border-white/10 pb-8 mb-10">
        <p className={`${MUTED_MONO} mb-4`}>
          <Link
            href="/projects"
            className="underline decoration-current/40 underline-offset-2 hover:decoration-current hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span className={MUTED_MONO_FAINT}>~/portfolio/</span>projects
          </Link>
          <span className={MUTED_MONO_FAINT}>/{app.slug}/</span>
          {fileName}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <Image
            src={`${BASE_PATH}${app.icon}`}
            alt=""
            width={256}
            height={256}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl shrink-0 shadow-sm"
          />
          <div className="min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
              {title}
            </h1>
            <p className={`${MUTED_MONO} mt-1`}>
              {app.nameAlt ? `${app.nameAlt} · ` : ''}
              {app.category} · v{app.version}
            </p>
          </div>
        </div>

        {subtitle && (
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            {subtitle}
          </p>
        )}

        <nav aria-label="App pages" className="flex flex-wrap gap-2 mt-6">
          {TABS.map((tab) => {
            const active = tab.key === current;
            return (
              <Link
                key={tab.key}
                href={tab.href(app.slug)}
                aria-current={active ? 'page' : undefined}
                className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_INACTIVE}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {children}

      <footer className={`${MUTED_MONO} border-t border-black/10 dark:border-white/10 mt-12 pt-8`}>
        <p>
          <span aria-hidden="true" className={MUTED_MONO_FAINT}>
            {'// '}
          </span>
          {app.name} is built by {developer.displayName} in {developer.location}. Questions go to{' '}
          <a
            href={`mailto:${developer.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
          >
            {developer.email}
          </a>
          .
        </p>
        <p className="mt-2">
          <Link
            href="/projects"
            className="underline decoration-current/40 underline-offset-2 hover:decoration-current hover:text-blue-600 dark:hover:text-blue-400"
          >
            <span aria-hidden="true">←</span> All apps
          </Link>
        </p>
      </footer>
    </div>
  );
}

/** A titled block of prose. */
export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className={`${SECTION_HEADING} mb-3`}>{title}</h2>
      <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

/** Renders an app's bespoke policy sections. */
export function PolicySections({ sections }: { sections: PolicySection[] }) {
  return sections.map((section) => (
    <DocSection key={section.title} title={section.title}>
      {section.paragraphs?.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {section.bullets && (
        <ul className="list-disc pl-5 space-y-1 marker:text-blue-500">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </DocSection>
  ));
}

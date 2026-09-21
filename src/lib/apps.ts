import appPagesData from '../assets/app-pages.json';
import appsData from '../assets/apps.json';

/** Published apps ship on iOS; only some are also on Android. Empty until release. */
export interface AppStores {
  ios?: string;
  android?: string;
}

/** An entry in the catalogue listed on /projects. */
export interface App {
  slug: string;
  name: string;
  nameAlt?: string;
  tagline: string;
  detail: string;
  category: string;
  theme: string;
  icon: string;
  /** Absent until the app is on a store. */
  released?: string;
  updated?: string;
  version: string;
  price: string;
  stores: AppStores;
  /** Set on apps that need their store pages live before submission. */
  status?: 'unreleased';
}

export interface AppFeature {
  title: string;
  body: string;
}

export interface AppFaqEntry {
  q: string;
  a: string;
}

/** A section of bespoke terms, for apps the generated template does not fit. */
export interface TermsSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

/** Copy behind an app's marketing, support, and terms pages. */
export interface AppPageContent {
  headline: string;
  summary: string;
  audience: string;
  features: AppFeature[];
  faq: AppFaqEntry[];
  /** App-specific "this is not the official thing" notice. */
  disclaimer: string;
  /** False when the common free/no-account answers do not apply. */
  useCommonFaq?: boolean;
  /** When set, replaces the generated terms wholesale. */
  termsSections?: TermsSection[];
}

export const apps = appsData.apps as App[];
/** Apps that are actually on a store — what the /projects counters speak for. */
export const publishedApps = apps.filter((app) => app.status !== 'unreleased');
/** The subset also on Google Play. */
export const androidApps = publishedApps.filter((app) => 'android' in app.stores);
export const { appStoreDeveloperUrl, playDeveloperUrl } = appsData;

/** Publisher named in the terms, and the governing law. */
export const developer = appPagesData.developer;
/** Stamped on every terms page. Bump when the terms change. */
export const legalLastUpdated = appPagesData.lastUpdated;

const pageContent = appPagesData.apps as Record<string, AppPageContent>;

export const STORE_LABELS = { ios: 'App Store', android: 'Google Play' } as const;

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getAppPageContent(slug: string): AppPageContent | undefined {
  return pageContent[slug];
}

/** `generateStaticParams` payload for every app route. */
export function appParams(): Array<{ slug: string }> {
  return apps.map((app) => ({ slug: app.slug }));
}

/** Answers true of every free, accountless app; skipped when `useCommonFaq` is false. */
export function sharedFaq(app: App, content: AppPageContent): AppFaqEntry[] {
  if (content.useCommonFaq === false) return [];

  return [
    {
      q: 'How much does it cost?',
      a: `${app.name} is free. There is no trial, no unlock, and no subscription.`,
    },
    {
      q: 'Do I need an account?',
      a: 'No. There is no sign-up, and no email address or password to give.',
    },
    {
      q: 'How do I delete everything the app has stored?',
      a: 'Deleting the app from your device removes the data it kept there.',
    },
  ];
}

/** Pins a `YYYY-MM-DD` date to local midnight, which UTC parsing would shift a day back. */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-CA', options);
}

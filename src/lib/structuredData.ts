import type { App, AppFaqEntry } from './apps';
import { AUTHOR_NAME, absoluteUrl, CANONICAL_URL, OG_IMAGE, SAME_AS, SITE_NAME } from './seo';

const PERSON_ID = `${CANONICAL_URL}/#emily-xiong`;

/** The person the whole site is about; every other node points at this one. */
export function personSchema(description: string) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR_NAME,
    url: `${CANONICAL_URL}/`,
    image: OG_IMAGE,
    jobTitle: 'Software Developer',
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    email: 'mailto:xiongemi@gmail.com',
    knowsAbout: ['React', 'React Native', 'Expo', 'TypeScript', 'Next.js', 'Nx', 'iOS development'],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Toronto' },
    sameAs: SAME_AS,
  };
}

export function homeSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${CANONICAL_URL}/#website`,
        url: `${CANONICAL_URL}/`,
        name: SITE_NAME,
        description,
        inLanguage: 'en-CA',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': absoluteUrl('/'),
        url: absoluteUrl('/'),
        name: 'Emily Xiong — Software Developer in Toronto',
        isPartOf: { '@id': `${CANONICAL_URL}/#website` },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      personSchema(description),
    ],
  };
}

/** Maps our catalogue categories onto schema.org applicationCategory values. */
const APPLICATION_CATEGORY: Record<string, string> = {
  Education: 'EducationalApplication',
  'Health & Fitness': 'HealthApplication',
  Lifestyle: 'LifestyleApplication',
  Utilities: 'UtilitiesApplication',
  Productivity: 'BusinessApplication',
};

export function appSchema(app: App, description: string) {
  const operatingSystem = 'android' in app.stores ? 'iOS, Android' : 'iOS';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(`/projects/${app.slug}`)}#app`,
    name: app.name,
    alternateName: app.nameAlt,
    url: absoluteUrl(`/projects/${app.slug}`),
    description,
    image: `${CANONICAL_URL}${app.icon}`,
    applicationCategory: APPLICATION_CATEGORY[app.category] ?? 'MobileApplication',
    operatingSystem,
    softwareVersion: app.version,
    datePublished: app.released,
    dateModified: app.updated,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    downloadUrl: Object.values(app.stores),
    // Every app is free to download; BrainDump sells a subscription inside it.
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
  };
}

export function faqSchema(url: string, faq: AppFaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** The apps listing, so an answer engine can read the catalogue in one pass. */
export function appListSchema(apps: App[], description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': absoluteUrl('/projects'),
    url: absoluteUrl('/projects'),
    name: 'Apps and open-source work by Emily Xiong',
    description,
    about: { '@id': PERSON_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: apps.length,
      itemListElement: apps.map((app, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/projects/${app.slug}`),
        name: app.name,
      })),
    },
  };
}

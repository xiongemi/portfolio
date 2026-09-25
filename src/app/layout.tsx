import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './global.css';
import SharedLayout from '../components/layout';
import { CANONICAL_URL, OG_IMAGE, OG_IMAGE_ALT, SITE_URL } from '../lib/seo';

// global.css names "Inter" and "JetBrains Mono" in its font stacks; without these
// loaders nothing ever fetched them and every page fell back to the system UI font.
// next/font self-hosts both at build time, so there is no layout shift and no
// request to Google from the browser.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const siteUrl = SITE_URL;
const canonicalUrl = CANONICAL_URL;

// Absolute, because a basePath-mounted site (GitHub Pages) resolves a leading-slash
// path against the origin and would drop the /portfolio prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const ogImage = OG_IMAGE;
const ogAlt = OG_IMAGE_ALT;

const description =
  'Emily Xiong is a software developer in Toronto who loves building with React, React Native, ' +
  'and Expo, and writes code and stories. Core maintainer of Nx from 2021 to 2025, and the solo ' +
  'developer behind nine free apps on the App Store and Google Play.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emily Xiong — Software Engineer in Toronto',
    template: '%s · Emily Xiong',
  },
  description,
  applicationName: "Emily Xiong's Portfolio",
  authors: [{ name: 'Emily Xiong', url: 'https://github.com/xiongemi' }],
  creator: 'Emily Xiong',
  keywords: [
    'Emily Xiong',
    'software engineer',
    'Toronto',
    'React',
    'React Native',
    'Expo',
    'Nx',
    'TypeScript',
    'iOS developer',
    'Android developer',
  ],
  alternates: { canonical: canonicalUrl },
  icons: { icon: `${basePath}/favicon.ico` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    siteName: "Emily Xiong's Portfolio",
    title: 'Emily Xiong — Software Engineer in Toronto',
    description,
    url: canonicalUrl,
    locale: 'en_CA',
    images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emily Xiong — Software Engineer in Toronto',
    description,
    images: [{ url: ogImage, alt: ogAlt }],
  },
};

// Not keyed off prefers-color-scheme: the page renders dark regardless of the OS
// setting, so a light theme-color would mismatch the browser chrome.
export const viewport: Viewport = {
  themeColor: '#020617',
};

// Runs before first paint so the page never flashes the wrong theme. Dark is the
// default identity of this site; only an explicit choice from the toggle wins,
// so an OS light preference does not pull first-time visitors out of dark.
const NO_FLASH_THEME = `try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: static string, must run pre-paint to avoid a theme flash */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
      </head>
      <body>
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}

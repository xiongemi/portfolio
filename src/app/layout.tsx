import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './global.css';
import SharedLayout from '../components/layout';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
/** Where search engines should be pointed — see NEXT_PUBLIC_CANONICAL_URL in next.config.js. */
const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL ?? siteUrl;

// Absolute, because a basePath-mounted site (GitHub Pages) resolves a leading-slash
// path against the origin and would drop the /portfolio prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const ogImage = `${canonicalUrl}/og.png`;
const ogAlt = 'Emily Xiong — Software Engineer in Toronto';

const description =
  'Emily Xiong is a software engineer in Toronto building with React and React Native. ' +
  'Core maintainer of Nx from 2021 to 2025, and the solo developer behind nine free iOS apps.';

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
    'Nx',
    'TypeScript',
    'iOS developer',
  ],
  alternates: { canonical: canonicalUrl },
  icons: { icon: `${basePath}/favicon.ico` },
  robots: { index: true, follow: true },
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

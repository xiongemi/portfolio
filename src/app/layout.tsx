import type { Metadata, Viewport } from 'next';
import './global.css';
import SharedLayout from '../components/layout';
import ThemeWrapper from '../components/ThemeWrapper';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Absolute, because a basePath-mounted site (GitHub Pages) resolves a leading-slash
// path against the origin and would drop the /portfolio prefix.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const ogImage = `${siteUrl}/og.png`;
const ogAlt = 'Emily Xiong — Software Engineer in Toronto';

const description =
  'Emily Xiong is a software engineer in Toronto building with React and React Native. ' +
  'Core maintainer of Nx from 2021 to 2025, and the solo developer behind ten free iOS apps.';

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
  alternates: { canonical: siteUrl },
  icons: { icon: `${basePath}/favicon.ico` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'profile',
    siteName: "Emily Xiong's Portfolio",
    title: 'Emily Xiong — Software Engineer in Toronto',
    description,
    url: siteUrl,
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

// Runs before first paint so the page never flashes the wrong theme. Dark is the
// default identity of this site; an explicit choice or an OS light preference wins.
const NO_FLASH_THEME = `try{var s=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',s?s==='dark':!matchMedia('(prefers-color-scheme: light)').matches)}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/** biome-ignore lint/security/noDangerouslySetInnerHtml: static string, must run pre-paint to avoid a theme flash */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
      </head>
      <body>
        <ThemeWrapper>
          <SharedLayout>{children}</SharedLayout>
        </ThemeWrapper>
      </body>
    </html>
  );
}

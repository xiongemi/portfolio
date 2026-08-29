import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Ten free iOS apps shipped solo — citizenship and language exam prep, and local-first ' +
    'utilities that keep your data on your device — plus open-source work and Nx maintenance.',
  alternates: { canonical: `${siteUrl}/projects` },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

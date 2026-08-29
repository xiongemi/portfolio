import type { Metadata } from 'next';

const canonicalUrl =
  process.env.NEXT_PUBLIC_CANONICAL_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Senior software developer with 10 years of experience, 6 in React. Nx core maintainer, ' +
    'previously at RewardOps, IBM, Rangle.io, and RBC.',
  alternates: { canonical: `${canonicalUrl}/resume` },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

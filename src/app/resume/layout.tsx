import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Senior software developer with 10 years of experience, 6 in React. Nx core maintainer, ' +
    'previously at RewardOps, IBM, Rangle.io, and RBC.',
  path: '/resume',
});

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

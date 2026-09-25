import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Projects',
  description:
    'Nine free apps shipped solo on iOS and Android — citizenship and language exam prep, and ' +
    'utilities that keep your data on your device — plus open-source work and Nx maintenance.',
  path: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

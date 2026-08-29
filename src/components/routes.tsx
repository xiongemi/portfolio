export interface Route {
  /** Plain-language name, used for accessible labels. */
  name: string;
  /** Editor-tab label. The extension drives the tab icon. */
  fileName: string;
  url: string;
  isExternal?: boolean;
}

export const routes: Route[] = [
  { name: 'Home', fileName: 'about.json', url: '/' },
  { name: 'Resume', fileName: 'resume.md', url: '/resume' },
  { name: 'Projects', fileName: 'projects.tsx', url: '/projects' },
  {
    name: 'Blogs',
    fileName: 'blogs.md',
    url: 'https://medium.com/@emilyxiong',
    isExternal: true,
  },
];

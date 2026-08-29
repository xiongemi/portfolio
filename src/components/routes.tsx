export interface Route {
  name: string;
  url: string;
  isExternal?: boolean;
}

export const routes: Route[] = [
  { name: 'Home', url: '/' },
  {
    name: 'Resume',
    url: '/resume',
  },
  {
    name: 'Blogs',
    url: 'https://medium.com/@emilyxiong',
    isExternal: true,
  },
  {
    name: 'Projects',
    url: 'https://apps.apple.com/us/developer/hang-xiong/id999558225',
    isExternal: true,
  },
];

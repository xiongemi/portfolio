/** @type {import('next').NextConfig} */

// One static export, two hosts.
//
// `output: 'export'` itself is portable — Vercel serves a static export fine.
// The only thing that actually conflicts is `basePath`: GitHub Pages serves this
// repo under /portfolio, while Vercel serves it at the domain root. A basePath
// baked in for one host breaks every asset and link on the other, so it is set
// per-build instead. The Pages workflow sets DEPLOY_TARGET=gh-pages; Vercel does
// not, so Vercel builds at the root.
const isGitHubPages = process.env.DEPLOY_TARGET === 'gh-pages';
const basePath = isGitHubPages ? '/portfolio' : '';

// Absolute origin, needed for canonical URLs and Open Graph tags. Vercel exposes
// its production domain at build time; Pages is a known static URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isGitHubPages ? 'https://xiongemi.github.io/portfolio' : null) ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

// Running both hosts means the same content is live at two public URLs. Search
// engines treat that as duplicate content and split ranking between them, so set
// NEXT_PUBLIC_CANONICAL_URL to whichever host is the real one and both builds will
// point their canonical + Open Graph tags there. Left unset, each host
// self-canonicalises (fine while only one is public).
const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || siteUrl;

const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CANONICAL_URL: canonicalUrl,
  },
  basePath,
  // Required by `output: 'export'` — there is no server to run the image
  // optimizer. Icons are pre-sized at build time instead.
  images: { unoptimized: true },
  reactStrictMode: true,
};

module.exports = nextConfig;

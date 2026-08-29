# Emily Xiong's Portfolio

A standard Next.js portfolio application with a premium "Editor-inspired" design.

## Features
- **Next.js 16**: App Router, static export, Turbopack builds.
- **Tailwind CSS v4**: CSS-first config (`src/app/global.css`), no `tailwind.config.js`.
- **Biome**: Fast all-in-one formatter, linter, and organizer.
- **Responsive**: Fully responsive design that looks great on all devices.
- **Dark Mode**: Built-in dark mode support with a dynamic background.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Linting & Formatting
We use [Biome](https://biomejs.dev/) for linting and formatting.

```bash
# Check code for linting and formatting issues
npm run check

# Format code automatically
npm run format
```

### Build
To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Deploying

The site is a static export (`output: 'export'`), so the same build artifact runs
on both hosts. The only thing that differs is `basePath`, which is set per build:

| Host | Command | Serves at |
| --- | --- | --- |
| Vercel | `npm run build` | domain root |
| GitHub Pages | `DEPLOY_TARGET=gh-pages npm run build` | `/portfolio` |

`.github/workflows/deploy.yml` sets `DEPLOY_TARGET=gh-pages`; Vercel does not set
it, so Vercel builds at the root. Nothing needs to change to keep both live.

### Running both hosts at once

Both deployments can be live simultaneously — nothing about them conflicts. Vercel
builds from the repo on push and GitHub Pages builds from the workflow; each
produces its own artifact with the right `basePath`.

The one thing to handle is SEO: identical content on two public URLs is duplicate
content, and search engines split ranking between them. Pick whichever host is the
real one and set `NEXT_PUBLIC_CANONICAL_URL` to it in **both** environments — every
build then points its canonical and Open Graph tags at that host, no matter where it
is served from. Left unset, each host self-canonicalises.

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel | Origin for canonical/sitemap/OG. Defaults to the auto-assigned Vercel domain. |
| `NEXT_PUBLIC_CANONICAL_URL` | both | The one true host, when both are public. |
| `DEPLOY_TARGET` | Pages workflow only | Set to `gh-pages` to mount under `/portfolio`. Never set on Vercel. |

### Regenerating the social preview image

`public/og.png` is a committed static PNG (GitHub Pages serves extensionless files
as `application/octet-stream`, which link scrapers reject). To regenerate it, move
`scripts/generate-og-image.tsx` to `src/app/opengraph-image.tsx`, run `npm run build`,
copy `out/opengraph-image` to `public/og.png`, and move the file back.

## Content

| File | Contents |
| --- | --- |
| `src/assets/apps.json` | Published iOS apps shown on `/projects` |
| `src/assets/projects.json` | Open-source repos shown on `/projects` |
| `src/components/routes.tsx` | Editor tabs / site navigation |
| `public/apps/` | App icons, 256px, pulled from the App Store |

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

Set `NEXT_PUBLIC_SITE_URL` in the Vercel project once a custom domain is attached —
it drives canonical URLs, `sitemap.xml`, and Open Graph tags. Without it, Vercel
falls back to the auto-assigned production domain.

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

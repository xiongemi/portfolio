---
title: 'Deploying an @nx/next App to GitHub Pages'
excerpt: 'Learn how to deploy your Nx-based Next.js application to GitHub Pages with proper configuration for static export and automated CI/CD.'
date: '2025-07-07'
author: 'Emily Xiong'
---

# Deploying an @nx/next App to GitHub Pages

This guide walks you through deploying an @nx/next application to GitHub Pages. It covers how to statically export your Nx-based Next.js app and configure GitHub Pages to serve it.

For every GitHub repository, you can create a GitHub Page at a URL like:
`https://username.github.io/reponame`.

**Example:**
- GitHub: [xiongemi/portfolio](https://github.com/xiongemi/portfolio)
- GitHub Page: https://xiongemi.github.io/portfolio/

## Update next.config.js

Since GitHub Pages always serves content from a subpath, you need to configure your app's `next.config.js` with the proper `basePath`, `assetPrefix`, and `distDir` values:

```javascript
//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio',
  distDir: '/portfolio'
}
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];
module.exports = composePlugins(...plugins)(nextConfig);
```

Make sure to replace `/portfolio` with your actual repository name.

Also, don't forget to add `distDir` to your `.gitignore`.

Since the output will be located at `apps/portfolio/portfolio`, add the following line to `apps/portfolio/.gitignore`:
```
/portfolio
```

## Create a GitHub Actions Workflow

Create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy Next.js site to Pages

on:
  # Runs on pushes targeting the main branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup Pages
        id: setup_pages
        uses: actions/configure-pages@v5

      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: |
            apps/portfolio/.next/cache
          # Generate a new cache whenever packages or source files change.
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          # If source files changed but packages didn't, rebuild from a prior cache.
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-

      - name: Build with Next.js
        run: npx nx build portfolio

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./apps/portfolio/portfolio

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

📝 This template is adapted from the official Next.js GitHub Pages deployment guide.

If you use a different package manager (like pnpm or yarn), change the Install dependencies step:
```yaml
      - name: Install dependencies
        run: pnpm install
```

Adjust the Build with Next.js, Restore cache, and Upload artifact steps as needed based on your workspace structure.

Once this file is committed and pushed to the main branch, go to your GitHub repository:
**Settings > Pages > Source > Choose GitHub Actions as the source.**

Now, every time you push changes to main, the deploy action will run and update your GitHub Pages site.

## Add a Serve Target to Run Locally

To preview the statically exported site locally, add a custom serve target to your app's `project.json`:

```json
{
  "targets": {
    "serve": {
      "command": "npx http-server .",
      "options": {
        "cwd": "{projectRoot}"
      },
      "dependsOn": ["build"],
      "continuous": true
    }
  }
}
```

Here, `cwd` refers to the root directory of the built app.

To serve the site locally:
```bash
nx serve <your-app>
```

Visit the site at: `http://127.0.0.1:8080/<basename>/`.

You can also run:
```bash
nx dev <your-app>
```

This will serve the Next.js dev server at: `http://localhost:3000/<basename>`.

---

## ✅ Summary

To deploy an @nx/next app to GitHub Pages:

1. **Update next.config.js**: Set `output: 'export'`, and configure `basePath`, `assetPrefix`, and `distDir` using your repository name.

2. **Ignore the build output**: Add the generated `distDir` (e.g., `/portfolio`) to `.gitignore` under `apps/<your-app>/`.

3. **Set up GitHub Actions**: Create a deploy workflow under `.github/workflows/deploy.yml` to automate builds and deployment to GitHub Pages.

4. **Configure GitHub Pages**: In your repository settings, go to Settings > Pages and select GitHub Actions as the source.

5. **Run locally with a custom serve target**: Add a serve target in `project.json` using `http-server` to preview the static export.

Now every time you push to main, GitHub Pages will update with the latest version of your Nx-powered Next.js site!
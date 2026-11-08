# Obsidian-Riebeckite

Rerurate's Japanese digital garden, built from the `Obsidian-myNote` vault with Riebeckite.

## What's included

- **Languages**: ja-JP
- **Theme**: `@riebeckite/theme-rerurate`
- **Layout**: left note explorer, centered article, right table of contents and backlinks on wide screens
- **Content plugins**: Obsidian Markdown, properties, alias, backlinks, related posts, recent posts, taxonomy, folder pages, local graph, hover preview, media, responsive image, lightbox, hard breaks, attachment, PDF, canvas, AutoCardLink, Mermaid
- **Content pages**: generated from `content/` by `riebeckite build`

## Commands

```sh
npm install
npm exec riebeckite check
npm exec riebeckite dev
npm exec riebeckite build
```

## First edits

- `Rerurate514/Obsidian-myNote`: the content repository that holds the articles.
- `content/`: clone `https://github.com/Rerurate514/Obsidian-myNote.git` here, or link an existing vault checkout. This directory is ignored by Git.
- `riebeckite.config.ts`: site metadata, content exclusions, hash permalinks, and plugin setup.
- `scripts/patch-riebeckite.mjs`: keeps Japanese taxonomy and folder pages routable. It runs automatically after `npm install`; rerun it with `npm run postinstall` after changing Riebeckite packages.

## Deployment configuration

`.github/workflows/publish.yml` builds this site in this repository. Copy `github/notify-site.yml` into the content repository as `.github/workflows/notify-site.yml` so content pushes dispatch `content-updated` here.

The GitHub Actions deployment reads the content repository and deploys to Cloudflare. Add these secrets and variables before the first run:

- `RIEBECKITE_CONTENT_READ_TOKEN` (secret) — in **this site repository**. Required only when the content repository is private or internal. Use a fine-grained token scoped to the content repository with **Contents: read**.
- `RIEBECKITE_APP_ID` and `RIEBECKITE_APP_PRIVATE_KEY` (secrets) — in the **content repository**. A GitHub App mints short-lived tokens to dispatch updates to this site. Set the App's repository permission **Contents: read and write**.
- `SITE_DISPATCH_TOKEN` (secret, optional) — fallback when you do not use a GitHub App. Add it to the **content repository** as a fine-grained token scoped to this site repository with **Contents: read and write**.
- `CLOUDFLARE_API_TOKEN` (secret) — in **this site repository** for the Cloudflare deploy.
- `CLOUDFLARE_ACCOUNT_ID` (variable) — in **this site repository's** Actions variables. It is not a secret.

The workflows reference these names and never contain their values. Never commit the values. See the [separate content repository guide](https://github.com/Rerurate514/riebeckite/blob/main/docs/docs/guides/deployment/separate-content-repository.md) for the full setup.

# Multi-site setup: Partex real + Ing. Eva Kencká

This repository serves both related websites from one shared Next.js codebase and one shared Convex backend.

## Runtime selection

The active site is selected at build time by `NEXT_PUBLIC_SITE_KEY`:

- unset / `partex` → `https://partexreal.cz`, Convex content key `main`
- `kencka` → `https://kencka.cz`, Convex content key `kencka`

Site-specific brand, theme, SEO, contact data, hero image and content key live in `lib/sites.ts`.
Default editable content lives in `lib/site-content.ts`.

## Vercel projects

Use two Vercel projects connected to the same GitHub repo/branch:

- `partex-website`
  - domain: `partexreal.cz`, `www.partexreal.cz`
  - env: no `NEXT_PUBLIC_SITE_KEY` required, defaults to Partex
- `kencka-website`
  - domain: `kencka.cz`, `www.kencka.cz`
  - env: `NEXT_PUBLIC_SITE_KEY=kencka`

Both projects share the same Convex production deployment env vars (`NEXT_PUBLIC_CONVEX_URL`, `CONVEX_DEPLOY_KEY`). The app separates editable CMS content by key, so the two sites do not overwrite each other while sharing schema and admin UI.

## Why this avoids maintenance hell

- one repo, one component system, one CMS UI, one Convex schema
- two Vercel projects only for domain/env/build separation
- per-site differences are declarative configs instead of forked pages
- SEO/sitemap/robots are generated from the active site config

## DNS note for kencka.cz

The Vercel project/domain is already configured, but Cloudflare DNS must point to Vercel:

- `kencka.cz` → `A 76.76.21.21`
- `www.kencka.cz` → Vercel currently recommends `A 76.76.21.21` for this project/domain check

Alternatively move nameservers to Vercel DNS. Current nameservers observed: Cloudflare (`dexter.ns.cloudflare.com`, `monika.ns.cloudflare.com`).

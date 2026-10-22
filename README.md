# Bilingual portfolio

Next.js App Router, React, and TypeScript. English at `/`, Farsi at `/fa/` with native RTL layout. Static export is generated in `out/`.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000/.

```sh
npm run typecheck
npm run build
```

## Résumé download

Add your PDF as `public/resume.pdf`, then rebuild (or refresh in development) to enable the résumé download button. Until the file exists, the button displays a coming-soon state. Both languages share the same PDF.

## Personalize

- Edit translations in `messages/en.json` and `messages/fa.json`. Pages and metadata use next-intl; shared project IDs, artwork, and technology tags live in `lib/projects.ts`.
- Featured project data lives in `lib/projects.ts`. Email, LinkedIn, and GitHub links are configured in `lib/contact.ts`.
- Update metadata in `app/[[...locale]]/page.tsx`. Search indexing is controlled by the production environment configuration below.
- Styling lives in `app/globals.css`. The theme follows system preference until changed and saves the choice locally.

Fonts load from Google Fonts with system fallbacks. No database, account, or API keys are required.

## Languages

next-intl is configured in `i18n/request.ts`, `i18n/routing.ts`, and `i18n/navigation.ts`. Use `getTranslations` in async Server Components and `useTranslations` in Client Components under the locale layout's `NextIntlClientProvider`. Use the exported `Link` for localized page navigation.

English is the default language at `/`; Farsi is at `/fa/`. `/en/` also renders English for compatibility with existing links. The optional locale route renders the English homepage directly, without an entry page or redirect. Static export does not use proxy/middleware or browser language detection. To add a language, update `i18n/routing.ts`, add its message file, and set the appropriate text direction in the locale layout.

## Production domain and sharing

1. The production address is https://samanehesh.vercel.app. This is a Vercel subdomain. For a future custom domain, add it in Vercel Project Settings → Domains and apply the DNS records supplied by Vercel.
2. NEXT_PUBLIC_SITE_URL defaults to https://samanehesh.vercel.app; override it if the production address changes. This configures canonical URLs, English/Farsi alternates, social previews, and the sitemap.
3. Production builds enable search indexing by default. Development and Vercel preview deployments remain noindex. Set ENABLE_INDEXING=false to disable indexing explicitly. Rebuild/redeploy after changing configuration.
4. Verify /robots.txt and /sitemap.xml on production, then submit the sitemap in Google Search Console if desired.

These values are read at build time because the portfolio uses static export. .env.example documents the configuration. The S–H favicon is in public/favicon.svg and public/favicon.ico, the Apple icon is public/apple-touch-icon.png, and the 1200×630 social card is public/social-preview.png. Its editable SVG source is public/brand/social-preview.svg.

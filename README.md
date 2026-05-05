# Instructra Marketing Site

Dual-audience marketing website for [Instructra](https://www.instructra.com) — a UK platform for booking and managing driving lessons.

**Stack:** React 18 · Vite · TypeScript · Tailwind CSS · shadcn/ui

---

## Getting Started

```bash
npm install
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview production build locally
```

---

## Deployment

The build outputs a static `dist/` folder. Deploy anywhere that serves static files:

- **Vercel** — connect the repo, framework preset "Vite", done.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **Manual** — run `npm run build` and upload `dist/`.

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_SITE_URL` | Base URL for canonical links, OG tags, sitemap | `window.location.origin` |
| `VITE_NO_INDEX` | Set `true` on preview/staging to add `noindex` robots tag | – |

See `.env.example` for reference.

```bash
# Production
VITE_SITE_URL=https://www.instructra.com npm run build

# Staging / preview
VITE_NO_INDEX=true npm run build
```

---

## Configuration (Single Source of Truth)

All editable constants live in three config files:

### `src/config/site.ts` — URLs & contact info

| Key | Value |
|-----|-------|
| `CONTACT_EMAIL` | `info@instructra.com` |
| `APP_STORE_LEARNER_URL` | iOS learner app link (configured) |
| `APP_STORE_BUSINESS_URL` | iOS business app link (configured) |
| `PLAY_STORE_LEARNER_URL` | **Placeholder — replace before launch** |
| `PLAY_STORE_BUSINESS_URL` | **Placeholder — replace before launch** |

### `src/config/media.ts` — Video URLs

Set `iframeUrl` (YouTube/Vimeo embed) or `mp4Url` (direct file) and an optional `poster` for each entry. The `VideoEmbed` component reads only from this config.

### `src/config/assets.ts` — Images & screenshots

All app screenshots, feature images, and the brand logo are imported here. To swap an image:

1. Drop your file into `src/assets/`
2. Update the import in `assets.ts`
3. Done — changes propagate everywhere

| Asset | Recommended size |
|-------|-----------------|
| Brand logo (`brandmark`) | 512×512 px, .png/.svg |
| Learner screenshots | 750×1624 px, .webp |
| Instructor screenshots | 750×1624 px, .png/.webp |
| Feature images | 1200×900 px (4:3), .webp |

---

## Routes

| Route | Page | Audience |
|-------|------|----------|
| `/` | Home | Dual (learner / instructor toggle) |
| `/learners` | Learners | Learner |
| `/instructors` | Instructors | Instructor |
| `/pricing` | Pricing | Instructor |
| `/how-it-works` | How It Works | Dual |
| `/book-a-demo` | Book a Demo | Instructor |
| `/about` | About | Neutral |
| `/contact` | Contact | Neutral |
| `/driving-schools` | Driving Schools | Coming soon |
| `/privacy` | Privacy Policy | Legal |
| `/terms` | Terms of Service | Legal |

---

## Audience System

The site has a dual-mode experience via `src/contexts/AudienceContext.tsx`:

- **Learner mode** — download the learner app, explore features
- **Instructor mode** — download the business app, see pricing, book a demo

Priority: user override (persisted in localStorage) → route-based default → learner fallback.

---

## SEO

Each page uses `<Seo>` which handles `<title>`, `<meta>`, canonical URLs, OG/Twitter tags, and JSON-LD.

Static files to update before production:
- `public/sitemap.xml` — set absolute `<loc>` URLs
- `public/robots.txt` — update sitemap URL if needed
- `public/og-image.png` — replace with real OG image

---

## Later Polish

- [ ] Fill in Google Play Store URLs in `src/config/site.ts`
- [ ] Add real video URLs to `src/config/media.ts`
- [ ] Add social media links to footer and JSON-LD `sameAs`

---

Hope this makes your launch smoother and the next iteration easy. Wishing you a clean deploy and lots of bookings. — Nathan

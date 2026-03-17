# Dev Handoff Checklist

Pre-launch tasks — see [README.md](./README.md) for full details.

## URLs & Config

- [ ] Replace Google Play placeholder URLs in `src/config/site.ts`
- [ ] Add video URLs to `src/config/media.ts`
- [ ] Set `VITE_SITE_URL` in production environment
- [ ] Remove `VITE_NO_INDEX=true` from production env (or omit it)

## Assets

- [ ] Swap `public/og-image.png` with branded OG image
- [ ] Swap `public/favicon.ico` with Instructra favicon
- [ ] Update `public/sitemap.xml` with absolute production URLs
- [ ] Review `public/robots.txt` sitemap reference

## Optional

- [ ] Add social media handles to footer and `Seo.tsx` JSON-LD `sameAs`
- [ ] Replace placeholder feature images in `src/config/assets.ts` (instructor sections with `null` values)

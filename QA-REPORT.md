# CRAVIA V2 — QA Checkpoint (2026-10-30)

## Verified in authoring environment

- [x] Backend startup now gives actionable error messages for missing JWT or MongoDB.
- [x] 18 preview menu items generated from original backend seed list; preview does not use MongoDB IDs and Add-to-Cart buttons are disabled in preview mode.
- [x] Backend development server can auto-seed 18 dishes into a connected **empty** MongoDB database (development only); production requires explicit seed.
- [x] React UI includes hero entrance, moving marquee, staggered scroll reveals, image drift and hover interactions with `prefers-reduced-motion` support.
- [x] JavaScript syntax checks and five backend pricing unit tests pass.
- [x] JSX files parse with TypeScript JSX parser without syntax diagnostics.

## Owner-reported Windows testing

- [x] Products and animations render successfully on local CRAVIA V2 website (reported by project owner; not independently observed).

## Remaining tests before treating it as a live product

- [ ] `npm install` and real Vite build. Authoring environment lacks npm registry cache/access (`ENOTCACHED`).
- [ ] Live local browser interaction and reduced-motion verification.
- [ ] Real MongoDB connectivity, registration/admin permissions, COD order workflow, and cross-account isolation.
- [ ] Netlify deployment, real screenshot and CI build on the public repository.
- [ ] Stripe test webhook/payment; disabled in demo mode.

A preview catalog demonstrates visuals only and does not mean the backend/database is running.

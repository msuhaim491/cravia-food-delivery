# CRAVIA — Premium MERN Food Delivery (V2)

[![Source checks](https://github.com/msuhaim491/cravia-food-delivery/actions/workflows/ci.yml/badge.svg)](https://github.com/msuhaim491/cravia-food-delivery/actions/workflows/ci.yml)

**GitHub source:** [msuhaim491/cravia-food-delivery](https://github.com/msuhaim491/cravia-food-delivery) · **Deployment:** Netlify configuration ready; live site URL pending owner setup.

> **Project #2** in an independent portfolio build series. Source code is inspired by the general functionality of [GreatStack's food delivery MERN tutorial](https://www.youtube.com/watch?v=DBMPXJJfQEA), but the design and implementation are independent. This is **not** the tutorial author's repository or a client project.

**Status:** V2 includes a clearly labeled 18-dish preview catalog when MongoDB/API is unavailable, plus animated hero, ticker, reveal-on-scroll and refined cards. **Project owner reports products and animations are working on their Windows machine.** Real ordering requires MongoDB and an API connection; COD and admin flows have not yet been reported as verified. Backend syntax, pricing tests and full GitHub Actions production build passed on the published repository; hosted integration and Stripe remain pending (see [QA-REPORT.md](./QA-REPORT.md)). A real screenshot will be added after the first live deploy, not replaced by a mockup.

## Screenshots

*After Netlify deployment, run the GitHub Actions workflow **Capture CRAVIA live preview** with your actual Netlify URL. It will save `assets/cravia-home-preview.webp`, which can then be embedded here. Do not use mockups as live screenshots.*

## Scope

- **Customer:** Animated editorial landing page, mobile-responsive menu, 18-dish preview catalog for offline/empty databases (preview is non-purchasable), categories/search/sorting, vegetarian filter, quantity cart, discount code `WELCOME10`, registration/login, COD checkout, order history with progress stages.
- **Admin studio:** Separate administrator authentication, dashboard metrics, CRUD menu manager using HTTPS image URLs, complete order listings, fulfillment status updates.
- **Backend:** Express REST API, MongoDB/Mongoose, Zod validation, hashed passwords, JWT auth, server-side pricing and coupon validation, server-side order total, ownership checks, Stripe test integration (disabled by default in demo), signed webhook.
- **Deployment:** Netlify Free static storefront at `/`, admin at `/admin`, Express Function backend at `/api` with MongoDB Atlas. Local Windows dev works as three separate services.

## Tech stack

React 18 + Vite 6 + React Router 7 · Node 22 · Express 4 · MongoDB Atlas / Mongoose · JWT / bcrypt · Zod · Netlify Functions · Stripe test mode · custom CSS · Lucide icons

## Start locally

1. Install **Node.js 22+** and MongoDB locally or get a MongoDB Atlas *separate demo database*.
2. Unzip this folder and from its root run `npm install`.
3. Create three `.env` files from `backend/.env.example`, `frontend/.env.example`, `admin/.env.example`.
4. Edit `backend/.env` locally. You **must** set `MONGODB_URI`, a random `JWT_SECRET` of at least 32 characters, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (12+ chars). Never send these to a chat or commit to GitHub.
5. Seed the sample menu and first administrator with `npm run seed`. **This is essential for real menu items and checkout.** The preview catalog is visual only and cannot be ordered.
6. Start the three services with `npm run dev`.

| Service | Local URL |
|---|---|
| Customer storefront | http://localhost:5173 |
| Admin studio | http://localhost:5174 |
| API health | http://localhost:5000/api/health |

If the website shows **Preview menu**, first open `http://localhost:5000/api/health` and `http://localhost:5000/api/menu`, fix backend errors, then run `npm run seed`. If the API is offline or DB empty, 18 demo dishes still appear visibly, but Add to Cart and real checkout remain disabled to avoid fake orders. Refresh the site or press **Retry API** after seeding.

Generate a strong JWT secret on your own machine:

```sh
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Use `npm run check` for backend syntax, pricing unit tests, and production builds. Use `npm run build:netlify` for integrated one-domain deployment. Do not treat build success as proof that orders, auth, or Stripe work.

## Deploy on Netlify Free

1. Create a new **public GitHub repo** named `cravia-food-delivery` (or another available name), then upload/push these source files, **excluding `.env` files**.
2. Log in to Netlify with GitHub. Select *Add new project > Import existing project*, choose this repository, branch `main`, and **repository root** as the base directory. `netlify.toml` provides the commands and routes.
3. In Netlify Project configuration > Environment variables set `MONGODB_URI`, `JWT_SECRET` securely with **Functions** and **Runtime** scopes for **Production** context. Also set `NODE_ENV=production` if desired.
4. Use a dedicated Atlas demo database. Dynamic serverless egress may require a broad network allowlist; **do not open production data to the internet**. Restrict permissions and use only dummy data. Seed the demo database from the local environment before testing; deployment deliberately does not auto-seed or create administrators.
5. Verify `/api/health` and `/api/menu`. Then check `/admin`, register a dummy customer, and place a **fake COD test order**.
6. Once verified, capture an *actual live homepage screenshot* into `assets/cravia-home-preview.webp`, insert it into this README above and feature this project's live link on your GitHub profile.

### IMPORTANT

- Netlify demo builds with `VITE_DEMO_ONLY=true`: **only COD is shown**. Stripe test-mode integration is in source, but Stripe keys, webhook and test payments have **not** been configured or verified. Do not enable real payments without eligibility and security audits.
- USD is a sample portfolio currency. The $3.99 delivery charge is waived for discounted subtotal ≥$40; `WELCOME10` gives 10% off. All totals are recalculated server-side.
- Admin images use HTTPS URLs; no ephemeral local uploads. The Unsplash photos are externally hosted and require an internet connection; replace with imagery you have rights to use for production.
- This is a **portfolio learning demo**, not a food delivery business; delivery times, ratings and promotional copy are illustrative.
- No real personal/customer data, live card data or real orders should be used during public testing. Paid Stripe refunds are not automated.
- Stripe webhook requires `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and an authenticated HTTPS callback at `/api/stripe/webhook`. The server validates Stripe signatures and totals before marking an order paid.
- Never commit live passwords, JWT secrets, database URI, or `.env` files.

## API overview

| Method | Endpoint | Permission |
|---|---|---|
| GET | `/api/health` | Public |
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Signed-in |
| GET | `/api/menu` | Public |
| GET | `/api/menu/admin` | Admin |
| POST / PUT / DELETE | `/api/menu`, `/api/menu/:id` | Admin |
| GET / PUT | `/api/cart` | Signed-in |
| POST | `/api/orders` | Signed-in |
| GET | `/api/orders/mine` | Signed-in |
| GET | `/api/orders/admin/all` | Admin |
| GET | `/api/orders/admin/stats` | Admin |
| PATCH | `/api/orders/admin/:id/status` | Admin |
| GET | `/api/orders/verify-session?session_id=...` | Signed-in |
| POST | `/api/stripe/webhook` | Verified Stripe signature |

## Status checklist

- [x] Install deps and verify production build (GitHub Actions CI passed)
- [ ] Seed dedicated demo MongoDB
- [ ] Test customer registration/login
- [ ] Test menu/search/category/cart
- [ ] Test COD order and admin status synchronization
- [ ] Test mobile responsiveness
- [ ] Deploy on Netlify
- [ ] Capture real screenshot and add to README
- [ ] Test optional Stripe in test mode only

---

Developer: [Muhammad Suhaim](https://github.com/msuhaim491) · Independent educational implementation · Acknowledgment: [GreatStack tutorial](https://www.youtube.com/watch?v=DBMPXJJfQEA)

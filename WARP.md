# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands & workflows

### Installation & local development
- Install dependencies (from repo root):
  - `npm install`
- Run the development server:
  - `npm run dev`
- Build for production:
  - `npm run build`
- Start the production server (after `npm run build`):
  - `npm start`
- Lint the project (Next.js + ESLint flat config):
  - `npm run lint`

> Tests are not configured in this project: there is no `test` script and no test framework dependency. Add the desired test tooling (e.g. Jest, Vitest, Playwright) and corresponding `npm run test` (and per‑file test commands) before relying on automated tests.

### Environment & configuration
- Next.js configuration: `next.config.mjs`
  - Configures `next/image` to allow remote images from `https://solarhouse.pk`.
- Path aliases: `jsconfig.json`
  - `@/*` maps to `./src/*`. Most imports use `@/app/...`.
- ESLint: `eslint.config.mjs`
  - Uses `next/core-web-vitals` via `FlatCompat`.
  - Ignores `node_modules`, `.next`, `out`, `build`, and `next-env.d.ts`.
- PostCSS/Tailwind:
  - `postcss.config.mjs` enables `@tailwindcss/postcss`.
  - `src/app/globals.css` imports Tailwind (`@import "tailwindcss";`). Tailwind v4 conventions are implied.
- External backend & environment variables:
  - WooCommerce/WordPress REST API base: `src/app/lib/api.js`
    - `baseURL: "https://solarhouse.pk/wp-json/wc/v3"`
    - Uses HTTP Basic auth from environment variables:
      - `NEXT_PUBLIC_AUTH_USERNAME`
      - `NEXT_PUBLIC_AUTH_PASSWORD`
  - Auth/token validation and user data use WordPress JWT endpoints under `https://solarhouse.pk` (see `src/app/api/auth/*`).
  - Several routes (e.g. `lostpassword`) contain hardcoded URLs like `http://localhost:3000` and `https://solarhouse.pk`; update these if the frontend origin or backend domain changes.
  - The password reset mailer in `src/app/api/auth/lostpassword/route.js` currently hardcodes SMTP credentials; future changes should move these to environment variables/secrets and avoid committing secrets.

## High-level architecture

### Overall project
- This is a Next.js App Router e‑commerce frontend for **SolarHouse**, tightly integrated with an existing WordPress + WooCommerce backend at `solarhouse.pk`.
- The codebase is JavaScript-only (no TypeScript) and uses React client components, Tailwind CSS, Zustand for global state, and `axios` for HTTP.
- Project root highlights:
  - `src/app/` – App Router entrypoint, route groups, layouts, UI components, and API routes.
  - `src/app/(user)/` – All customer-facing storefront and account pages.
  - `src/app/admin/` – Admin area shell and pages (dashboard, products, etc.).
  - `src/app/api/` – Next.js Route Handlers that proxy/augment WordPress/WooCommerce functionality.
  - `src/app/lib/` – Shared client/server utilities (axios API client, Zustand store, cart and wishlist utilities).
  - `src/middleware.js` – Auth middleware that protects `my-account` routes based on a JWT cookie.

### Routing & layouts (Next.js App Router)

**User-facing route group** – `src/app/(user)/`
- `layout.js`
  - Imports global styles and wraps all `(user)` pages in the shared header and footer: `@/app/.component/Header` and `@/app/.component/Footer`.
  - Sets basic `metadata` for the public site.
- `page.js`
  - Home page: composes hero and marketing sections from components like `Carousal`, `SlidePerView`, `NewArival`, `Images`, `RowImage`, and `Shipping`.
- Key user routes (each with its own `page.js` and in some cases `layout.js`/skeletons):
  - `/shop` – Product listing with filters, pagination, and sorting.
  - `/product/[productid]` – Product details page with optional skeleton and slider helpers.
  - `/product-category/[slug]` and `/product-tag/[slug]` – Category/tag-driven product listings.
  - `/cart` and `/checkout` – Cart drawer/page and checkout flow (frontend side).
  - `/wishlist` – Wishlist view (uses localStorage-backed wishlist utilities).
  - `/contact-us`, `/privacy-policy`, `/terms-conditions`, `/refund-and-returns-policy`, `/shipping-return-policy` – Content/informational pages.
  - `/my-account` and nested routes under `my-account/` – Account dashboard, orders, downloads, edit-account, edit-address, lost/reset password.
    - Pages under `my-account` depend on authenticated user state (see middleware and auth API routes below).

**Admin area** – `src/app/admin/`
- `layout.js`
  - Client layout that implements the admin shell: collapsible sidebar and top bar using `lucide-react` icons.
  - Sidebar `menuItems` link to:
    - `/admin/dashboard`
    - `/admin/products`
    - Placeholder routes (`#`) for customers, analytics, settings.
- Admin pages:
  - `dashboard/page.js` – Placeholder Dashboard.
  - `products/page.js` – Entry point to product management; links to creation page.
  - `products/create/page.js` – Placeholder UI for product creation.
- Admin routes currently do **not** have auth/role checks; they are just separate layouts/pages.

**Middleware & protected routes** – `src/middleware.js`
- `PROTECTED_PATHS` includes key `my-account` subsections: `/my-account/orders`, `/my-account/downloads`, `/my-account/edit-account`, `/my-account/edit-address`.
- `config.matcher` guards all `/my-account/:path*` routes.
- Logic:
  - Checks for `_auth_token` cookie.
  - If missing, redirects to `/`.
  - If present, POSTs to `https://solarhouse.pk/wp-json/jwt-auth/v1/token/validate` with `Authorization: Bearer <token>`.
  - On `jwt_auth_valid_token`, request proceeds; otherwise, redirects to `/`.
- Any future changes to auth should keep the `_auth_token` cookie name and validation logic in sync with `src/app/api/auth/*`.

### Data layer & backend integration

**Axios API client** – `src/app/lib/api.js`
- Centralized `axios.create` instance with:
  - `baseURL: "https://solarhouse.pk/wp-json/wc/v3"`.
  - `auth` credentials from `NEXT_PUBLIC_AUTH_USERNAME` / `NEXT_PUBLIC_AUTH_PASSWORD`.
- Used across API route handlers (e.g. customers, orders) and client components (`Products`, cart handling) to read/write WooCommerce data.

**Auth Route Handlers** – `src/app/api/auth/*`
- `login/route.js`
  - Accepts email/password JSON.
  - Derives a WordPress `username` from the email (string before `@`).
  - Calls `https://solarhouse.pk/wp-json/jwt-auth/v1/token` with username/password.
  - On success, sets an HTTP-only `_auth_token` cookie (30‑day expiry, `secure` in production) and returns `{ valid: true, message: <WP token response> }`.
- `signup/route.js`
  - Accepts `{ username, regis (email), password }`.
  - Checks for existing WooCommerce customer by email using `api.get('/customers?email=...')`.
  - If unique, creates a new WooCommerce customer via `api.post('/customers', ...)`.
  - Then obtains a JWT from `jwt-auth/v1/token`, sets `_auth_token` cookie (same semantics as login), and returns a success response.
- `verify/route.js`
  - Reads `_auth_token` from cookies.
  - Validates the token via `jwt-auth/v1/token/validate`.
  - On success, fetches the current WordPress user (`/wp-json/wp/v2/users/me`) with the same token and returns `{ valid: true, message: <user data> }`.
- `logout/route.js`
  - Returns a response that clears `_auth_token` by setting a cookie with `maxAge: 0`.

**Password reset & email** – `src/app/api/auth/lostpassword/route.js`
- `POST`
  - Accepts `{ email }`.
  - Calls WordPress custom endpoint `custom-api/v3/reset-password` on `solarhouse.pk` to get a reset link.
  - Rewrites the link hostname from `https://solarhouse.pk` to `http://localhost:3000` so that the email directs to this frontend in development.
  - Sends an HTML email via `nodemailer` using a Gmail SMTP configuration (currently with hardcoded credentials and sender).
- `PUT`
  - Accepts `{ password, id }`.
  - Uses `api.put('/customers/:id', { password: password.password })` to update the WooCommerce customer password.

**Checkout & Orders**
- `checkout/route.js`
  - Accepts `{ billing, shipping }` JSON.
  - Ensures `billing.email` is present.
  - Derives payment method and title from `billing.payment` (`"cod,Cash on delivery"` etc.).
  - Attempts to locate an existing WooCommerce customer by email; if not found, creates a new customer with a generated password.
  - Constructs a WooCommerce order payload with:
    - Billing and shipping addresses derived from the payload.
    - `line_items` from `billing.products` (id + quantity).
    - `set_paid` and `status` based on payment method.
    - Currency hardcoded to `"PKR"`.
    - A fixed shipping line (`flat_rate`, `total: "250"`).
  - Posts to `/orders` on WooCommerce and returns the created order or appropriate error.
- `orders/route.js`
  - Accepts `{ id }` where `id` is WooCommerce `customer_id`.
  - Fetches all orders for that customer via `api.get('/orders?customer=...')`.
  - Responds with `{ valid: true, message: <orders> }` or an error if none are found.

### State management & client-side persistence

**Global store** – `src/app/lib/useStoreData.js`
- Zustand store that centralizes UI and user state:
  - UI toggles: `cart`, `wishlist` and their togglers (`toggleCart`, `toggleWishlist`).
  - Price filter values: `minVal`, `maxVal`, `minGap`, `minPrice`, `maxPrice`.
  - Product listing preferences: `showProduct` (page size), `select` (sort order), `filter` (additional filter key).
  - Checkout: `payment` string (`"cod,Cash on delivery"` by default) and `setPayment`.
  - User auth: `user` object, `valid` flag, `setUser`, `clearUser`.
- Many client components import this store to keep cart/wishlist state, filters, and user data in sync across the app.

**Cart persistence utilities** – `src/app/lib/cartUtils.js`
- Utility functions operating on localStorage key `"name"` (array of `{ id, qty }`):
  - `getCartItems()`, `addToCart(productId)`, `removeFromCart(productId)`, `updateCartQuantity(productId, quantity)`, `clearCart()`, `getCartItemsCount()`, `isInCart(productId)`.
- Intended usage pattern:
  - Components call these functions to update localStorage.
  - They then toggle the global `cart` flag in `useStoreData` to trigger re-fetching/refreshing of cart data and UI (see `Cart` component).

**Wishlist persistence utilities** – `src/app/lib/wishlistUtils.js`
- Similar pattern, using localStorage key `"wishlist"` with `{ id }` entries:
  - `getWishlistItems()`, `getWishlistIds()`, `addToWishlist(productId)`, `removeFromWishlist(productId)`, `toggleWishlist(productId)`, `clearWishlist()`, `isInWishlist(productId)`, `getWishlistCount()`.
- Components use these to keep wishlist state in sync and to show correct heart icon states.

**Cart data hook** – `src/app/lib/CartData.js`
- Client hook that combines localStorage cart IDs with live WooCommerce product data from `api`:
  - Reads `"name"` from localStorage, extracts product IDs, fetches `/products?include=<ids>`.
  - Merges local data (quantities) into product objects and returns the enriched array.
  - Re-runs when the global `cart` toggle from `useStoreData` changes.
- This pattern is mirrored in `Cart` and `Products` components, which perform similar merging logic around cart and wishlist.

### UI components & styling

**Global layout components** – `src/app/.component/`
- `Header`
  - Desktop and mobile nav bar with logo, nav links, search, wishlist, and cart.
  - Uses `usePathname` to highlight the active route.
  - Integrates `Account`, `SearchBox`, and `Cart` components.
- `Cart`
  - Slide-out cart drawer that fetches full product details using IDs from localStorage (`getCartItems`) and `api`.
  - Merges product data with stored quantities to compute total price, show a mini cart, and provide quick navigation to `/cart` or `/checkout`.
  - Uses SweetAlert2 for toast notifications when items are added/removed.
- `Products`
  - Core product grid/list component used across `shop`, category, and tag pages.
  - Integrates:
    - URL/search param filters (`min-price`, `max-price`, `per_page`, `orderby`, `order`).
    - Global store filters from `useStoreData` (price range, showProduct, sort selection).
    - WooCommerce taxonomy resolution for categories/tags.
    - Wishlist and cart interactions via `cartUtils` and `wishlistUtils`.
- Additional components (`HeroSection`, `Images`, `RowImage`, `Shipping`, etc.) provide marketing, banners, and layout but do not change global architecture.

**Account dashboard** – `src/app/(user)/my-account/page.js`
- Client page that reads `user` from `useStoreData` and offers logout via `/api/auth/logout`.
- Provides navigation to `orders`, `edit-address`, and `edit-account` subsections using Next links.
- Relies on the `_auth_token` cookie and `verify` route to keep `user` in sync.

## Notes for future Warp agents

- When working on authentication, modify **both**:
  - Cookie issuance/clearing in `src/app/api/auth/login/route.js`, `signup/route.js`, and `logout/route.js`.
  - Validation logic in `src/middleware.js` and `src/app/api/auth/verify/route.js`.
  Keeping these in sync is critical for `my-account` routes to behave correctly.
- If you change the WooCommerce or WordPress base URL, update `src/app/lib/api.js` and all hardcoded `https://solarhouse.pk` references in API routes and emails.
- Be aware that cart and wishlist state are split between **localStorage** and **Zustand**:
  - LocalStorage holds the source of truth for items.
  - The global store mainly triggers re-renders and carries some summary state.
  Updating one without the other may cause UI desynchronization.
- The password reset email flow (`lostpassword` route) currently assumes the frontend runs on `http://localhost:3000`; adjust host rewriting if you deploy under a different origin or behind a reverse proxy.
- Tailwind is configured at the PostCSS level and driven by `globals.css`; follow Tailwind v4 best practices (utility classes in components, minimal global CSS) when expanding styles.

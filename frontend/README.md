# Blovit Storefront — Amudhasurabiy Organics Frontend

Next.js 16 storefront for Blovit natural malt health drinks, integrated with the live AO Core ERP "Website" module backend.

## Environment Configuration (`.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_WEBSITE_API_KEY=blovit_website_secret_key_2026
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_key
```

## Live Storefront API Contract (`/api/website/...`)

All requests require the `X-API-Key` header matching `NEXT_PUBLIC_WEBSITE_API_KEY`. Authenticated customer endpoints require `Authorization: Bearer <jwt_token>`.

### Auth Endpoints (`/api/website/auth`)
- `POST /api/website/auth/register` — Register customer (Full Name, Mobile, Email, City, State, Password, Referral Code).
- `POST /api/website/auth/login` — Password-based sign in (Mobile, Password).
- `POST /api/website/auth/forgot-password` — Password recovery initialization.
- `POST /api/website/auth/reset-password` — Reset password using token/code.

### Catalog Endpoints (`/api/website/products`)
- `GET /api/website/products` — List all products with `originalPrice`, `category`, `rating`, `reviewCount`, `healthGoals`.
- `GET /api/website/products/:slug` — Single product details.

### Customer Account & Cart (`/api/website/account`)
- `GET /api/website/account/orders` — Customer order history.
- `GET /api/website/account/orders/:id` — Order details.
- `GET /api/website/account/addresses` — Saved addresses.
- `POST /api/website/account/addresses` — Add/update delivery address.
- `GET /api/website/account/wishlist` — Saved wishlist product IDs.
- `POST /api/website/account/wishlist` — Toggle wishlist product.
- `POST /api/website/account/cart/sync` — Merge guest cart with customer cart on login.

### Referral Program (`/api/website/referrals`)
- `GET /api/website/referrals/my-code` — Customer's unique referral code.
- `GET /api/website/referrals/my-referrals` — List referrals made with status & single-use coupon codes upon approval.
- `POST /api/website/referrals/submit` — Submit referral code during checkout or registration.

### Orders & Razorpay (`/api/website/orders`)
- `POST /api/website/orders/create-order` — Create Razorpay payment order.
- `POST /api/website/orders/verify` — Verify Razorpay HMAC signature.

### Testimonials & Reviews (`/api/website`)
- `GET /api/website/testimonials` — Real verified Google testimonials for infinite marquee.

## Development

```bash
npm run dev    # Start dev server on http://localhost:3000
npm run lint   # Run ESLint audits
npm run build  # Production build verification
```

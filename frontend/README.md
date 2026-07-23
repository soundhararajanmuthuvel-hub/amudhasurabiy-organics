# Blovit Storefront — Amudhasurabiy Organics Frontend

Next.js 16 storefront for Blovit natural malt health drinks, integrated with the live AO Core ERP "Website" module backend via a secure Next.js server proxy.

## Environment Configuration (`.env.local`)

```env
# Server-Only Secret API Key (NEVER prefix with NEXT_PUBLIC_)
WEBSITE_API_KEY=blovit_live_sec_99382174620091823746

# Public Domain Base URL
NEXT_PUBLIC_API_BASE_URL=https://api.amudhasurabiy.com

# Mock API toggle (true for local mock data, false for live ERP backend)
NEXT_PUBLIC_USE_MOCK_API=false

# Public Razorpay Key ID (intended for browser widget)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_key
```

## Security Architecture — Next.js Server API Proxy

All browser requests route through the same-origin Next.js Route Handler at `/api/proxy/[...path]`.
- The browser **never** sees or sends the secret `WEBSITE_API_KEY`.
- Next.js server handles proxying to `https://api.amudhasurabiy.com/api/website/...` and attaches `X-API-Key: process.env.WEBSITE_API_KEY` on the server side.

### Client Proxy Route Mapping (`/api/proxy/...`)
- `/api/proxy/auth/register` → `POST /api/website/auth/register`
- `/api/proxy/auth/login` → `POST /api/website/auth/login`
- `/api/proxy/products` → `GET /api/website/products`
- `/api/proxy/account/orders` → `GET /api/website/account/orders`
- `/api/proxy/account/cart/sync` → `POST /api/website/account/cart/sync`
- `/api/proxy/referrals/my-code` → `GET /api/website/referrals/my-code`
- `/api/proxy/testimonials` → `GET /api/website/testimonials`

## Development

```bash
npm run dev    # Start dev server on http://localhost:3000
npm run lint   # Run ESLint audits
npm run build  # Production build verification
```

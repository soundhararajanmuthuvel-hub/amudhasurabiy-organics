# Blovit Storefront — Amudhasurabiy Organics Frontend

Next.js 16 storefront for Blovit natural malt health drinks, integrated with the live AO Core ERP Website REST API via a production-grade secure Next.js server proxy.

## Architecture

```
Browser
   │
   ▼ (Same-Origin /api/proxy/*)
Next.js Route Handler (app/api/proxy/[...path]/route.ts)
   │
   │ Attaches X-API-Key: process.env.WEBSITE_API_KEY
   ▼
AO ERP Website REST API (https://erp.amudhasurabiy.com/api/website/*)
   │
   ▼
Database
```

## Security Requirements & Environment Variables (`.env.local`)

### Allowed in Browser (`NEXT_PUBLIC_`)
```env
NEXT_PUBLIC_SITE_URL=https://demo.amudhasurabiy.com
NEXT_PUBLIC_API_BASE_URL=https://erp.amudhasurabiy.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourkeyhere
NEXT_PUBLIC_USE_MOCK_API=false
```

### Server Only (NEVER `NEXT_PUBLIC_`)
```env
BACKEND_API_BASE_URL=https://erp.amudhasurabiy.com
WEBSITE_API_KEY=blovit_live_mrxfusiy_04ux73qg
```

## Next.js Server API Proxy Features (`/api/proxy/[...path]`)

All browser requests route through the same-origin Next.js Route Handler at `/api/proxy/[...path]`.
- **Zero Exposed Secrets**: Browser never receives or transmits `WEBSITE_API_KEY` or internal ERP URLs.
- **HTTP Methods Supported**: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`.
- **Query & Subpath Preservation**: Exact path and query params (`?search=abc&page=2`) forwarded to backend.
- **Header & Cookie Forwarding**: `Content-Type`, `Authorization`, `Cookie`, and backend `Set-Cookie` headers.
- **30-Second Timeout**: `AbortController` timeout returning `504 Gateway Timeout`.
- **Error & Stream Propagation**: Passes backend HTTP status codes (401, 403, 404, 422, 500) and response streams unchanged.

## Centralized API Helper (`lib/api.ts`)

Every service in `lib/api/*.ts` uses the `apiFetch<T>` helper wrapper featuring timeout, automatic GET retries, typed JSON parsing, and automatic customer JWT authorization header injection.

## Development

```bash
npm run dev    # Start dev server on http://localhost:3000
npm run lint   # Run ESLint audits
npm run build  # Production build verification
```

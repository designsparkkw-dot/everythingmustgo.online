# EMG — Sitemap

## Public Pages

```
/                              Home
/marketplace                   All listings (search + filters)
/categories                    All categories index
/categories/[slug]              e.g. /categories/electronics
/listing/[id]                   Product/listing details
/seller/[id]                    Individual seller profile
/business                      Business directory
/business/[id]                  Business profile page
/pricing                       Subscription plans
/blog                          Blog index
/blog/[slug]                    Blog article
/sell                          Post a listing (free flow)
/about                         About Us
/contact                       Contact Us
/faq                           FAQ
/privacy                       Privacy Policy
/terms                         Terms & Conditions
```

## Authenticated App (planned, not in current frontend build)

```
/auth/login
/auth/register
/auth/forgot-password
/dashboard                     Seller dashboard home
/dashboard/listings            Manage listings (CRUD)
/dashboard/listings/new
/dashboard/listings/[id]/edit
/dashboard/messages            Buyer <-> seller chat inbox
/dashboard/messages/[threadId]
/dashboard/analytics           Views, clicks, conversion
/dashboard/billing              Subscription & invoices
/dashboard/profile              Seller/business profile settings
/dashboard/promotions           Boost/feature a listing
```

## Admin Panel (planned)

```
/admin/login
/admin                          Overview / KPIs
/admin/users
/admin/listings                 Moderation queue
/admin/categories
/admin/businesses
/admin/payments
/admin/reports                  Abuse/fraud reports
/admin/cms                      Blog & content management
/admin/settings
```

## URL Conventions

- Lowercase, hyphenated slugs (`/categories/real-estate`)
- Listings and sellers use stable IDs (`l-1001`, `s-1`) decoupled from titles for SEO-safe permanent links
- Category and business pages are crawlable & included in `sitemap.xml`
- `robots.txt` allows all public routes; `/admin` and `/dashboard` are disallowed once authentication ships

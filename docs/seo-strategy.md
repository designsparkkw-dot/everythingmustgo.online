# EMG — SEO Strategy

## Technical SEO (implemented in this build)
- Per-page `<title>` and meta description via Next.js `generateMetadata` for all dynamic routes (categories, listings, sellers, businesses, blog)
- `sitemap.xml` auto-generated from live data (`src/app/sitemap.ts`) covering static pages, categories, listings, sellers, businesses, and blog posts
- `robots.txt` via `src/app/robots.ts`
- JSON-LD structured data: `Organization` schema sitewide, `Product`/`Offer` schema on listing pages — extend with `LocalBusiness` on business profiles and `JobPosting` on job listings
- Auto-generated Open Graph image (`opengraph-image.tsx`) for rich social previews; extend to per-listing dynamic OG images using listing photo + price overlay
- Clean, stable, hyphenated URLs decoupled from titles (`/listing/l-1001`) so links never break when sellers edit titles

## Keyword & Content Strategy
- Primary targets: "buy and sell Kuwait", "classifieds Kuwait", "online marketplace Kuwait", category-intent terms ("used cars Kuwait", "apartments for rent Salmiya")
- Category pages act as durable landing pages — each should rank for "[category] for sale in Kuwait" once listing volume is real
- Blog (E-commerce tips, selling guides, business growth, digital marketing, marketplace news) targets informational queries to build topical authority and internal links into category/marketplace pages
- Plan Arabic-language content/URLs (`/ar/...`) for GCC reach — Arabic is the dominant search language across the region

## On-Page
- One H1 per page (already enforced in `PageHero`/page components)
- Descriptive alt text on listing images (use listing title in `alt`)
- Internal linking: breadcrumbs on listing pages (Marketplace → Category → Listing), "Similar Listings" and "Showcased Listings" modules to reduce bounce and spread link equity

## Local & Regional SEO
- Google Business Profile for EMG once a physical/registered office is public
- `LocalBusiness` schema on business directory profiles with `address` and `geo` once real coordinates exist
- Submit sitemap to Google Search Console & Bing Webmaster Tools per GCC country as expansion happens

## Performance (ranking factor)
- Next.js Image component used throughout (`next/image`) for automatic responsive/optimized images
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lighthouse target: 95+ mobile, validated before each major release

## Off-Page / Growth
- Partnerships with GCC business directories and local news for backlinks
- Encourage sellers to share listing links on WhatsApp/social (built-in share-friendly OG tags do the work)
- Press coverage tied to milestones (launch, transaction count milestones)

## Measurement
- Google Search Console: track impressions/clicks per category and listing template
- GA4 events: listing view, contact-seller click, WhatsApp click, listing posted, subscription purchased
- Monthly SEO review: top queries, category page rankings, organic share of new listing traffic

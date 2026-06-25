# EMG — Development Plan

## Current Status (this build)
A high-fidelity, fully responsive Next.js + Tailwind frontend covering all public-facing pages with mock data, animated UI (Framer Motion), SEO metadata, JSON-LD, sitemap/robots. No backend, auth, real database, or payments are wired up yet.

## Phase 0 — Foundations (Weeks 1-2)
- Finalize brand system (done: colors, logo mark, typography)
- Confirm tech stack: Next.js (frontend) + Node.js/Express or Laravel (backend) + MySQL + JWT + Cloudinary
- Set up CI/CD (GitHub Actions → staging → production), environments (dev/staging/prod)
- Provision MySQL instance, Cloudinary account, domain + DNS for everythingmustgo.online

## Phase 1 — Core Marketplace MVP (Weeks 3-8)
- Auth: registration, login, social login (Google/Apple), JWT issuance & refresh
- Listings: CRUD, multi-image/video upload to Cloudinary, category assignment, draft/publish flow
- Search: keyword + category + location + price filters (MySQL full-text to start)
- Messaging: buyer↔seller chat (REST + WebSocket/Pusher for real-time), email notification fallback
- Seller dashboard: listings table, views, message count
- Migrate current static mock data/UI to live API calls

## Phase 2 — Monetization & Business Tools (Weeks 9-13)
- Subscription plans (Starter/Professional/Enterprise) with KNET, Visa, Mastercard, Apple Pay
- Featured listings & homepage banner sponsorship inventory + scheduling
- Business directory: profile creation, verification flow (trade license upload)
- Seller dashboard analytics: views, conversion, revenue

## Phase 3 — Trust, Safety & Admin (Weeks 14-17)
- Admin panel: user/listing moderation queue, reports, category management, CMS for blog
- Content moderation rules (prohibited categories, image checks)
- Review & rating system for sellers
- Abuse reporting workflow

## Phase 4 — Growth, SEO & Regional Expansion (Weeks 18-22)
- Full SEO rollout (structured data per listing/category, hreflang for Arabic, dynamic OG images per listing)
- Arabic (RTL) localization for Kuwait/GCC
- Performance pass to 95+ Lighthouse (image optimization, code splitting, edge caching)
- Expand currency/location support to KSA, UAE, Qatar, Bahrain, Oman

## Phase 5 — Scale & Hardening (Ongoing)
- Move search to Elasticsearch/Meilisearch as listing volume grows
- Add fraud detection / rate limiting on listing creation & messaging
- Mobile apps (React Native) reusing the same API
- Load testing & autoscaling on production infrastructure

## Workstreams & Ownership (suggested)
| Workstream | Owner |
|---|---|
| Frontend (Next.js) | Frontend engineer(s) |
| Backend API & DB | Backend engineer(s) |
| Payments integration (KNET/Visa/Apple Pay) | Backend + 1 payments specialist |
| DevOps/CI-CD/Infra | DevOps engineer |
| Content/SEO/Blog | Marketing + 1 content writer |
| QA | 1 dedicated QA before each phase ships |

## Definition of Done per Phase
- All routes covered by integration tests for critical flows (signup, post listing, message, pay)
- Lighthouse score ≥ 90 on mobile for all public pages
- No P1/P2 bugs open in moderation or payment flows

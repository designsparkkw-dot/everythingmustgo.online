# EMG — Admin Dashboard Structure

Internal tool for the EMG operations team (separate app/route group from the seller-facing dashboard, e.g. `admin.everythingmustgo.online` or `/admin`).

## Navigation / Modules

### 1. Overview
- Active listings, new signups, daily/weekly active users, GMV-adjacent metrics (subscriptions sold, featured-listing revenue)
- Charts: listings posted per day, category mix, conversion funnel (signup → first listing → first message → first sale-confirmed)

### 2. Users
- Searchable table: id, name, email/phone, account type, status, signup date, listings count
- Actions: view profile, suspend/ban, reset verification, impersonate (support use only, fully audited)

### 3. Listings (Moderation Queue)
- Filter by status: pending_review, active, flagged, expired
- Bulk approve/reject, edit category, force-unpublish
- Flag reasons surfaced inline (duplicate, prohibited item, suspected scam, price anomaly)

### 4. Reports & Trust/Safety
- Queue of user-submitted reports (on listings or users)
- SLA tracker (time to first response/resolution)
- Ban/warn workflow with audit log

### 5. Categories
- CRUD for categories/subcategories, icon assignment, sort order, merge/rename (with redirect mapping for SEO)

### 6. Business Directory
- Verification queue (trade license review)
- Verified badge toggle, featured business carousel management

### 7. Payments & Subscriptions
- Transaction log (provider, amount, status) across KNET/Visa/Mastercard/Apple Pay
- Subscription list with plan, status, renewal date
- Refund/dispute handling tools
- Revenue dashboard by plan, by featured-listing sales, by banner ads

### 8. Promotions / Ad Inventory
- Homepage banner slot calendar (who's booked, when, at what rate)
- Featured listing inventory & pricing rules

### 9. CMS (Blog & Content)
- Create/edit/publish blog posts, manage categories, schedule publish dates
- SEO fields per post (meta title/description, slug, OG image)

### 10. Notifications & Comms
- Broadcast/system notification composer (e.g., "new feature" banner to all sellers)
- Email template management (welcome, listing approved, payment receipt)

### 11. Settings
- Admin roles & permissions (super admin, moderator, support, finance)
- Feature flags (e.g., enable/disable Apple Pay, new category rollout)
- Localization settings (per-country currency, language)

## Roles (RBAC)
| Role | Access |
|---|---|
| Super Admin | Full access, including settings & roles |
| Moderator | Users, Listings, Reports only |
| Support | Users (read + limited actions), Reports |
| Finance | Payments, Subscriptions, Promotions revenue views |
| Content Editor | CMS/Blog only |

## Audit & Compliance
- Every destructive/sensitive action (ban, refund, impersonate, listing removal) logged with actor, timestamp, reason
- Exportable audit log for compliance review

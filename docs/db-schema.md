# EMG — Database Schema (MySQL)

Designed for a Laravel or Node.js backend with MySQL 8+. InnoDB, utf8mb4. All tables include `created_at` / `updated_at` unless noted.

## Core Tables

### users
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| name | VARCHAR(120) | |
| email | VARCHAR(160) UNIQUE | |
| phone | VARCHAR(20) UNIQUE | |
| password_hash | VARCHAR(255) | bcrypt/argon2 |
| avatar_url | VARCHAR(255) | Cloudinary URL |
| account_type | ENUM('individual','business') | |
| auth_provider | ENUM('email','google','apple','facebook') | social login |
| is_verified | BOOLEAN | civil ID / phone verification |
| status | ENUM('active','suspended','banned') | |
| locale | VARCHAR(5) | en / ar |
| country | VARCHAR(2) | ISO code, GCC rollout |

### businesses
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| user_id | FK -> users.id | owner account |
| name | VARCHAR(150) | |
| slug | VARCHAR(160) UNIQUE | |
| logo_url | VARCHAR(255) | |
| cover_url | VARCHAR(255) | |
| description | TEXT | |
| category_id | FK -> categories.id | |
| trade_license_no | VARCHAR(60) NULL | for verification |
| is_verified | BOOLEAN | |
| founded_year | SMALLINT | |

### categories
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| parent_id | FK -> categories.id NULL | self-referencing, supports subcategories |
| name | VARCHAR(80) | |
| slug | VARCHAR(80) UNIQUE | |
| icon | VARCHAR(40) | icon key |
| sort_order | SMALLINT | |

### listings
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| user_id | FK -> users.id | |
| business_id | FK -> businesses.id NULL | |
| category_id | FK -> categories.id | |
| title | VARCHAR(180) | |
| slug | VARCHAR(200) | SEO-friendly, combined with id |
| description | TEXT | |
| price | DECIMAL(12,3) NULL | nullable for "negotiable" |
| currency | VARCHAR(3) | KWD, SAR, AED, etc. |
| condition | ENUM('new','used_like_new','used_good','used_fair') | |
| location_text | VARCHAR(160) | |
| latitude | DECIMAL(10,7) NULL | |
| longitude | DECIMAL(10,7) NULL | |
| status | ENUM('draft','pending_review','active','sold','expired','removed') | |
| is_featured | BOOLEAN | |
| featured_until | DATETIME NULL | |
| views_count | INT UNSIGNED DEFAULT 0 | |
| published_at | DATETIME NULL | |
| expires_at | DATETIME NULL | |

### listing_media
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| listing_id | FK -> listings.id | |
| type | ENUM('image','video') | |
| url | VARCHAR(255) | Cloudinary URL |
| sort_order | SMALLINT | |

### conversations
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| listing_id | FK -> listings.id NULL | |
| buyer_id | FK -> users.id | |
| seller_id | FK -> users.id | |
| last_message_at | DATETIME | |

### messages
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| conversation_id | FK -> conversations.id | |
| sender_id | FK -> users.id | |
| body | TEXT | |
| is_read | BOOLEAN | |

### reviews
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| reviewer_id | FK -> users.id | |
| reviewed_user_id | FK -> users.id | |
| listing_id | FK -> listings.id NULL | |
| rating | TINYINT (1-5) | |
| comment | TEXT NULL | |

### subscriptions
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| user_id | FK -> users.id | |
| plan | ENUM('starter','professional','enterprise') | |
| status | ENUM('active','past_due','canceled','trialing') | |
| current_period_end | DATETIME | |
| payment_provider | ENUM('knet','visa','mastercard','apple_pay') | |

### payments
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| user_id | FK -> users.id | |
| subscription_id | FK -> subscriptions.id NULL | |
| listing_id | FK -> listings.id NULL | for one-off boosts |
| amount | DECIMAL(10,3) | |
| currency | VARCHAR(3) | |
| provider | ENUM('knet','visa','mastercard','apple_pay') | |
| provider_ref | VARCHAR(120) | gateway transaction id |
| status | ENUM('pending','succeeded','failed','refunded') | |

### promotions
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| listing_id | FK -> listings.id NULL | |
| business_id | FK -> businesses.id NULL | homepage banner sponsor |
| type | ENUM('featured_listing','homepage_banner','category_spotlight') | |
| starts_at | DATETIME | |
| ends_at | DATETIME | |
| payment_id | FK -> payments.id | |

### reports
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| reporter_id | FK -> users.id | |
| listing_id | FK -> listings.id NULL | |
| reported_user_id | FK -> users.id NULL | |
| reason | VARCHAR(255) | |
| status | ENUM('open','reviewing','resolved','dismissed') | |

### blog_posts
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| author_id | FK -> users.id | |
| title | VARCHAR(200) | |
| slug | VARCHAR(220) UNIQUE | |
| excerpt | VARCHAR(300) | |
| body | LONGTEXT | markdown or HTML |
| cover_url | VARCHAR(255) | |
| category | VARCHAR(60) | |
| published_at | DATETIME NULL | |

### notifications
| Column | Type | Notes |
|---|---|---|
| id | BIGINT UNSIGNED PK | |
| user_id | FK -> users.id | |
| type | VARCHAR(60) | new_message, listing_approved, etc. |
| payload | JSON | |
| read_at | DATETIME NULL | |

## Indexing Notes
- `listings`: composite index on `(category_id, status, published_at)` for marketplace/category queries; full-text index on `(title, description)` for keyword search.
- `messages`: index on `(conversation_id, created_at)`.
- `listings.location` should later move to a geospatial column (`POINT`) with a spatial index once map-radius search ships.

## Scaling Notes
- Listing search should migrate to Elasticsearch/Meilisearch once listing volume exceeds ~500K rows; MySQL full-text is sufficient for MVP/Kuwait launch.
- Media (`listing_media`) stores only Cloudinary URLs/IDs — no binary blobs in MySQL.

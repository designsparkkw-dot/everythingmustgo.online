# EMG Marketplace — Go Live Checklist (Supabase)

This wires up **real** listings: user accounts, image storage, and a moderation queue.
Once done, `Publish Listing` actually saves data and admin-approved listings show up publicly.

---

## 1. Create the Supabase project (5 min)

1. Go to https://supabase.com → sign in → **New project**.
2. Name it `emg-marketplace`, pick the closest region (Frankfurt or Mumbai for Kuwait), set a DB password.
3. Wait for the project to spin up.

## 2. Load the schema

1. Supabase Dashboard → **SQL Editor** → **New query**.
2. Paste the entire contents of `supabase/schema.sql` from this repo → **Run**.
3. Verify: **Table Editor** should show `profiles`, `listings`, `listing_images`. **Storage** should show a `listing-images` bucket (public).

## 3. Wire the env vars

1. Dashboard → **Project Settings → API**. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Create `.env.local` in the project root (copy `.env.local.example`) and paste the values.
3. Restart the dev server. **Rebuild** (`npm run build`) before re-uploading the static export to Hostinger — env vars are baked in at build time.

## 4. Turn on auth

- Dashboard → **Authentication → Providers → Email**. Enable **Email/Password**.

### Email confirmation (REQUIRED before public launch)

Blocks fake accounts and gives you a paper trail. Two settings to flip:

1. **Authentication → Providers → Email** → toggle **Confirm email** ON. New sign-ups now get a verification email and can't post until they click the link.
2. **Authentication → URL Configuration** → set **Site URL** to `https://everythingmustgo.online` and add the same URL under **Redirect URLs**. Otherwise the verification link points at `localhost`.
3. (Optional) **Authentication → Emails** → customize the *Confirm signup* template to say "EMG - Everything Must Go Online" and match your branding.

Test flow: sign up with a real inbox → click the link → get redirected back to the site → sign in works.

While developing locally you can leave it OFF for speed; turn it ON before the final Hostinger upload.

## 5. Test end-to-end

1. `npm run dev`, open http://localhost:3000
2. `Sign up` → create an account.
3. `Sell` → fill form, add photos → **Publish**. You should see: `Listing submitted…`.
4. Dashboard → **Table Editor → listings**. Edit the row and change `status` from `pending` to `active`.
5. Homepage now shows it in *Latest from the community*.

## 6. Promote yourself to admin

Sign up first with the account you want to use as admin, then in **SQL Editor**:
```sql
update public.profiles
   set role = 'admin'
 where id = (select id from auth.users where email = 'you@example.com');
```
Refresh the site — you'll see an **Admin** button in the header and can visit `/admin` to approve/reject/delete listings from the moderation queue.

Repeat for any additional admins. To revoke, set `role = 'user'`.

## 7. Deploy to Hostinger

1. `npm run build` (produces `out/`).
2. Zip contents of `out/` and upload to `public_html/` on Hostinger, or replace files in place.
3. The `.htaccess` (in `out/`) handles the custom 404 and asset caching.

---

## What's still on the roadmap

- **Rate limiting** on listing/report inserts (edge function or DB trigger — `count > N/day` per user)
- **Prohibited items policy** — currently a placeholder page; needs real content
- **Buyer↔seller message thread** as an alternative to WhatsApp for buyers who don't want to share their phone number
- **Profile page** — let users add phone/WhatsApp/avatar so the `Contact` button works.
- **Reporting & abuse controls** — Report Listing button, rate limiting on inserts.
- **ToS, Privacy, prohibited-items policy** (pages exist; content needs a lawyer's pass).
- **Email confirmation** for new accounts before they can post (turn on in Supabase Auth).
- **Image validation** — enforce MIME type + max dimensions server-side (Supabase Edge Function).

---

## Reference

- Schema: `supabase/schema.sql`
- Client: `src/lib/supabase.ts`
- Auth: `src/lib/AuthContext.tsx`, `src/app/login`, `src/app/signup`
- Sell form: `src/components/sell/SellForm.tsx`
- Dashboard: `src/app/my-listings/page.tsx`
- Public feed: `src/components/home/CommunityListings.tsx`

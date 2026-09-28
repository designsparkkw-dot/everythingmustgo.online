-- =====================================================================
-- EMG Marketplace — Supabase schema, RLS policies, storage bucket
-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =====================================================================

-- ---------- PROFILES (1 row per auth user) ---------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  whatsapp text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select using (true);

create policy "users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- LISTINGS -------------------------------------------------
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  price_kwd numeric(10,3) not null default 0,
  category_slug text not null,
  location text,
  status text not null default 'pending' check (status in ('pending','active','sold','rejected')),
  cover_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists listings_status_created_idx
  on public.listings (status, created_at desc);
create index if not exists listings_category_idx
  on public.listings (category_slug);
create index if not exists listings_user_idx
  on public.listings (user_id);

alter table public.listings enable row level security;

create policy "active listings are readable by everyone"
  on public.listings for select
  using (status = 'active' or auth.uid() = user_id);

create policy "authenticated users can create their own listings"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "users can update their own listings"
  on public.listings for update using (auth.uid() = user_id);

create policy "users can delete their own listings"
  on public.listings for delete using (auth.uid() = user_id);

-- ---------- LISTING IMAGES ------------------------------------------
create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

create index if not exists listing_images_listing_idx
  on public.listing_images (listing_id, sort_order);

alter table public.listing_images enable row level security;

create policy "listing images inherit listing visibility"
  on public.listing_images for select
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id
        and (l.status = 'active' or l.user_id = auth.uid())
    )
  );

create policy "users can insert images for their listings"
  on public.listing_images for insert
  with check (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.user_id = auth.uid()
    )
  );

create policy "users can delete images for their listings"
  on public.listing_images for delete
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and l.user_id = auth.uid()
    )
  );

-- ---------- STORAGE BUCKET -------------------------------------------
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Anyone can view uploaded images (public bucket)
create policy "public read for listing-images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

-- Authenticated users can upload into their own uid folder
create policy "users upload to their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'listing-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "users delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'listing-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ---------- ADMIN ROLE + POLICIES ------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

revoke execute on function public.is_admin() from anon, authenticated, public;
grant execute on function public.is_admin() to authenticated;

create policy "admins can read all listings"
  on public.listings for select to authenticated using (public.is_admin());

create policy "admins can update any listing"
  on public.listings for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins can delete any listing"
  on public.listings for delete to authenticated using (public.is_admin());

create policy "admins can read all listing images"
  on public.listing_images for select to authenticated using (public.is_admin());

create policy "admins can read all profiles"
  on public.profiles for select to authenticated using (public.is_admin());

-- ---------- LISTING REPORTS ------------------------------------------
create table if not exists public.listing_reports (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  reporter_id uuid references auth.users(id) on delete set null,
  reason text not null check (reason in ('scam','prohibited','duplicate','wrong_category','offensive','other')),
  details text,
  status text not null default 'open' check (status in ('open','reviewed','dismissed')),
  created_at timestamptz default now()
);

create index if not exists reports_status_idx on public.listing_reports (status, created_at desc);
create index if not exists reports_listing_idx on public.listing_reports (listing_id);

alter table public.listing_reports enable row level security;

create policy "anyone can submit a report"
  on public.listing_reports for insert with check (true);

create policy "reporters can view their own reports"
  on public.listing_reports for select using (auth.uid() = reporter_id);

create policy "admins can read all reports"
  on public.listing_reports for select to authenticated using (public.is_admin());

create policy "admins can update reports"
  on public.listing_reports for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins can delete reports"
  on public.listing_reports for delete to authenticated using (public.is_admin());

-- ---------- RATE LIMITS ---------------------------------------------
create or replace function public.enforce_listing_rate_limit()
returns trigger language plpgsql security definer set search_path = public
as $$
declare recent_count int;
begin
  if public.is_admin() then return new; end if;
  select count(*) into recent_count from public.listings
    where user_id = new.user_id and created_at > now() - interval '24 hours';
  if recent_count >= 10 then
    raise exception 'Rate limit: max 10 listings per 24 hours.' using errcode = '22023';
  end if;
  return new;
end;
$$;

drop trigger if exists listings_rate_limit on public.listings;
create trigger listings_rate_limit before insert on public.listings
  for each row execute function public.enforce_listing_rate_limit();

create or replace function public.enforce_report_rate_limit()
returns trigger language plpgsql security definer set search_path = public
as $$
declare recent_count int;
begin
  if new.reporter_id is null then return new; end if;
  if public.is_admin() then return new; end if;
  select count(*) into recent_count from public.listing_reports
    where reporter_id = new.reporter_id and created_at > now() - interval '24 hours';
  if recent_count >= 20 then
    raise exception 'Rate limit: max 20 reports per 24 hours.' using errcode = '22023';
  end if;
  if exists (select 1 from public.listing_reports
    where reporter_id = new.reporter_id and listing_id = new.listing_id
      and created_at > now() - interval '24 hours') then
    raise exception 'You already reported this listing recently.' using errcode = '22023';
  end if;
  return new;
end;
$$;

drop trigger if exists reports_rate_limit on public.listing_reports;
create trigger reports_rate_limit before insert on public.listing_reports
  for each row execute function public.enforce_report_rate_limit();

revoke execute on function public.enforce_listing_rate_limit() from anon, authenticated, public;
revoke execute on function public.enforce_report_rate_limit() from anon, authenticated, public;

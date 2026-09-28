import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anon);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, anon!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}

export type ListingRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price_kwd: number;
  category_slug: string;
  location: string | null;
  status: "pending" | "active" | "sold" | "rejected";
  cover_image_url: string | null;
  created_at: string;
};

export type ListingImageRow = {
  id: string;
  listing_id: string;
  url: string;
  sort_order: number;
};

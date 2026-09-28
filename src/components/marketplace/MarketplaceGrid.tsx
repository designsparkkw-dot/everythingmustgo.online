"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, SearchX } from "lucide-react";
import MarketplaceFilters, { Filters } from "@/components/marketplace/MarketplaceFilters";
import { getSupabase, supabaseConfigured, type ListingRow } from "@/lib/supabase";

const defaultFilters: Filters = {
  query: "",
  category: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  sort: "newest",
};

export default function MarketplaceGrid({ initialCategory = "" }: { initialCategory?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, category: initialCategory });
  const [rows, setRows] = useState<ListingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const supabase = getSupabase();
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(200);
      if (!ignore) {
        setRows((data as ListingRow[]) ?? []);
        setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const filtered = useMemo(() => {
    let result = rows.filter((l) => {
      const q = filters.query.toLowerCase();
      if (q && !(l.title.toLowerCase().includes(q) || (l.description ?? "").toLowerCase().includes(q))) return false;
      if (filters.category && l.category_slug !== filters.category) return false;
      if (filters.location && !(l.location ?? "").toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minPrice && l.price_kwd < Number(filters.minPrice)) return false;
      if (filters.maxPrice && l.price_kwd > Number(filters.maxPrice)) return false;
      return true;
    });

    if (filters.sort === "price-low") result = [...result].sort((a, b) => a.price_kwd - b.price_kwd);
    if (filters.sort === "price-high") result = [...result].sort((a, b) => b.price_kwd - a.price_kwd);
    // "featured" and "newest" both keep newest-first (real listings have no featured flag yet)
    return result;
  }, [rows, filters]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <MarketplaceFilters filters={filters} onChange={setFilters} />
      </aside>

      <div>
        {!supabaseConfigured && (
          <div className="mb-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
            Marketplace database not configured — showing an empty result set.
          </div>
        )}

        <p className="mb-5 text-sm text-black/50">
          Showing <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span> {filtered.length === 1 ? "listing" : "listings"}
        </p>

        {loading ? (
          <div className="flex justify-center py-24 text-black/40"><Loader2 className="animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-20 text-center">
            <SearchX size={36} className="text-black/25" />
            <p className="font-semibold text-[#1a1a1a]">No listings found</p>
            <p className="max-w-sm text-sm text-black/45">
              {rows.length === 0
                ? "Be the first to post here — head to Start Selling."
                : "Try clearing filters or broadening your search."}
            </p>
            {rows.length === 0 && (
              <Link href="/sell" className="mt-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold text-[#1a1a1a]">
                Post a listing
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <Link
                key={l.id}
                href={`/l?id=${l.id}`}
                className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-[#FAFAFA]">
                  {l.cover_image_url && (
                    <Image
                      src={l.cover_image_url}
                      alt={l.title}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7A00]">{l.category_slug}</p>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-[#1a1a1a]">{l.title}</h3>
                  <p className="mt-1 text-base font-bold text-[#FF7A00]">{l.price_kwd.toFixed(3)} KWD</p>
                  {l.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-black/45">
                      <MapPin size={11} /> {l.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { getSupabase, supabaseConfigured, type ListingRow } from "@/lib/supabase";

export default function CommunityListings() {
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
        .limit(8);
      if (!ignore) {
        setRows((data as ListingRow[]) ?? []);
        setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  if (!supabaseConfigured) return null;
  if (loading) return null;
  if (rows.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Fresh drops</p>
          <h2 className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl">Latest from the community</h2>
        </div>
        <Link href="/marketplace" className="hidden text-sm font-semibold text-[#FF7A00] hover:underline sm:block">
          Browse all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {rows.map((r) => (
          <Link key={r.id} href={`/l?id=${r.id}`} className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative aspect-[4/3] bg-[#FAFAFA]">
              {r.cover_image_url && (
                <Image src={r.cover_image_url} alt={r.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform group-hover:scale-105" unoptimized />
              )}
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold text-[#1a1a1a]">{r.title}</h3>
              <p className="mt-1 text-base font-bold text-[#FF7A00]">{r.price_kwd.toFixed(3)} KWD</p>
              {r.location && (
                <p className="mt-1 flex items-center gap-1 text-xs text-black/45">
                  <MapPin size={11} /> {r.location}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

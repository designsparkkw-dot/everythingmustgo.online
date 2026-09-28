"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase, type ListingRow } from "@/lib/supabase";

const statusPill: Record<ListingRow["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-800",
  sold: "bg-slate-200 text-slate-700",
  rejected: "bg-red-100 text-red-800",
};

export default function MyListingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<ListingRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const supabase = getSupabase();
    if (!supabase || !user) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setRows((data as ListingRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { if (!authLoading) load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [authLoading, user]);

  const remove = async (id: string) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("listings").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <>
      <PageHero eyebrow="Dashboard" title="My Listings" description="Everything you've posted on EMG." />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {authLoading || loading ? (
          <div className="flex justify-center py-16 text-black/45"><Loader2 className="animate-spin" /></div>
        ) : !user ? (
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
            <p className="mb-4 text-sm text-black/60">Sign in to see your listings.</p>
            <Link href="/login" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">Sign in</Link>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
            <p className="mb-4 text-sm text-black/60">You haven't posted anything yet.</p>
            <Link href="/sell" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">Post your first listing</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {rows.map((r) => (
              <div key={r.id} className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#FAFAFA]">
                  {r.cover_image_url && (
                    <Image src={r.cover_image_url} alt={r.title} fill sizes="96px" className="object-cover" unoptimized />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-[#1a1a1a]">{r.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusPill[r.status]}`}>
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-black/60">{r.price_kwd.toFixed(3)} KWD · {r.location || "—"}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-black/40">{new Date(r.created_at).toLocaleDateString()}</span>
                    <button onClick={() => remove(r.id)} className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

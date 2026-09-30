"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Flag, Loader2, RefreshCw, ShieldAlert, Trash2, XCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdminNav from "@/components/admin/AdminNav";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase } from "@/lib/supabase";

type ReportRow = {
  id: string;
  listing_id: string;
  reporter_id: string | null;
  reason: string;
  details: string | null;
  status: "open" | "reviewed" | "dismissed";
  created_at: string;
};

type ReportWithListing = ReportRow & {
  listing_title: string | null;
  listing_status: string | null;
};

type Filter = "open" | "reviewed" | "dismissed" | "all";

const FILTER_LABELS: Record<Filter, string> = {
  open: "Open",
  reviewed: "Reviewed",
  dismissed: "Dismissed",
  all: "All",
};

const REASON_LABEL: Record<string, string> = {
  scam: "Scam / fraud",
  prohibited: "Prohibited item",
  duplicate: "Duplicate",
  wrong_category: "Wrong category",
  offensive: "Offensive",
  other: "Other",
};

const STATUS_PILL: Record<ReportRow["status"], string> = {
  open: "bg-amber-100 text-amber-800",
  reviewed: "bg-emerald-100 text-emerald-800",
  dismissed: "bg-slate-200 text-slate-700",
};

export default function AdminReportsPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [rows, setRows] = useState<ReportWithListing[]>([]);
  const [counts, setCounts] = useState<Record<Filter, number>>({ open: 0, reviewed: 0, dismissed: 0, all: 0 });
  const [filter, setFilter] = useState<Filter>("open");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = getSupabase(); if (!supabase) return;
    setLoading(true);
    let q = supabase.from("listing_reports").select("*").order("created_at", { ascending: false }).limit(200);
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    const reports = (data as ReportRow[]) ?? [];
    const listingIds = Array.from(new Set(reports.map((r) => r.listing_id)));
    const titleMap = new Map<string, { title: string; status: string }>();
    if (listingIds.length > 0) {
      const { data: ls } = await supabase.from("listings").select("id, title, status").in("id", listingIds);
      (ls ?? []).forEach((l) => titleMap.set(l.id, { title: l.title, status: l.status }));
    }
    setRows(reports.map((r) => ({
      ...r,
      listing_title: titleMap.get(r.listing_id)?.title ?? null,
      listing_status: titleMap.get(r.listing_id)?.status ?? null,
    })));
    setLoading(false);
  }, [filter]);

  const loadCounts = useCallback(async () => {
    const supabase = getSupabase(); if (!supabase) return;
    const statuses: ReportRow["status"][] = ["open", "reviewed", "dismissed"];
    const results = await Promise.all(
      statuses.map((s) => supabase.from("listing_reports").select("id", { count: "exact", head: true }).eq("status", s))
    );
    const c: Record<Filter, number> = { open: 0, reviewed: 0, dismissed: 0, all: 0 };
    statuses.forEach((s, i) => { c[s] = results[i].count ?? 0; c.all += results[i].count ?? 0; });
    setCounts(c);
  }, []);

  useEffect(() => { if (isAdmin) { load(); loadCounts(); } }, [isAdmin, load, loadCounts]);

  const setStatus = async (id: string, status: ReportRow["status"]) => {
    const supabase = getSupabase(); if (!supabase) return;
    setBusy(id);
    await supabase.from("listing_reports").update({ status }).eq("id", id);
    setBusy(null);
    setRows((r) => filter === "all" ? r.map((x) => x.id === id ? { ...x, status } : x) : r.filter((x) => x.id !== id));
    loadCounts();
  };

  const removeListing = async (listingId: string) => {
    if (!confirm("Delete the underlying listing? This cannot be undone.")) return;
    const supabase = getSupabase(); if (!supabase) return;
    await supabase.from("listings").delete().eq("id", listingId);
    load();
  };

  if (authLoading) {
    return <div className="flex justify-center py-32 text-black/45"><Loader2 className="animate-spin" /></div>;
  }
  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ShieldAlert size={40} className="mx-auto mb-4 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold">Admin only</h1>
        <Link href="/" className="text-sm text-[#FF7A00] underline">Return home</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="Reports queue" description="Review user-flagged listings for scams, abuse, and prohibited items." />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminNav />
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${active ? "border-[#FF7A00] bg-[#FF7A00] text-white" : "border-black/10 bg-white text-[#1a1a1a] hover:border-[#FF7A00]/60"}`}>
                {FILTER_LABELS[f]}
                <span className={`rounded-full px-1.5 text-xs ${active ? "bg-white/25" : "bg-black/5"}`}>{counts[f]}</span>
              </button>
            );
          })}
          <button onClick={() => { load(); loadCounts(); }}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold hover:border-[#FF7A00]">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-black/45"><Loader2 className="animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-10 text-center">
            <Flag size={28} className="mx-auto mb-3 text-black/25" />
            <p className="text-sm text-black/60">No reports here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="rounded-2xl border border-black/5 bg-white p-4">
                <div className="mb-2 flex flex-wrap items-start gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_PILL[r.status]}`}>{r.status}</span>
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">{REASON_LABEL[r.reason] ?? r.reason}</span>
                  {r.listing_status && (
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/60">listing: {r.listing_status}</span>
                  )}
                  <span className="ml-auto text-[11px] text-black/40">{new Date(r.created_at).toLocaleString()}</span>
                </div>

                <p className="font-semibold text-[#1a1a1a]">
                  {r.listing_title ?? <span className="italic text-black/50">(deleted listing)</span>}
                </p>
                {r.details && <p className="mt-1 text-sm text-black/70">&ldquo;{r.details}&rdquo;</p>}
                <p className="mt-1 text-xs text-black/40">
                  Reporter: {r.reporter_id ? `${r.reporter_id.slice(0, 8)}…` : "anonymous"}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {r.listing_title && (
                    <Link href={`/l?id=${r.listing_id}`} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold hover:border-[#FF7A00]">
                      View listing <ExternalLink size={11} />
                    </Link>
                  )}
                  {r.status !== "reviewed" && (
                    <button onClick={() => setStatus(r.id, "reviewed")} disabled={busy === r.id}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
                      <Check size={12} /> Mark reviewed
                    </button>
                  )}
                  {r.status !== "dismissed" && (
                    <button onClick={() => setStatus(r.id, "dismissed")} disabled={busy === r.id}
                      className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold hover:border-black/30 disabled:opacity-50">
                      <XCircle size={12} /> Dismiss
                    </button>
                  )}
                  {r.listing_title && (
                    <button onClick={() => removeListing(r.listing_id)}
                      className="ml-auto inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                      <Trash2 size={12} /> Delete listing
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

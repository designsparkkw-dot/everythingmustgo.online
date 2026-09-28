"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock,
  ExternalLink,
  Loader2,
  RefreshCw,
  ShieldAlert,
  ShoppingBag,
  Trash2,
  XCircle,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase, type ListingRow } from "@/lib/supabase";

type Filter = "pending" | "active" | "rejected" | "sold" | "all";

type ListingWithSeller = ListingRow & {
  seller_name: string | null;
};

const FILTER_LABELS: Record<Filter, string> = {
  pending: "Pending review",
  active: "Approved",
  rejected: "Rejected",
  sold: "Sold",
  all: "All",
};

const STATUS_PILL: Record<ListingRow["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  active: "bg-emerald-100 text-emerald-800",
  sold: "bg-slate-200 text-slate-700",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<Filter>("pending");
  const [rows, setRows] = useState<ListingWithSeller[]>([]);
  const [counts, setCounts] = useState<Record<Filter, number>>({
    pending: 0, active: 0, rejected: 0, sold: 0, all: 0,
  });
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check admin flag
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setIsAdmin(false); return; }
    const supabase = getSupabase();
    if (!supabase) { setIsAdmin(false); return; }
    (async () => {
      const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      setIsAdmin(data?.role === "admin");
    })();
  }, [user, authLoading]);

  const loadCounts = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const statuses: ListingRow["status"][] = ["pending", "active", "rejected", "sold"];
    const results = await Promise.all(
      statuses.map((s) =>
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("status", s)
      )
    );
    const c: Record<Filter, number> = { pending: 0, active: 0, rejected: 0, sold: 0, all: 0 };
    statuses.forEach((s, i) => { c[s] = results[i].count ?? 0; c.all += results[i].count ?? 0; });
    setCounts(c);
  }, []);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true); setError(null);
    let q = supabase.from("listings").select("*").order("created_at", { ascending: false }).limit(100);
    if (filter !== "all") q = q.eq("status", filter);
    const { data, error: e } = await q;
    if (e) {
      setError(e.message); setRows([]); setLoading(false); return;
    }
    const listings = (data as ListingRow[]) ?? [];
    const userIds = Array.from(new Set(listings.map((l) => l.user_id)));
    const names = new Map<string, string | null>();
    if (userIds.length > 0) {
      const { data: profs } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
      (profs ?? []).forEach((p) => names.set(p.id, p.full_name));
    }
    setRows(listings.map((l) => ({ ...l, seller_name: names.get(l.user_id) ?? null })));
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (isAdmin) { load(); loadCounts(); }
  }, [isAdmin, load, loadCounts]);

  const setStatus = async (id: string, status: ListingRow["status"]) => {
    const supabase = getSupabase(); if (!supabase) return;
    setBusyId(id);
    const { error: e } = await supabase.from("listings").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setBusyId(null);
    if (e) { alert(e.message); return; }
    setRows((r) => filter === "all" ? r.map((x) => x.id === id ? { ...x, status } : x) : r.filter((x) => x.id !== id));
    loadCounts();
  };

  const remove = async (id: string) => {
    if (!confirm("Permanently delete this listing and all its images? This cannot be undone.")) return;
    const supabase = getSupabase(); if (!supabase) return;
    setBusyId(id);
    const { error: e } = await supabase.from("listings").delete().eq("id", id);
    setBusyId(null);
    if (e) { alert(e.message); return; }
    setRows((r) => r.filter((x) => x.id !== id));
    loadCounts();
  };

  // Gate rendering
  if (authLoading || isAdmin === null) {
    return (
      <div className="flex justify-center py-32 text-black/45"><Loader2 className="animate-spin" /></div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ShieldAlert size={40} className="mx-auto mb-4 text-[#FF7A00]" />
        <h1 className="mb-2 text-2xl font-bold">Admin only</h1>
        <p className="mb-6 text-sm text-black/60">Sign in with an admin account to continue.</p>
        <Link href="/login" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">Sign in</Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ShieldAlert size={40} className="mx-auto mb-4 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold">Not authorized</h1>
        <p className="text-sm text-black/60">
          Your account doesn&apos;t have admin privileges. Ask an owner to promote you via the
          Supabase dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Moderation queue"
        description="Approve, reject, or remove listings before they go live."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex gap-2">
          <Link href="/admin" className="rounded-full bg-[#1a1a1a] px-4 py-1.5 text-sm font-semibold text-white">Listings</Link>
          <Link href="/admin/reports" className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm font-semibold hover:border-[#FF7A00]">Reports</Link>
        </div>

        {/* Stats + filter tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-[#FF7A00] bg-[#FF7A00] text-white"
                    : "border-black/10 bg-white text-[#1a1a1a] hover:border-[#FF7A00]/60"
                }`}
              >
                {FILTER_LABELS[f]}
                <span className={`rounded-full px-1.5 text-xs ${active ? "bg-white/25" : "bg-black/5"}`}>
                  {counts[f]}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => { load(); loadCounts(); }}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold hover:border-[#FF7A00]"
            title="Refresh"
          >
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-16 text-black/45"><Loader2 className="animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-black/5 bg-white p-10 text-center">
            <ShoppingBag size={32} className="mx-auto mb-3 text-black/25" />
            <p className="text-sm text-black/60">Nothing in this queue right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <AdminRow
                key={r.id}
                row={r}
                busy={busyId === r.id}
                onApprove={() => setStatus(r.id, "active")}
                onReject={() => setStatus(r.id, "rejected")}
                onSold={() => setStatus(r.id, "sold")}
                onReopen={() => setStatus(r.id, "pending")}
                onDelete={() => remove(r.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function AdminRow({
  row, busy, onApprove, onReject, onSold, onReopen, onDelete,
}: {
  row: ListingWithSeller;
  busy: boolean;
  onApprove: () => void;
  onReject: () => void;
  onSold: () => void;
  onReopen: () => void;
  onDelete: () => void;
}) {
  const created = useMemo(() => new Date(row.created_at).toLocaleString(), [row.created_at]);
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-4 sm:flex-row">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-[#FAFAFA] sm:h-24 sm:w-32">
        {row.cover_image_url ? (
          <Image src={row.cover_image_url} alt={row.title} fill sizes="128px" className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-black/30">No photo</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start gap-2">
          <h3 className="mr-2 font-semibold text-[#1a1a1a]">{row.title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_PILL[row.status]}`}>
            {row.status}
          </span>
          <Link
            href={`/l?id=${row.id}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/60 hover:bg-black/10"
          >
            Preview <ExternalLink size={10} />
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-black/60">
          <span className="font-semibold text-[#FF7A00]">{row.price_kwd.toFixed(3)} KWD</span>
          <span>{row.category_slug}</span>
          {row.location && <span>{row.location}</span>}
          <span>Seller: {row.seller_name || "—"}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{created}</span>
        </div>

        {row.description && (
          <p className="line-clamp-2 text-sm text-black/70">{row.description}</p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2">
          {row.status !== "active" && (
            <button
              onClick={onApprove}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Check size={12} /> Approve
            </button>
          )}
          {row.status !== "rejected" && (
            <button
              onClick={onReject}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              <XCircle size={12} /> Reject
            </button>
          )}
          {row.status === "active" && (
            <button
              onClick={onSold}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-full bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              Mark sold
            </button>
          )}
          {(row.status === "rejected" || row.status === "sold") && (
            <button
              onClick={onReopen}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold hover:border-[#FF7A00]"
            >
              Move to pending
            </button>
          )}
          <button
            onClick={onDelete}
            disabled={busy}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 size={12} /> Delete
          </button>
          {busy && <Loader2 size={14} className="animate-spin text-black/40" />}
        </div>
      </div>
    </div>
  );
}

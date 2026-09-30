"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Flag,
  Loader2,
  Plus,
  ShieldAlert,
  ShoppingBag,
  Users,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdminNav from "@/components/admin/AdminNav";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase, type ListingRow } from "@/lib/supabase";

type Stats = {
  users: number;
  pending: number;
  active: number;
  sold: number;
  rejected: number;
  openReports: number;
  whatsappCoverage: number;
};

type RecentReport = {
  id: string;
  listing_id: string;
  reason: string;
  created_at: string;
};

export default function AdminOverviewPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPending, setRecentPending] = useState<ListingRow[]>([]);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = getSupabase(); if (!supabase) return;
    setLoading(true);

    const [pendingRes, activeRes, soldRes, rejectedRes, usersRes, waRes, reportsOpenRes, pendingListRes, reportsListRes] =
      await Promise.all([
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("status", "sold"),
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("status", "rejected"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).not("whatsapp", "is", null),
        supabase.from("listing_reports").select("id", { count: "exact", head: true }).eq("status", "open"),
        supabase.from("listings").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(5),
        supabase.from("listing_reports").select("id, listing_id, reason, created_at").eq("status", "open").order("created_at", { ascending: false }).limit(5),
      ]);

    const users = usersRes.count ?? 0;
    setStats({
      users,
      pending: pendingRes.count ?? 0,
      active: activeRes.count ?? 0,
      sold: soldRes.count ?? 0,
      rejected: rejectedRes.count ?? 0,
      openReports: reportsOpenRes.count ?? 0,
      whatsappCoverage: users > 0 ? Math.round(((waRes.count ?? 0) / users) * 100) : 0,
    });
    setRecentPending((pendingListRes.data as ListingRow[]) ?? []);
    setRecentReports((reportsListRes.data as RecentReport[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (isAdmin) load(); }, [isAdmin, load]);

  if (authLoading) return <div className="flex justify-center py-32 text-black/45"><Loader2 className="animate-spin" /></div>;
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
        <p className="text-sm text-black/60">Your account doesn&apos;t have admin privileges.</p>
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="Dashboard" description="Everything happening on EMG at a glance." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminNav />

        {loading || !stats ? (
          <div className="flex justify-center py-16 text-black/45"><Loader2 className="animate-spin" /></div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard label="Total users" value={stats.users} Icon={Users} accent="text-[#1a1a1a]" />
              <StatCard label="Active listings" value={stats.active} Icon={CheckCircle2} accent="text-emerald-600" />
              <StatCard label="Pending review" value={stats.pending} Icon={ShoppingBag} accent="text-amber-600" highlight={stats.pending > 0} />
              <StatCard label="Open reports" value={stats.openReports} Icon={Flag} accent="text-red-600" highlight={stats.openReports > 0} />
              <StatCard label="Sold" value={stats.sold} Icon={CheckCircle2} accent="text-slate-500" />
              <StatCard label="Rejected" value={stats.rejected} Icon={AlertTriangle} accent="text-red-500" />
              <StatCard label="WhatsApp coverage" value={`${stats.whatsappCoverage}%`} Icon={Users} accent="text-[#25D366]" />
              <div className="col-span-2 flex flex-col justify-center gap-2 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF7A00]">Quick action</p>
                <Link href="/admin/new-listing" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-4 py-2 text-sm font-semibold text-[#1a1a1a]">
                  <Plus size={14} /> Post a listing
                </Link>
              </div>
            </div>

            {/* Two columns: pending + reports */}
            <div className="grid gap-6 md:grid-cols-2">
              <PanelCard title="Recent pending listings" href="/admin/listings" cta="Open queue" empty="No pending listings right now.">
                {recentPending.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 border-b border-black/5 py-2.5 last:border-b-0">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#FAFAFA]">
                      {r.cover_image_url && <Image src={r.cover_image_url} alt="" fill sizes="48px" className="object-cover" unoptimized />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1a1a1a]">{r.title}</p>
                      <p className="text-xs text-black/50">{r.price_kwd.toFixed(3)} KWD · {r.category_slug}</p>
                    </div>
                    <Link href={`/l?id=${r.id}`} target="_blank" className="rounded-full bg-black/5 p-1.5 text-black/50 hover:bg-black/10">
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                ))}
              </PanelCard>

              <PanelCard title="Recent open reports" href="/admin/reports" cta="Open reports" empty="No open reports.">
                {recentReports.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3 border-b border-black/5 py-2.5 last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-700">{r.reason.replace(/_/g, " ")}</p>
                      <p className="text-xs text-black/45">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                    <Link href={`/l?id=${r.listing_id}`} target="_blank" className="rounded-full bg-black/5 p-1.5 text-black/50 hover:bg-black/10">
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                ))}
              </PanelCard>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function StatCard({
  label, value, Icon, accent, highlight,
}: {
  label: string;
  value: number | string;
  Icon: React.ComponentType<{ size?: number }>;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-amber-300 bg-amber-50" : "border-black/5 bg-white"}`}>
      <div className={`mb-1 flex items-center gap-1.5 ${accent}`}>
        <Icon size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#1a1a1a]">{value}</p>
    </div>
  );
}

function PanelCard({
  title, href, cta, empty, children,
}: {
  title: string; href: string; cta: string; empty: string; children: React.ReactNode;
}) {
  const isEmpty = Array.isArray(children) ? children.length === 0 : !children;
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#1a1a1a]">{title}</h3>
        <Link href={href} className="text-xs font-semibold text-[#FF7A00] hover:underline">{cta} →</Link>
      </div>
      {isEmpty ? (
        <p className="py-6 text-center text-xs text-black/40">{empty}</p>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

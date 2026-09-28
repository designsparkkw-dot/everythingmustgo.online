"use client";

import { useState } from "react";
import { Flag, Loader2, X } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

const REASONS: { value: string; label: string }[] = [
  { value: "scam", label: "Scam or fraud" },
  { value: "prohibited", label: "Prohibited item" },
  { value: "duplicate", label: "Duplicate listing" },
  { value: "wrong_category", label: "Wrong category" },
  { value: "offensive", label: "Offensive content" },
  { value: "other", label: "Other" },
];

export default function ReportButton({ listingId }: { listingId: string }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0].value);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const supabase = getSupabase();
    if (!supabase) { setErr("Reports aren't configured yet."); return; }
    setSubmitting(true);
    const { error } = await supabase.from("listing_reports").insert({
      listing_id: listingId,
      reporter_id: user?.id ?? null,
      reason,
      details: details.trim() || null,
    });
    setSubmitting(false);
    if (error) { setErr(error.message); return; }
    setDone(true);
    setTimeout(() => { setOpen(false); setDone(false); setDetails(""); setReason(REASONS[0].value); }, 1600);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-black/50 hover:text-red-600"
      >
        <Flag size={12} /> Report this listing
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={() => !submitting && setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a]">Report listing</h3>
                <p className="text-xs text-black/50">Help us keep EMG safe. Our team reviews every report.</p>
              </div>
              <button onClick={() => !submitting && setOpen(false)} aria-label="Close" className="text-black/40 hover:text-black/70">
                <X size={20} />
              </button>
            </div>

            {done ? (
              <div className="rounded-lg bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                Report submitted. Thank you.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/60">Reason</label>
                  <div className="grid grid-cols-2 gap-2">
                    {REASONS.map((r) => (
                      <label key={r.value} className={`cursor-pointer rounded-lg border px-3 py-2 text-xs ${reason === r.value ? "border-[#FF7A00] bg-orange-50 font-semibold text-[#FF7A00]" : "border-black/10 text-black/70 hover:border-black/20"}`}>
                        <input type="radio" name="reason" value={r.value} checked={reason === r.value} onChange={() => setReason(r.value)} className="sr-only" />
                        {r.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-black/60">Details (optional)</label>
                  <textarea
                    rows={3} value={details} onChange={(e) => setDetails(e.target.value)}
                    placeholder="Anything else we should know?"
                    className="w-full rounded-lg border border-black/10 bg-[#FAFAFA] px-3 py-2 text-sm outline-none focus:border-[#FF7A00]"
                  />
                </div>
                {err && <p className="text-sm text-red-600">{err}</p>}
                <button
                  type="submit" disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Flag size={14} />}
                  {submitting ? "Submitting…" : "Submit report"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Loader2, User } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  avatar_url: string | null;
};

const cleanNumber = (v: string) => v.replace(/[^\d+]/g, "");

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();

  const [full_name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      const p = data as Profile | null;
      setName(p?.full_name ?? "");
      setPhone(p?.phone ?? "");
      setWhatsapp(p?.whatsapp ?? "");
      setAvatarUrl(p?.avatar_url ?? null);
      setLoading(false);
    })();
  }, [user, authLoading]);

  const uploadAvatar = async (file: File) => {
    const supabase = getSupabase();
    if (!supabase || !user) return;
    setUploading(true); setErr(null);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/avatar-${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("listing-images")
        .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("listing-images").getPublicUrl(path);
      setAvatarUrl(pub.publicUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null);
    const supabase = getSupabase();
    if (!supabase || !user) return;
    setSaving(true);
    const { error: e2 } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name,
      phone: cleanNumber(phone),
      whatsapp: cleanNumber(whatsapp),
      avatar_url: avatarUrl,
    });
    setSaving(false);
    if (e2) setErr(e2.message);
    else setMsg("Profile saved.");
  };

  if (authLoading || loading) {
    return <div className="flex justify-center py-24 text-black/45"><Loader2 className="animate-spin" /></div>;
  }
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="mb-2 text-2xl font-bold">Sign in required</h1>
        <p className="mb-6 text-sm text-black/60">Sign in to view and edit your profile.</p>
        <Link href="/login" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">Sign in</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow="Account" title="Your profile" description="Buyers see this when they contact you." />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <form onSubmit={save} className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#FAFAFA]">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" fill sizes="80px" className="object-cover" unoptimized />
              ) : (
                <div className="grid h-full place-items-center text-black/30"><User size={28} /></div>
              )}
            </div>
            <div>
              <input
                ref={fileRef} type="file" accept="image/*" hidden
                onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])}
              />
              <button
                type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-semibold hover:border-[#FF7A00] disabled:opacity-50"
              >
                {uploading ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                {uploading ? "Uploading…" : avatarUrl ? "Change photo" : "Upload photo"}
              </button>
              <p className="mt-1 text-xs text-black/45">PNG or JPG, up to a few MB.</p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">Full name</label>
            <input type="text" value={full_name} onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+965 5xxx xxxx"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
              <p className="mt-1 text-xs text-black/45">Optional. Shown to buyers.</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">WhatsApp</label>
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+96550000000"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
              <p className="mt-1 text-xs text-black/45">Include country code. Powers the Contact seller button.</p>
            </div>
          </div>

          {err && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</div>}
          {msg && <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{msg}</div>}

          <Button type="submit" size="lg" className="w-full" disabled={saving}>
            {saving ? (<><Loader2 size={14} className="animate-spin" /> Saving…</>) : "Save profile"}
          </Button>
        </form>
      </div>
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ImagePlus, Loader2, MapPin, ShieldAlert, Tag, X } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdminNav from "@/components/admin/AdminNav";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase } from "@/lib/supabase";

type Photo = { id: string; file: File; url: string; name: string };
const MAX_PHOTOS = 10;
const MAX_FILE_MB = 8;

export default function AdminNewListingPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [priceKwd, setPriceKwd] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [publishActive, setPublishActive] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const photoRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const slots = MAX_PHOTOS - photos.length;
    const next: Photo[] = [];
    for (const f of files.slice(0, slots)) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) continue;
      next.push({ id: crypto.randomUUID(), file: f, url: URL.createObjectURL(f), name: f.name });
    }
    setPhotos((prev) => [...prev, ...next]);
    e.target.value = "";
  };
  const removePhoto = (id: string) => setPhotos((p) => {
    const t = p.find((x) => x.id === id); if (t) URL.revokeObjectURL(t.url);
    return p.filter((x) => x.id !== id);
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    const supabase = getSupabase();
    if (!supabase || !user) { setError("Not signed in."); return; }
    if (photos.length === 0) { setError("Add at least one photo."); return; }
    const price = Number(priceKwd);
    if (!Number.isFinite(price) || price < 0) { setError("Enter a valid price."); return; }

    setSubmitting(true);
    try {
      const status = publishActive ? "active" : "pending";
      const { data: listing, error: insErr } = await supabase
        .from("listings")
        .insert({ user_id: user.id, title, description, price_kwd: price, category_slug: categorySlug, location, status })
        .select()
        .single();
      if (insErr || !listing) throw insErr ?? new Error("Insert failed");

      const uploaded: { url: string; sort_order: number }[] = [];
      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        const ext = p.file.name.split(".").pop() ?? "jpg";
        const path = `${user.id}/${listing.id}/${i}-${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("listing-images").upload(path, p.file, { cacheControl: "3600", upsert: false, contentType: p.file.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("listing-images").getPublicUrl(path);
        uploaded.push({ url: pub.publicUrl, sort_order: i });
      }

      const { error: imgErr } = await supabase.from("listing_images").insert(
        uploaded.map((u) => ({ listing_id: listing.id, url: u.url, sort_order: u.sort_order }))
      );
      if (imgErr) throw imgErr;

      await supabase.from("listings").update({ cover_image_url: uploaded[0].url }).eq("id", listing.id);

      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]); setTitle(""); setPriceKwd(""); setLocation(""); setDescription("");
      setSuccess({ id: listing.id });
    } catch (err) {
      let msg = err instanceof Error ? err.message : "Something went wrong.";
      if (msg.startsWith("Rate limit:")) msg = msg.replace(/^Rate limit:\s*/, "");
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <div className="flex justify-center py-32 text-black/45"><Loader2 className="animate-spin" /></div>;
  if (!user) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <ShieldAlert size={40} className="mx-auto mb-4 text-[#FF7A00]" />
      <h1 className="mb-2 text-2xl font-bold">Sign in required</h1>
      <Link href="/login" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">Sign in</Link>
    </div>
  );
  if (!isAdmin) return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <ShieldAlert size={40} className="mx-auto mb-4 text-red-500" />
      <h1 className="mb-2 text-2xl font-bold">Admin only</h1>
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Admin" title="Post a listing" description="Admin listings can publish live instantly (no moderation queue)." />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminNav />

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-600" />
            <h3 className="mb-2 text-xl font-bold text-emerald-800">Listing posted</h3>
            <p className="mb-6 text-sm text-emerald-700">
              {publishActive ? "It's live and searchable now." : "Waiting in the pending queue for approval."}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href={`/l?id=${success.id}`} target="_blank" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:shadow">View listing</Link>
              <button onClick={() => setSuccess(null)} className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-5 py-2.5 text-sm font-semibold">Post another</button>
              <button onClick={() => router.push("/admin/listings")} className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold hover:border-[#FF7A00]">Open queue</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs text-orange-900">
              <strong>Admin mode.</strong> By default, listings go live instantly. Uncheck the auto-approve toggle if you want it to sit in the moderation queue like a regular user post.
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">Listing Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. iPhone 16 Pro Max 256GB - Sealed Box"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold"><Tag size={14} /> Category</label>
                <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]">
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Price (KWD)</label>
                <input type="number" required step="0.001" min="0" value={priceKwd} onChange={(e) => setPriceKwd(e.target.value)} placeholder="0.000"
                  className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold"><MapPin size={14} /> Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Salmiya, Kuwait"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">Description</label>
              <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the item…"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold">Photos <span className="text-black/40">({photos.length}/{MAX_PHOTOS})</span></label>
                {photos.length > 0 && <span className="text-xs text-black/45">First photo is the cover</span>}
              </div>
              <input ref={photoRef} type="file" accept="image/*" multiple hidden onChange={handleSelect} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((p, i) => (
                  <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 bg-[#FAFAFA]">
                    <Image src={p.url} alt={p.name} fill sizes="200px" className="object-cover" unoptimized />
                    {i === 0 && <span className="absolute left-1.5 top-1.5 rounded-full bg-[#FF7A00] px-2 py-0.5 text-[10px] font-semibold text-white">Cover</span>}
                    <button type="button" onClick={() => removePhoto(p.id)}
                      className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <button type="button" onClick={() => photoRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/10 text-center text-black/45 hover:border-[#FF7A00] hover:text-[#FF7A00]">
                    <ImagePlus size={22} /> <span className="text-xs font-medium">Add photos</span>
                  </button>
                )}
              </div>
            </div>

            <label className="flex items-center gap-2 rounded-lg bg-[#FAFAFA] p-3 text-sm">
              <input type="checkbox" checked={publishActive} onChange={(e) => setPublishActive(e.target.checked)}
                className="h-4 w-4 rounded border-black/20 accent-[#FF7A00]" />
              <span><strong>Publish immediately</strong> (skips the moderation queue)</span>
            </label>

            {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (<><Loader2 size={16} className="animate-spin" /> Publishing…</>) : "Publish listing"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

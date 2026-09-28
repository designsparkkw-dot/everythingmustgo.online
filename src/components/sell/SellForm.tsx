"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImagePlus, Loader2, MapPin, Tag, X } from "lucide-react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/AuthContext";
import { getSupabase } from "@/lib/supabase";

type Photo = { id: string; file: File; url: string; name: string };

const MAX_PHOTOS = 10;
const MAX_FILE_MB = 8;

export default function SellForm() {
  const { user, loading: authLoading, configured } = useAuth();
  const [hasWhatsapp, setHasWhatsapp] = useState<boolean | null>(null);

  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [priceKwd, setPriceKwd] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setHasWhatsapp(null); return; }
    const supabase = getSupabase(); if (!supabase) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("whatsapp").eq("id", user.id).maybeSingle();
      setHasWhatsapp(Boolean(data?.whatsapp));
    })();
  }, [user]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const slotsLeft = MAX_PHOTOS - photos.length;
    const next: Photo[] = [];
    for (const f of files.slice(0, slotsLeft)) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) continue;
      next.push({
        id: `${f.name}-${f.size}-${crypto.randomUUID()}`,
        file: f,
        url: URL.createObjectURL(f),
        name: f.name,
      });
    }
    setPhotos((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const t = prev.find((p) => p.id === id);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);

    if (!configured) {
      setError("Supabase isn't configured on this deployment yet.");
      return;
    }
    if (!user) {
      setError("Please sign in to publish a listing.");
      return;
    }
    if (photos.length === 0) {
      setError("Add at least one photo.");
      return;
    }
    const priceNum = Number(priceKwd);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError("Enter a valid price.");
      return;
    }

    const supabase = getSupabase()!;
    setSubmitting(true);

    try {
      // 1. Insert listing row (pending)
      const { data: listing, error: insertErr } = await supabase
        .from("listings")
        .insert({
          user_id: user.id,
          title,
          description,
          price_kwd: priceNum,
          category_slug: categorySlug,
          location,
          status: "pending",
        })
        .select()
        .single();

      if (insertErr || !listing) throw insertErr ?? new Error("Failed to create listing");

      // 2. Upload each image → listing-images bucket at {uid}/{listingId}/{n}-{name}
      const uploadedUrls: { url: string; sort_order: number }[] = [];
      for (let i = 0; i < photos.length; i++) {
        const p = photos[i];
        const ext = p.file.name.split(".").pop() ?? "jpg";
        const path = `${user.id}/${listing.id}/${i}-${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("listing-images")
          .upload(path, p.file, { cacheControl: "3600", upsert: false, contentType: p.file.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("listing-images").getPublicUrl(path);
        uploadedUrls.push({ url: pub.publicUrl, sort_order: i });
      }

      // 3. Insert image rows + set cover
      const { error: imgErr } = await supabase.from("listing_images").insert(
        uploadedUrls.map((u) => ({ listing_id: listing.id, url: u.url, sort_order: u.sort_order }))
      );
      if (imgErr) throw imgErr;

      await supabase
        .from("listings")
        .update({ cover_image_url: uploadedUrls[0].url })
        .eq("id", listing.id);

      // Reset
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
      setTitle(""); setPriceKwd(""); setLocation(""); setDescription("");
      setSuccess("Listing submitted. It'll appear once approved by our team.");
    } catch (err) {
      let msg = err instanceof Error ? err.message : "Something went wrong.";
      if (msg.startsWith("Rate limit:")) msg = msg.replace(/^Rate limit:\s*/, "");
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Auth gate
  if (authLoading) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-black/5 bg-white p-16 text-black/45">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
        <h3 className="mb-2 text-xl font-bold text-[#1a1a1a]">Sign in to post a listing</h3>
        <p className="mb-6 text-sm text-black/60">
          It's free — create an account in seconds and start selling.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="rounded-full border-2 border-black/15 px-6 py-2.5 text-sm font-semibold hover:border-[#FF7A00] hover:text-[#FF7A00]">
            Sign in
          </Link>
          <Link href="/signup" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:shadow-lg hover:shadow-orange-500/30">
            Create account
          </Link>
        </div>
        {!configured && (
          <p className="mt-6 text-xs text-amber-700">
            Auth isn't configured yet — set Supabase env vars to enable posting.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
      {hasWhatsapp === false && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          You haven&apos;t added a WhatsApp number to your profile yet — buyers won&apos;t be able to
          contact you.{" "}
          <Link href="/profile" className="font-semibold underline">Add one now →</Link>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Listing Title</label>
        <input
          type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. iPhone 16 Pro Max 256GB - Sealed Box"
          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a]">
            <Tag size={14} /> Category
          </label>
          <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Price (KWD)</label>
          <input
            type="number" required step="0.001" min="0" value={priceKwd}
            onChange={(e) => setPriceKwd(e.target.value)} placeholder="0.000"
            className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a]">
          <MapPin size={14} /> Location
        </label>
        <input
          type="text" value={location} onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Salmiya, Kuwait"
          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Description</label>
        <textarea
          rows={5} value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item or service in detail..."
          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Photos <span className="text-black/40">({photos.length}/{MAX_PHOTOS})</span>
          </label>
          {photos.length > 0 && <span className="text-xs text-black/45">First photo is the cover</span>}
        </div>
        <input ref={photoInputRef} type="file" accept="image/*" multiple hidden onChange={handlePhotoSelect} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((p, i) => (
            <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 bg-[#FAFAFA]">
              <Image src={p.url} alt={p.name} fill sizes="200px" className="object-cover" unoptimized />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-[#FF7A00] px-2 py-0.5 text-[10px] font-semibold text-white">Cover</span>
              )}
              <button type="button" onClick={() => removePhoto(p.id)} aria-label={`Remove ${p.name}`}
                className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100">
                <X size={12} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button type="button" onClick={() => photoInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/10 text-center text-black/45 transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]">
              <ImagePlus size={22} />
              <span className="text-xs font-medium">Add photos</span>
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-black/40">JPG/PNG/WebP up to {MAX_FILE_MB} MB each.</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div>}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (<><Loader2 size={16} className="animate-spin" /> Publishing…</>) : "Publish Listing"}
      </Button>
      <p className="text-center text-xs text-black/40">
        Posting on EMG is completely free. Listings appear after admin review.
      </p>
    </form>
  );
}

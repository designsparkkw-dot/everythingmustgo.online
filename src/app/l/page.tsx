"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { getSupabase, type ListingImageRow, type ListingRow } from "@/lib/supabase";
import ReportButton from "@/components/marketplace/ReportButton";

type SellerInfo = {
  full_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  avatar_url: string | null;
};

function Viewer() {
  const params = useSearchParams();
  const id = params.get("id");
  const [listing, setListing] = useState<ListingRow | null>(null);
  const [images, setImages] = useState<ListingImageRow[]>([]);
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [active, setActive] = useState(0);
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");

  useEffect(() => {
    (async () => {
      if (!id) { setState("missing"); return; }
      const supabase = getSupabase();
      if (!supabase) { setState("missing"); return; }
      const { data: l } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
      if (!l) { setState("missing"); return; }
      const listing = l as ListingRow;
      setListing(listing);
      const [imgsRes, sellerRes] = await Promise.all([
        supabase.from("listing_images").select("*").eq("listing_id", id).order("sort_order"),
        supabase.from("profiles").select("full_name, phone, whatsapp, avatar_url").eq("id", listing.user_id).maybeSingle(),
      ]);
      setImages((imgsRes.data as ListingImageRow[]) ?? []);
      setSeller((sellerRes.data as SellerInfo | null) ?? null);
      setState("ok");
    })();
  }, [id]);

  if (state === "loading") {
    return <div className="flex justify-center py-24 text-black/45"><Loader2 className="animate-spin" /></div>;
  }
  if (state === "missing" || !listing) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="mb-3 text-2xl font-bold">Listing not found</h1>
        <p className="mb-6 text-sm text-black/60">It may have been removed or isn't approved yet.</p>
        <Link href="/marketplace" className="rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-6 py-2.5 text-sm font-semibold">
          Browse listings
        </Link>
      </div>
    );
  }

  const cover = images[active]?.url ?? listing.cover_image_url ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#FAFAFA]">
            {cover && <Image src={cover} alt={listing.title} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" unoptimized />}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={img.id} onClick={() => setActive(i)}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${i === active ? "border-[#FF7A00]" : "border-transparent"}`}>
                  <Image src={img.url} alt="" fill sizes="80px" className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF7A00]">{listing.category_slug}</span>
          <h1 className="mt-3 text-3xl font-bold text-[#1a1a1a]">{listing.title}</h1>
          <p className="mt-2 text-3xl font-bold text-[#FF7A00]">{listing.price_kwd.toFixed(3)} KWD</p>
          {listing.location && (
            <p className="mt-2 flex items-center gap-1 text-sm text-black/60">
              <MapPin size={14} /> {listing.location}
            </p>
          )}
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-black/75">{listing.description}</p>

          <SellerCard listing={listing} seller={seller} />

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-black/40">Posted {new Date(listing.created_at).toLocaleDateString()}</p>
            <ReportButton listingId={listing.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerCard({ listing, seller }: { listing: ListingRow; seller: SellerInfo | null }) {
  const waNumber = (seller?.whatsapp ?? "").replace(/[^\d]/g, "");
  const phoneNumber = (seller?.phone ?? "").replace(/[^\d+]/g, "");
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in your EMG listing "${listing.title}" (${listing.price_kwd.toFixed(3)} KWD). Is it still available?`
  );
  const waHref = waNumber ? `https://wa.me/${waNumber}?text=${waMessage}` : null;
  const telHref = phoneNumber ? `tel:${phoneNumber}` : null;

  return (
    <div className="mt-6 rounded-2xl border border-black/5 bg-[#FAFAFA] p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white">
          {seller?.avatar_url ? (
            <Image src={seller.avatar_url} alt={seller.full_name ?? "Seller"} fill sizes="44px" className="object-cover" unoptimized />
          ) : (
            <div className="grid h-full place-items-center text-black/30"><User size={20} /></div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1a1a1a]">{seller?.full_name || "EMG seller"}</p>
          <p className="text-xs text-black/50">Verified account</p>
        </div>
      </div>

      {waHref ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Seller hasn&apos;t added a WhatsApp number yet.
        </div>
      )}

      {telHref && (
        <a
          href={telHref}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-[#1a1a1a] hover:border-[#FF7A00] hover:text-[#FF7A00]"
        >
          <Phone size={14} /> Call {phoneNumber}
        </a>
      )}
    </div>
  );
}

export default function ListingViewerPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-24 text-black/45"><Loader2 className="animate-spin" /></div>}>
      <Viewer />
    </Suspense>
  );
}

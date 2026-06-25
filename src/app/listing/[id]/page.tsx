import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  BadgeCheck,
  MessageCircle,
  Phone,
  Calendar,
  Tag,
} from "lucide-react";
import { listings, getListingById, getSimilarListings } from "@/data/listings";
import { getSellerById } from "@/data/sellers";
import ListingGallery from "@/components/marketplace/ListingGallery";
import ListingCard from "@/components/marketplace/ListingCard";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return {};
  return {
    title: listing.title,
    description: listing.description,
    openGraph: { images: [{ url: listing.image }] },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const seller = getSellerById(listing.sellerId);
  const similar = getSimilarListings(listing);
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in "${listing.title}" on EMG.`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    image: listing.images,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-black/45">
        <Link href="/marketplace" className="hover:text-[#FF7A00]">Marketplace</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${listing.category}`} className="hover:text-[#FF7A00] capitalize">
          {listing.category.replace("-", " ")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black/70">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <ListingGallery images={listing.images} title={listing.title} />

          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-[#1a1a1a] sm:text-3xl">{listing.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-black/50">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {listing.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> Posted {listing.datePosted}</span>
                  <span className="flex items-center gap-1"><Tag size={14} /> {listing.condition}</span>
                </div>
              </div>
              <p className="text-3xl font-black text-[#FF7A00]">
                {listing.price === 0 ? "Negotiable" : `${listing.price.toLocaleString()} ${listing.currency}`}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">Description</h2>
              <p className="leading-relaxed text-black/65">{listing.description}</p>
            </div>

            <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#1a1a1a]">
                <MapPin size={18} className="text-[#FF7A00]" /> Location
              </h2>
              <div className="flex h-56 w-full items-center justify-center rounded-xl bg-[#FAFAFA] bg-grid-pattern text-sm text-black/40">
                Map preview — {listing.location}
              </div>
            </div>
          </div>
        </div>

        {/* Seller sidebar */}
        <aside className="space-y-5">
          {seller && (
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <Link href={`/seller/${seller.id}`} className="flex items-center gap-3">
                <Image src={seller.avatar} alt={seller.name} width={52} height={52} className="rounded-full" />
                <div>
                  <p className="flex items-center gap-1 text-sm font-bold text-[#1a1a1a]">
                    {seller.name} {seller.verified && <BadgeCheck size={14} className="text-[#FF7A00]" />}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-amber-500">
                    <Star size={12} className="fill-amber-400" /> {seller.rating} ({seller.reviewCount} reviews)
                  </p>
                </div>
              </Link>
              <p className="mt-3 text-xs text-black/45">Member since {seller.memberSince} · {seller.responseRate}% response rate</p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${seller.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <ButtonLink href={`/contact?listing=${listing.id}`} variant="secondary" size="md">
                  <MessageCircle size={16} /> Message Seller
                </ButtonLink>
                <a
                  href={`tel:${seller.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black/10 px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]"
                >
                  <Phone size={16} /> {seller.phone}
                </a>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-[#FFC107]/40 bg-[#FFF8EC] p-5 text-xs text-[#1a1a1a]/70">
            <p className="font-bold text-[#1a1a1a]">Safety Tips</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Meet in a safe, public location.</li>
              <li>Inspect the item before paying.</li>
              <li>Avoid sharing OTPs or banking details.</li>
            </ul>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-5 text-xl font-bold text-[#1a1a1a]">Similar Listings</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

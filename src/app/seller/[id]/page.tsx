import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, Star, MapPin, MessageCircle, Phone, Calendar } from "lucide-react";
import { sellers, getSellerById } from "@/data/sellers";
import { getListingsBySeller } from "@/data/listings";
import ListingCard from "@/components/marketplace/ListingCard";

export function generateStaticParams() {
  return sellers.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seller = getSellerById(id);
  if (!seller) return {};
  return { title: `${seller.name} - Seller Profile`, description: seller.bio };
}

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seller = getSellerById(id);
  if (!seller) notFound();

  const listings = getListingsBySeller(seller.id);

  return (
    <div>
      <div className="bg-[#1a1a1a] bg-grid-pattern px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <Image src={seller.avatar} alt={seller.name} width={96} height={96} className="rounded-full border-4 border-white/10" />
          <div className="flex-1">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-white sm:justify-start">
              {seller.name} {seller.verified && <BadgeCheck size={20} className="text-[#FFC107]" />}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-white/55 sm:justify-start">
              <span className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {seller.rating} ({seller.reviewCount} reviews)</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {seller.location}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Member since {seller.memberSince}</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            <a
              href={`https://wa.me/${seller.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={`tel:${seller.phone}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Phone size={16} /> Call
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="mb-2 text-lg font-bold text-[#1a1a1a]">About</h2>
          <p className="text-black/65">{seller.bio}</p>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-black/5 pt-4 text-center">
            <div>
              <p className="text-xl font-extrabold text-[#1a1a1a]">{listings.length}</p>
              <p className="text-xs text-black/45">Active Listings</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#1a1a1a]">{seller.responseRate}%</p>
              <p className="text-xs text-black/45">Response Rate</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-[#1a1a1a] capitalize">{seller.type}</p>
              <p className="text-xs text-black/45">Account Type</p>
            </div>
          </div>
        </div>

        <h2 className="mb-5 text-xl font-bold text-[#1a1a1a]">Listings from {seller.name}</h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <p className="text-black/45">No active listings right now.</p>
        )}
      </div>
    </div>
  );
}

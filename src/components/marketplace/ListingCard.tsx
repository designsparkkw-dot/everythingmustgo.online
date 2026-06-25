import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import type { Listing } from "@/data/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10"
    >
      <div className="relative h-48 w-full overflow-hidden bg-black/5">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {listing.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1a1a1a]">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-lg font-extrabold text-[#1a1a1a]">
          {listing.price === 0 ? "Negotiable" : `${listing.price.toLocaleString()} ${listing.currency}`}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-[#1a1a1a]/90">{listing.title}</h3>
        <p className="flex items-center gap-1 text-xs text-black/45">
          <MapPin size={12} /> {listing.location}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-3">
          <span className="flex items-center gap-1 text-xs font-medium text-black/60">
            {listing.sellerName}
            <BadgeCheck size={13} className="text-[#FF7A00]" />
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star size={12} className="fill-amber-400" /> {listing.sellerRating}
          </span>
        </div>
      </div>
    </Link>
  );
}

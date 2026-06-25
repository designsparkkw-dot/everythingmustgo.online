import { getFeaturedListings } from "@/data/listings";
import ListingCard from "@/components/marketplace/ListingCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function FeaturedListings() {
  const listings = getFeaturedListings().slice(0, 8);

  return (
    <section className="bg-[#FFF8EC]/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Spotlight</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">Featured Listings</h2>
          </div>
          <ButtonLink href="/marketplace" variant="outline" size="sm">
            View All <ArrowRight size={14} />
          </ButtonLink>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}

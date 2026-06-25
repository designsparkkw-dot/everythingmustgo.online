"use client";

import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import ListingCard from "@/components/marketplace/ListingCard";
import MarketplaceFilters, { Filters } from "@/components/marketplace/MarketplaceFilters";
import { SearchX } from "lucide-react";

const defaultFilters: Filters = {
  query: "",
  category: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  sort: "newest",
};

export default function MarketplaceGrid({ initialCategory = "" }: { initialCategory?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters, category: initialCategory });

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      if (filters.query && !l.title.toLowerCase().includes(filters.query.toLowerCase())) return false;
      if (filters.category && l.category !== filters.category) return false;
      if (filters.location && !l.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minPrice && l.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && l.price > Number(filters.maxPrice)) return false;
      return true;
    });

    if (filters.sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (filters.sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (filters.sort === "featured") result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    if (filters.sort === "newest") result = [...result].sort((a, b) => +new Date(b.datePosted) - +new Date(a.datePosted));

    return result;
  }, [filters]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <MarketplaceFilters filters={filters} onChange={setFilters} />
      </aside>

      <div>
        <p className="mb-5 text-sm text-black/50">
          Showing <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span> results
        </p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-20 text-center">
            <SearchX size={36} className="text-black/25" />
            <p className="font-semibold text-[#1a1a1a]">No listings found</p>
            <p className="text-sm text-black/45">Try adjusting your filters or search keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

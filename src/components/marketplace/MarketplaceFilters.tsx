"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";

export type Filters = {
  query: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

export default function MarketplaceFilters({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 border-b border-black/5 pb-4 mb-4">
        <SlidersHorizontal size={16} className="text-[#FF7A00]" />
        <h3 className="text-sm font-bold text-[#1a1a1a]">Filter Results</h3>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35" />
        <input
          value={filters.query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="Search keyword..."
          className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#FF7A00]"
        />
      </div>

      <label className="mb-1.5 block text-xs font-semibold text-black/50">Category</label>
      <select
        value={filters.category}
        onChange={(e) => update({ category: e.target.value })}
        className="mb-4 w-full rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 px-3 text-sm outline-none focus:border-[#FF7A00]"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      <label className="mb-1.5 block text-xs font-semibold text-black/50">Location</label>
      <input
        value={filters.location}
        onChange={(e) => update({ location: e.target.value })}
        placeholder="City or area"
        className="mb-4 w-full rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 px-3 text-sm outline-none focus:border-[#FF7A00]"
      />

      <label className="mb-1.5 block text-xs font-semibold text-black/50">Price Range (KWD)</label>
      <div className="mb-4 flex gap-2">
        <input
          value={filters.minPrice}
          onChange={(e) => update({ minPrice: e.target.value })}
          placeholder="Min"
          type="number"
          className="w-1/2 rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 px-3 text-sm outline-none focus:border-[#FF7A00]"
        />
        <input
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: e.target.value })}
          placeholder="Max"
          type="number"
          className="w-1/2 rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 px-3 text-sm outline-none focus:border-[#FF7A00]"
        />
      </div>

      <label className="mb-1.5 block text-xs font-semibold text-black/50">Sort By</label>
      <select
        value={filters.sort}
        onChange={(e) => update({ sort: e.target.value })}
        className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] py-2.5 px-3 text-sm outline-none focus:border-[#FF7A00]"
      >
        <option value="newest">Date Posted: Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="featured">Featured First</option>
      </select>
    </div>
  );
}

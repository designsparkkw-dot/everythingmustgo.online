import { categories } from "@/data/categories";
import CategoryCard from "@/components/marketplace/CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Explore</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">Browse by Category</h2>
        </div>
        <p className="max-w-md text-sm text-black/50">
          From electronics to real estate, find exactly what you need across thousands of active listings.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
}

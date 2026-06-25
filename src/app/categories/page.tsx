import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CategoryCard from "@/components/marketplace/CategoryCard";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Explore every category on EMG - from electronics and vehicles to real estate, jobs, services and more.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Categories"
        title="Explore All Categories"
        description="Find exactly what you're looking for across 10 major categories and thousands of active listings."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";
import { categories } from "@/data/categories";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} for Sale`,
    description: `Browse ${category.listingCount.toLocaleString()} ${category.name} listings on EMG. ${category.description}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow="Category"
        title={category.name}
        description={`${category.description} — ${category.listingCount.toLocaleString()} active listings`}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <MarketplaceGrid initialCategory={category.slug} />
      </div>
    </>
  );
}

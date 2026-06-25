import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";

export const metadata: Metadata = {
  title: "Marketplace - Buy & Sell Anything Online",
  description: "Browse thousands of active listings across electronics, vehicles, real estate, fashion and more on EMG's marketplace.",
};

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        title="Browse All Listings"
        description="Search, filter, and discover thousands of listings from verified sellers across Kuwait and the GCC."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <MarketplaceGrid />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SellForm from "@/components/sell/SellForm";

export const metadata: Metadata = {
  title: "Post a Listing",
  description: "Create your free listing on EMG in minutes. Add photos, videos, set your price, and reach thousands of buyers across Kuwait & the GCC.",
};

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Selling"
        title="Create Your Listing"
        description="Free to post. Takes less than 2 minutes. Reach thousands of active buyers today."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SellForm />
      </div>
    </>
  );
}

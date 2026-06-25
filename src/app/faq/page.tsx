import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/marketplace/FaqAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about buying, selling, and advertising on EMG.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Help Center" title="Frequently Asked Questions" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <FaqAccordion />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ImagePlus, MapPin, Tag, Video } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/Button";

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
        <form className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Listing Title</label>
            <input
              type="text"
              placeholder="e.g. iPhone 16 Pro Max 256GB - Sealed Box"
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a]">
                <Tag size={14} /> Category
              </label>
              <select className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]">
                {categories.map((c) => (
                  <option key={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Price (KWD)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#1a1a1a]">
              <MapPin size={14} /> Location
            </label>
            <input
              type="text"
              placeholder="e.g. Salmiya, Kuwait"
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Description</label>
            <textarea
              rows={5}
              placeholder="Describe your item or service in detail..."
              className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/10 py-8 text-center text-black/45 transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]">
              <ImagePlus size={26} />
              <span className="text-xs font-medium">Upload Photos (up to 10)</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/10 py-8 text-center text-black/45 transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]">
              <Video size={26} />
              <span className="text-xs font-medium">Upload Video (optional)</span>
            </div>
          </div>

          <Button type="button" size="lg" className="w-full">
            Publish Listing
          </Button>
          <p className="text-center text-xs text-black/40">
            Posting on EMG is completely free.
          </p>
        </form>
      </div>
    </>
  );
}

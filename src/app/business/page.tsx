import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = {
  title: "Business Directory",
  description: "Discover verified businesses across Kuwait & the GCC on EMG's Business Directory.",
};

export default function BusinessDirectoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Directory"
        title="Discover Trusted Businesses"
        description="Browse verified businesses across Kuwait and the GCC, from retailers to service providers."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <Link
              key={b.id}
              href={`/business/${b.id}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative h-28 w-full">
                <Image src={b.cover} alt={b.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="-mt-14 mb-3 flex items-end gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded-xl border-4 border-white bg-white shadow">
                    <Image src={b.logo} alt={b.name} width={64} height={64} className="h-full w-full object-cover" />
                  </div>
                </div>
                <h3 className="flex items-center gap-1 text-base font-bold text-[#1a1a1a]">
                  {b.name} {b.verified && <BadgeCheck size={15} className="text-[#FF7A00]" />}
                </h3>
                <p className="text-xs font-medium text-[#FF7A00]">{b.category}</p>
                <p className="mt-2 line-clamp-2 text-sm text-black/55">{b.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-xs text-black/45">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {b.location}</span>
                  <span className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-400" /> {b.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

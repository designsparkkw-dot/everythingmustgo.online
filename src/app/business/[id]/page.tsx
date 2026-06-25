import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, Star, Calendar, ListChecks, MessageCircle } from "lucide-react";
import { businesses, getBusinessById } from "@/data/businesses";
import { listings } from "@/data/listings";
import ListingCard from "@/components/marketplace/ListingCard";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return businesses.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const business = getBusinessById(id);
  if (!business) return {};
  return { title: `${business.name} - Business Profile`, description: business.description };
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = getBusinessById(id);
  if (!business) notFound();

  const sample = listings.slice(0, 4);

  return (
    <div>
      <div className="relative h-48 w-full sm:h-64">
        <Image src={business.cover} alt={business.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 flex flex-col items-center gap-4 sm:-mt-14 sm:flex-row sm:items-end">
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg sm:h-28 sm:w-28">
            <Image src={business.logo} alt={business.name} width={112} height={112} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-[#1a1a1a] sm:justify-start">
              {business.name} {business.verified && <BadgeCheck size={20} className="text-[#FF7A00]" />}
            </h1>
            <p className="text-sm font-medium text-[#FF7A00]">{business.category}</p>
          </div>
          <ButtonLink href="/contact" size="md">
            <MessageCircle size={16} /> Contact Business
          </ButtonLink>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="mb-2 text-lg font-bold text-[#1a1a1a]">About {business.name}</h2>
              <p className="text-black/65">{business.description}</p>
            </div>

            <h2 className="mb-5 mt-10 text-xl font-bold text-[#1a1a1a]">Showcased Listings</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {sample.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex items-center justify-between border-b border-black/5 pb-3 text-sm">
                <span className="flex items-center gap-1.5 text-black/55"><MapPin size={14} /> Location</span>
                <span className="font-semibold text-[#1a1a1a]">{business.location}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 py-3 text-sm">
                <span className="flex items-center gap-1.5 text-black/55"><Calendar size={14} /> Founded</span>
                <span className="font-semibold text-[#1a1a1a]">{business.founded}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 py-3 text-sm">
                <span className="flex items-center gap-1.5 text-black/55"><ListChecks size={14} /> Listings</span>
                <span className="font-semibold text-[#1a1a1a]">{business.listingsCount}</span>
              </div>
              <div className="flex items-center justify-between pt-3 text-sm">
                <span className="flex items-center gap-1.5 text-black/55"><Star size={14} /> Rating</span>
                <span className="font-semibold text-[#1a1a1a]">{business.rating} / 5.0</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

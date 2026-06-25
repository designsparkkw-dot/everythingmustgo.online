"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ShoppingCart, MessageCircle, Star, BadgeCheck, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getListingById } from "@/data/listings";

const spotlightIds = ["l-1001", "l-1002", "l-1003", "l-1005", "l-1011"];
const spotlight = spotlightIds.map((id) => getListingById(id)!);

const floatConfig = [
  { className: "left-0 top-2 w-40 sm:w-44", rotate: -4, duration: 6, delay: 0 },
  { className: "right-0 top-0 w-36 sm:w-40", rotate: 3, duration: 6.5, delay: 0.3 },
  { className: "left-6 top-44 w-36 sm:w-40", rotate: 2, duration: 7, delay: 0.6 },
  { className: "right-2 top-48 w-40 sm:w-44", rotate: -3, duration: 6.2, delay: 0.9 },
  { className: "left-1/2 top-[22rem] w-36 -translate-x-1/2 sm:w-40", rotate: 0, duration: 5.8, delay: 1.2 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] bg-grid-pattern">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#FF7A00]/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-[#FFC107]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFC107]">
            <ShoppingCart size={14} /> Kuwait & GCC&apos;s Fastest Marketplace
          </span>
          <h1 className="text-4xl font-black leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            <span className="text-gradient-emg">Everything</span> Must Go Online
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/65">
            Buy, sell, advertise, and grow your business online — all in one fast, trusted marketplace built for Kuwait and the GCC.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/sell" size="lg">
              <ShoppingCart size={18} /> Start Selling
            </ButtonLink>
            <ButtonLink href="/marketplace" variant="outline" size="lg" className="!border-white/20 !text-white hover:!border-[#FFC107] hover:!text-[#FFC107]">
              <Search size={18} /> Browse Listings
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "89.5K+", label: "Active Listings" },
              { value: "312K+", label: "Registered Users" },
              { value: "21.4K+", label: "Transactions" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Trusted-by avatar stack */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {["s1", "s2", "s3", "s4"].map((seed) => (
                <Image
                  key={seed}
                  src={`https://i.pravatar.cc/80?u=${seed}`}
                  alt="EMG seller"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-[#1a1a1a] object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-white/55">
              Trusted by <span className="font-semibold text-white">312,000+</span> buyers & sellers
            </p>
          </div>
        </motion.div>

        {/* Floating product collage */}
        <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[34rem] lg:max-w-none">
          {spotlight.map((listing, i) => {
            const cfg = floatConfig[i];
            return (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                animate={{ opacity: 1, y: [0, -14, 0], rotate: cfg.rotate }}
                transition={{
                  opacity: { duration: 0.5, delay: cfg.delay },
                  rotate: { duration: 0.5, delay: cfg.delay },
                  y: { duration: cfg.duration, repeat: Infinity, ease: "easeInOut", delay: cfg.delay },
                }}
                className={`absolute ${cfg.className} overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40`}
              >
                <div className="relative h-24 w-full">
                  <Image src={listing.image} alt={listing.title} fill className="object-cover" sizes="200px" />
                  {listing.featured && (
                    <span className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-2 py-0.5 text-[9px] font-bold uppercase text-[#1a1a1a]">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="truncate text-xs font-semibold text-[#1a1a1a]">{listing.title}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs font-bold text-[#FF7A00]">
                      {listing.price === 0 ? "Negotiable" : `${listing.price.toLocaleString()} ${listing.currency}`}
                    </p>
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-500">
                      <Star size={9} className="fill-amber-400" /> {listing.sellerRating}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-black/40">
                    <MapPin size={9} /> {listing.location}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Live dashboard chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-sm sm:left-0 sm:translate-x-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFC107]">
              <BadgeCheck size={18} className="text-[#1a1a1a]" />
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Verified Sellers Only</p>
              <p className="text-[11px] text-white/50">Buy & sell with confidence</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute right-0 bottom-6 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-xl sm:right-2"
          >
            <MessageCircle size={14} className="text-[#FF7A00]" />
            <span className="text-xs font-medium text-[#1a1a1a]">New offer received!</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

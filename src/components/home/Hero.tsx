"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, TrendingUp, MessageCircle, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

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
        </motion.div>

        {/* Animated marketplace dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A00] animate-pulse-soft" />
                <span className="text-sm font-semibold text-white">EMG Dashboard</span>
              </div>
              <TrendingUp size={16} className="text-[#FFC107]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Views Today", value: "2,481", color: "#FF7A00" },
                { label: "New Messages", value: "37", color: "#FFC107" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/5 p-4">
                  <p className="text-xs text-white/50">{stat.label}</p>
                  <p className="mt-1 text-xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* floating product cards */}
            <div className="relative mt-5 h-56">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-40 rounded-xl bg-white p-3 shadow-xl"
              >
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-orange-200 to-amber-100" />
                <p className="mt-2 text-xs font-semibold text-[#1a1a1a]">iPhone 16 Pro Max</p>
                <p className="text-xs font-bold text-[#FF7A00]">420 KWD</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-500">
                  <Star size={10} className="fill-amber-400" /> 4.9
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute right-0 top-8 w-40 rounded-xl bg-white p-3 shadow-xl"
              >
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-amber-200 to-yellow-100" />
                <p className="mt-2 text-xs font-semibold text-[#1a1a1a]">Land Cruiser GXR</p>
                <p className="text-xs font-bold text-[#FF7A00]">18,500 KWD</p>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-500">
                  <Star size={10} className="fill-amber-400" /> 4.7
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-10 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-xl"
              >
                <MessageCircle size={14} className="text-[#FF7A00]" />
                <span className="text-xs font-medium text-[#1a1a1a]">New offer received!</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, ShieldCheck, Zap, Smartphone, TrendingUp } from "lucide-react";
import { whyChooseFeatures } from "@/data/content";

const icons = { Gift, Sparkles, ShieldCheck, Zap, Smartphone, TrendingUp };

export default function WhyChoose() {
  return (
    <section className="bg-[#1a1a1a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#FFC107]">Built for Sellers</p>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Why Choose EMG</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseFeatures.map((f, i) => {
            const Icon = icons[f.icon as keyof typeof icons];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#FF7A00]/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFC107] text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

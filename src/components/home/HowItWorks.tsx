"use client";

import { motion } from "framer-motion";
import { UserPlus, ListPlus, MessageSquare, BadgeCheck } from "lucide-react";
import { howItWorksSteps } from "@/data/content";

const icons = { UserPlus, ListPlus, MessageSquare, BadgeCheck };

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-14 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Simple Process</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">How EMG Works</h2>
      </div>
      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-9 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-black/10 to-transparent lg:block" />
        {howItWorksSteps.map((step, i) => {
          const Icon = icons[step.icon as keyof typeof icons];
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FFC107] text-white shadow-lg shadow-orange-500/30">
                <Icon size={28} />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a] text-[11px] font-bold text-white">
                  {step.step}
                </span>
              </span>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-black/50">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

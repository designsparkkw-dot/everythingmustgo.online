"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-[#FF7A00]">Trusted by Thousands</p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl">What Our Community Says</h2>
      </div>

      <div className="relative rounded-3xl border border-black/5 bg-white p-8 shadow-lg shadow-black/5 sm:p-12">
        <Quote size={40} className="text-[#FFC107]/40" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-lg font-medium leading-relaxed text-[#1a1a1a]/85 sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full" />
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">{t.name}</p>
                <p className="text-xs text-black/45">{t.role}</p>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(t.rating) ? "fill-amber-400 text-amber-400" : "text-black/15"}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[#FF7A00]" : "w-1.5 bg-black/15"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:border-[#FF7A00] hover:text-[#FF7A00]">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:border-[#FF7A00] hover:text-[#FF7A00]">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/content";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-semibold text-[#1a1a1a]">{faq.question}</span>
            <ChevronDown size={18} className={`shrink-0 text-[#FF7A00] transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: open === i ? "200px" : "0px" }}
          >
            <p className="px-6 pb-5 text-sm text-black/60">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { pricingPlans } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Choose the EMG plan that fits your selling goals - Starter, Professional, or Enterprise.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans That Grow With You"
        description="Start free, upgrade when you're ready to scale. Cancel anytime."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.highlighted
                  ? "border-transparent bg-[#1a1a1a] text-white shadow-2xl shadow-orange-500/20 md:-translate-y-3"
                  : "border-black/5 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] px-4 py-1 text-xs font-bold text-[#1a1a1a]">
                  <Sparkles size={12} /> Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold ${plan.highlighted ? "text-white" : "text-[#1a1a1a]"}`}>{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/55" : "text-black/50"}`}>{plan.description}</p>
              <p className="mt-6">
                <span className={`text-4xl font-black ${plan.highlighted ? "text-white" : "text-[#1a1a1a]"}`}>
                  {plan.price === 0 ? "Free" : `${plan.price} KWD`}
                </span>
                {plan.price > 0 && (
                  <span className={plan.highlighted ? "text-white/45" : "text-black/40"}>/{plan.period}</span>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${plan.highlighted ? "text-white/75" : "text-black/65"}`}>
                    <Check size={16} className="mt-0.5 shrink-0 text-[#FF7A00]" /> {f}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/contact"
                variant={plan.highlighted ? "primary" : "outline"}
                size="md"
                className={`mt-8 w-full ${!plan.highlighted ? "" : ""}`}
              >
                {plan.cta}
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-black/45">
          Payments secured via KNET, Visa, Mastercard & Apple Pay. Prices shown in Kuwaiti Dinar (KWD).
        </p>
      </div>
    </>
  );
}

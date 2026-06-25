import { ArrowRight, ShoppingCart } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#1a1a1a] px-8 py-16 text-center sm:px-16">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#FF7A00]/25 blur-3xl" />
        <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-[#FFC107]/20 blur-3xl" />
        <div className="relative">
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF7A00] to-[#FFC107] text-white">
            <ShoppingCart size={26} />
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Sell Online?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Join hundreds of thousands of sellers across Kuwait and the GCC growing their business on EMG.
          </p>
          <div className="mt-8">
            <ButtonLink href="/sell" size="lg">
              Create Your First Listing <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Target, Users, Globe2, Rocket } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { stats } from "@/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description: "EMG (Everything Must Go Online) is building the fastest, most trusted classifieds marketplace for Kuwait and the GCC.",
};

const values = [
  { icon: Target, title: "Our Mission", description: "Make buying and selling online effortless, fast, and trustworthy for everyone in the GCC." },
  { icon: Users, title: "Our Community", description: "Hundreds of thousands of buyers and sellers connecting every single day." },
  { icon: Globe2, title: "Regional Focus", description: "Built specifically for Kuwait and the wider Gulf, with local payment methods and support." },
  { icon: Rocket, title: "Always Improving", description: "Continuously shipping new features to make selling faster and more profitable." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About EMG"
        title="Everything Must Go Online"
        description="We're building Kuwait & the GCC's fastest, most trusted marketplace to buy, sell, advertise, and grow a business online."
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-black/5 bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFC107] text-white">
                <v.icon size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-[#1a1a1a]">{v.title}</h3>
              <p className="mt-1.5 text-sm text-black/55">{v.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#1a1a1a] p-10 text-center">
          <h2 className="text-2xl font-extrabold text-white">EMG by the Numbers</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-[#FFC107] sm:text-3xl">{s.value.toLocaleString()}{s.suffix}</p>
                <p className="mt-1 text-xs text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-5 text-black/65">
          <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Our Story</h2>
          <p className="leading-relaxed">
            Everything Must Go Online (EMG) was founded with a simple belief: buying and selling online in Kuwait
            and the GCC should be as fast, easy, and trustworthy as it is anywhere else in the world. What started
            as a classifieds idea has grown into a full marketplace platform serving individuals and businesses
            across the region.
          </p>
          <p className="leading-relaxed">
            Today, EMG connects hundreds of thousands of buyers and sellers across electronics, vehicles, real
            estate, fashion, jobs, services, and more — all backed by secure messaging, verified seller profiles,
            and tools that help businesses grow their reach.
          </p>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the EMG team - support, business inquiries, or partnership requests.",
};

const channels = [
  { icon: Mail, label: "Email", value: "info@everythingmustgo.online" },
  { icon: Phone, label: "Phone", value: "+965 5000 1000" },
  { icon: MapPin, label: "Office", value: "Kuwait City, Kuwait" },
  { icon: MessageCircle, label: "WhatsApp", value: "+965 5000 1000" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        description="Questions, feedback, or business inquiries — reach the EMG team anytime."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {channels.map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF7A00]">
                  <c.icon size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/40">{c.label}</p>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-5 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Full Name</label>
                <input type="text" placeholder="Your name" className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1a1a1a]">Message</label>
              <textarea rows={6} placeholder="Tell us more..." className="w-full rounded-xl border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm outline-none focus:border-[#FF7A00]" />
            </div>
            <Button type="button" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </>
  );
}

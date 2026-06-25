import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EMG (Everything Must Go Online) collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly (account details, listings, messages) and information collected automatically (device data, usage analytics, approximate location) when you use EMG.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to operate and improve the marketplace, facilitate buyer-seller communication, process subscription payments, prevent fraud, and send relevant notifications.",
  },
  {
    title: "3. Sharing of Information",
    body: "We do not sell your personal data. Information may be shared with payment processors (KNET, Visa, Mastercard, Apple Pay), service providers (such as Cloudinary for media storage), and law enforcement where legally required.",
  },
  {
    title: "4. Data Security",
    body: "EMG uses industry-standard security practices, including encrypted authentication (JWT) and secure storage, to protect your data against unauthorized access.",
  },
  {
    title: "5. Your Rights",
    body: "You may access, update, or request deletion of your personal data at any time from your account settings or by contacting support@everythingmustgo.online.",
  },
  {
    title: "6. Cookies",
    body: "EMG uses cookies to remember preferences, keep you signed in, and understand how the platform is used to improve performance.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. Material changes will be communicated via email or in-app notification.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: June 2026" />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="mb-2 text-lg font-bold text-[#1a1a1a]">{s.title}</h2>
            <p className="leading-relaxed text-black/65">{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

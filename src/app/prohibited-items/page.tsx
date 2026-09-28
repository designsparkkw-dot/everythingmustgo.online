import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Prohibited Items",
  description: "Items and content that are not allowed on the EMG marketplace, in line with Kuwaiti law and platform policy.",
};

const categories = [
  {
    title: "Illegal or Restricted Goods",
    items: [
      "Alcohol, narcotics, controlled substances, or any drug paraphernalia",
      "Weapons, firearms, ammunition, explosives, or replica firearms",
      "Endangered wildlife, protected species, ivory, or products derived from them",
      "Counterfeit currency, forged documents, or state IDs",
      "Any item whose sale is prohibited under Kuwaiti law",
    ],
  },
  {
    title: "Counterfeit & Intellectual Property Violations",
    items: [
      "Fake designer bags, watches, clothing, or accessories",
      "Pirated software, movies, music, or games",
      "Unauthorised copies of branded electronics",
      "Any item that infringes on trademarks or copyright",
    ],
  },
  {
    title: "Adult & Offensive Content",
    items: [
      "Pornography or sexually explicit content of any form",
      "Escort or adult companionship services",
      "Content promoting hate speech, discrimination, or violence",
      "Items that offend religious or cultural values",
    ],
  },
  {
    title: "Health, Safety & Regulated Products",
    items: [
      "Prescription medications or medical devices requiring a licence",
      "Nutritional supplements or cosmetics not approved by MOH Kuwait",
      "Recalled products or items with active safety warnings",
      "Live animals sold outside licensed pet trade channels",
    ],
  },
  {
    title: "Financial & Fraudulent Listings",
    items: [
      "Get-rich-quick schemes, pyramid or MLM offers",
      "Cryptocurrency mining rigs sold as guaranteed returns",
      "Loans, credit cards, or lending services from unlicensed providers",
      "Listings that redirect buyers off-platform to collect payment upfront",
    ],
  },
  {
    title: "Personal Data & Accounts",
    items: [
      "User accounts (social media, gaming, streaming) for sale or transfer",
      "Databases containing personal information",
      "Government-issued IDs, licences, or passports",
    ],
  },
];

export default function ProhibitedItemsPage() {
  return (
    <>
      <PageHero
        eyebrow="Community policy"
        title="Prohibited Items"
        description="What you cannot post on EMG. Listings that break this policy are removed and repeat offenders lose posting privileges."
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Report anything suspicious.</strong> Every listing has a &ldquo;Report this listing&rdquo; link
          at the bottom. Our moderation team reviews reports and removes violating content quickly.
        </div>

        {categories.map((c) => (
          <div key={c.title} className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-[#1a1a1a]">{c.title}</h2>
            <ul className="space-y-2">
              {c.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-black/70">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7A00]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl border border-black/5 bg-[#FAFAFA] p-5 text-sm text-black/70">
          <p className="mb-2 font-semibold text-[#1a1a1a]">Not sure if your item is allowed?</p>
          <p>
            Reach out to us at{" "}
            <a href="mailto:info@everythingmustgo.online" className="font-semibold text-[#FF7A00] hover:underline">
              info@everythingmustgo.online
            </a>{" "}
            before posting. We&apos;d rather answer a question than take a listing down.
          </p>
        </div>
      </div>
    </>
  );
}

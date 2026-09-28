import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of the EMG (Everything Must Go Online) marketplace.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using EMG (everythingmustgo.online), you agree to be bound by these Terms & Conditions and our Privacy Policy.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account, post listings, or make purchases on EMG.",
  },
  {
    title: "3. User Listings & Content",
    body: "Users are solely responsible for the accuracy and legality of listings they post. EMG reserves the right to remove listings that violate our content guidelines, including prohibited goods, fraudulent claims, or misleading information.",
  },
  {
    title: "4. Transactions Between Users",
    body: "EMG is a platform connecting buyers and sellers. We are not a party to any transaction between users and do not guarantee the quality, safety, or legality of items advertised.",
  },
  {
    title: "5. Free to Use",
    body: "Posting listings on EMG is free. We do not currently charge for standard listings and there are no subscription fees. If paid features are introduced in the future, they will be clearly labelled and require separate consent.",
  },
  {
    title: "6. Prohibited Conduct & Items",
    body: "Users may not post illegal, counterfeit, stolen, or restricted items, engage in fraud, harass other users, or scrape platform data. See our Prohibited Items policy for the full list. Violations result in listing removal and possible account termination.",
  },
  {
    title: "7. Termination",
    body: "EMG may suspend or terminate accounts that violate these Terms, with or without notice, at its sole discretion.",
  },
  {
    title: "8. Limitation of Liability",
    body: "EMG is provided 'as is.' We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms are governed by the laws of the State of Kuwait, without regard to conflict of law principles.",
  },
  {
    title: "10. Contact",
    body: "Questions about these Terms can be directed to info@everythingmustgo.online.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Last updated: June 2026" />
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

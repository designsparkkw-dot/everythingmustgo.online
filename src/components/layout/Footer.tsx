import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse Listings", href: "/marketplace" },
      { label: "Business Directory", href: "/business" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "Start Selling", href: "/sell" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo theme="light" />
            <p className="mt-4 max-w-xs text-sm text-white/55">
              Kuwait & the GCC&apos;s fastest-growing marketplace to buy, sell, advertise, and grow your business online.
            </p>
            <div className="mt-5 flex gap-3">
              {[FacebookIcon, InstagramIcon, XIcon, LinkedInIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF7A00]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-[#FFC107]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">Top Categories</h4>
            <ul className="flex flex-col gap-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm text-white/70 transition-colors hover:text-[#FFC107]">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-5">
            <span className="flex items-center gap-2"><Mail size={14} /> support@everythingmustgo.online</span>
            <span className="flex items-center gap-2"><Phone size={14} /> +965 5000 1000</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Kuwait City, Kuwait</span>
          </div>
          <p>© {new Date().getFullYear()} Everything Must Go Online (EMG). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

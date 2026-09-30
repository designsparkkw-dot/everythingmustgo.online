"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Flag, Plus } from "lucide-react";

const TABS = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard, match: (p: string) => p === "/admin" },
  { href: "/admin/listings", label: "Listings", Icon: ShoppingBag, match: (p: string) => p.startsWith("/admin/listings") },
  { href: "/admin/reports", label: "Reports", Icon: Flag, match: (p: string) => p.startsWith("/admin/reports") },
  { href: "/admin/new-listing", label: "New listing", Icon: Plus, match: (p: string) => p.startsWith("/admin/new-listing"), primary: true },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {TABS.map(({ href, label, Icon, match, primary }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-[#1a1a1a] text-white"
                : primary
                ? "bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-[#1a1a1a] hover:shadow-lg hover:shadow-orange-500/20"
                : "border border-black/10 bg-white text-[#1a1a1a] hover:border-[#FF7A00]"
            }`}
          >
            <Icon size={14} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

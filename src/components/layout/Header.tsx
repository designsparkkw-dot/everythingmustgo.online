"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Car,
  Building2,
  Shirt,
  Sofa,
  Briefcase,
  Wrench,
  TrendingUp,
  PawPrint,
  Dumbbell,
  MessageCircle,
  User,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/data/categories";

const icons: Record<string, typeof Smartphone> = {
  Smartphone,
  Car,
  Building2,
  Shirt,
  Sofa,
  Briefcase,
  Wrench,
  TrendingUp,
  PawPrint,
  Dumbbell,
};

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Business Directory", href: "/business" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-[#1a1a1a] hover:text-[#FF7A00] transition-colors">
                Categories
                <ChevronDown size={16} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                  >
                    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-black/5 bg-white p-4 shadow-2xl shadow-black/10">
                      {categories.map((cat) => {
                        const Icon = icons[cat.icon] ?? Smartphone;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/categories/${cat.slug}`}
                            className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-orange-50"
                          >
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${cat.color}1A`, color: cat.color }}
                            >
                              <Icon size={20} />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-[#1a1a1a]">{cat.name}</span>
                              <span className="block text-xs text-black/45">{cat.listingCount.toLocaleString()} listings</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#1a1a1a] hover:text-[#FF7A00] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/marketplace" aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#1a1a1a] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors">
              <Search size={18} />
            </Link>
            <ButtonLink href="/contact" variant="outline" size="sm">
              <User size={16} /> Log In
            </ButtonLink>
            <ButtonLink href="/sell" variant="primary" size="sm">
              Start Selling
            </ButtonLink>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.25 }}
                  className="fixed right-0 top-0 z-[60] h-dvh w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Logo />
                    <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="mb-6 flex gap-2">
                    <ButtonLink href="/sell" variant="primary" size="sm" className="flex-1">
                      Start Selling
                    </ButtonLink>
                    <ButtonLink href="/contact" variant="outline" size="sm" className="flex-1">
                      Log In
                    </ButtonLink>
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-black/40">Categories</p>
                  <div className="mb-6 flex flex-col gap-1">
                    {categories.map((cat) => {
                      const Icon = icons[cat.icon] ?? Smartphone;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-orange-50"
                        >
                          <Icon size={18} style={{ color: cat.color }} />
                          <span className="text-sm font-medium text-[#1a1a1a]">{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-black/40">Explore</p>
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-2 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-orange-50"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-orange-50"
                    >
                      <MessageCircle size={18} /> Contact Us
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

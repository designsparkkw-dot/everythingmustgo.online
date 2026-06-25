import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog - Selling Tips & Marketplace News",
  description: "E-commerce tips, selling guides, business growth strategies and marketplace news from the EMG team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="EMG Blog"
        title="Insights for Buyers & Sellers"
        description="E-commerce tips, selling guides, business growth strategies, and the latest marketplace news."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-[#1a1a1a]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-base font-bold leading-snug text-[#1a1a1a]">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-black/55">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-3 text-xs text-black/40">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

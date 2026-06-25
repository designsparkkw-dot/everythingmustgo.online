import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { listings } from "@/data/listings";
import { sellers } from "@/data/sellers";
import { businesses } from "@/data/businesses";
import { blogPosts } from "@/data/content";

const baseUrl = "https://everythingmustgo.online";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/marketplace",
    "/categories",
    "/business",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/sell",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const listingPages = listings.map((l) => ({
    url: `${baseUrl}/listing/${l.id}`,
    lastModified: new Date(l.datePosted),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const sellerPages = sellers.map((s) => ({
    url: `${baseUrl}/seller/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const businessPages = businesses.map((b) => ({
    url: `${baseUrl}/business/${b.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...categoryPages, ...listingPages, ...sellerPages, ...businessPages, ...blogPages];
}

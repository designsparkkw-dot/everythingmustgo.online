import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, openGraph: { images: [{ url: post.image }] } };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A00]">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#FF7A00]">
        {post.category}
      </span>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#1a1a1a] sm:text-4xl">{post.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-black/45">
        <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
        <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
      </div>

      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="prose prose-lg mt-8 max-w-none text-black/70">
        <p className="text-lg leading-relaxed">{post.excerpt}</p>
        <p className="mt-5 leading-relaxed">
          Selling successfully on EMG starts with understanding what buyers in Kuwait and across the GCC are
          looking for: clear photos, honest descriptions, and fast responses. Listings that respond within an
          hour see significantly higher conversion rates than those that don&apos;t.
        </p>
        <p className="mt-5 leading-relaxed">
          Whether you&apos;re an individual clearing out unused items or a growing business scaling acquisition
          through classifieds, EMG&apos;s tools — from featured placement to the Seller Dashboard — are built to
          help you move faster and sell smarter.
        </p>
        <h2 className="mt-8 text-xl font-bold text-[#1a1a1a]">Key Takeaways</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Use natural lighting and multiple angles for product photos.</li>
          <li>Price competitively by checking similar active listings.</li>
          <li>Respond to messages within the first hour whenever possible.</li>
          <li>Renew or feature your listing if it hasn&apos;t sold within a week.</li>
        </ul>
      </div>
    </article>
  );
}

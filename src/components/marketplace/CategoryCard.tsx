import Link from "next/link";
import {
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
  ArrowRight,
} from "lucide-react";
import type { Category } from "@/data/categories";

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

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = icons[category.icon] ?? Smartphone;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-orange-500/15"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${category.color}1A`, color: category.color }}
      >
        <Icon size={24} />
      </span>
      <div>
        <h3 className="text-base font-bold text-[#1a1a1a]">{category.name}</h3>
        <p className="mt-1 text-sm text-black/45">{category.listingCount.toLocaleString()} listings</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-[#FF7A00] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore <ArrowRight size={12} />
      </span>
    </Link>
  );
}

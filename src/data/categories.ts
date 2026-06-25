export type Category = {
  slug: string;
  name: string;
  icon: string;
  listingCount: number;
  color: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "electronics", name: "Electronics", icon: "Smartphone", listingCount: 18420, color: "#FF7A00", description: "Phones, laptops, gaming gear & accessories" },
  { slug: "vehicles", name: "Vehicles", icon: "Car", listingCount: 12980, color: "#FFC107", description: "Cars, motorcycles, boats & spare parts" },
  { slug: "real-estate", name: "Real Estate", icon: "Building2", listingCount: 9540, color: "#FF7A00", description: "Apartments, villas, land & commercial spaces" },
  { slug: "fashion", name: "Fashion", icon: "Shirt", listingCount: 15210, color: "#FFC107", description: "Clothing, shoes, bags & accessories" },
  { slug: "home-furniture", name: "Home & Furniture", icon: "Sofa", listingCount: 8760, color: "#FF7A00", description: "Furniture, decor, appliances & garden" },
  { slug: "jobs", name: "Jobs", icon: "Briefcase", listingCount: 6320, color: "#FFC107", description: "Full-time, part-time & freelance opportunities" },
  { slug: "services", name: "Services", icon: "Wrench", listingCount: 7440, color: "#FF7A00", description: "Home services, repairs, events & tutoring" },
  { slug: "business", name: "Business Opportunities", icon: "TrendingUp", listingCount: 2180, color: "#FFC107", description: "Franchises, investments & business for sale" },
  { slug: "pets", name: "Pets", icon: "PawPrint", listingCount: 3650, color: "#FF7A00", description: "Pets, supplies & veterinary services" },
  { slug: "sports-fitness", name: "Sports & Fitness", icon: "Dumbbell", listingCount: 4290, color: "#FFC107", description: "Equipment, bikes, gym gear & outdoor" },
];

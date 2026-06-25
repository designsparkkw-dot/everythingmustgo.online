export type Listing = {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  location: string;
  image: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  featured: boolean;
  datePosted: string;
  description: string;
  condition: "New" | "Used - Like New" | "Used - Good" | "Used - Fair";
};

const img = (seed: string) => `https://picsum.photos/seed/${seed}/640/480`;

export const listings: Listing[] = [
  {
    id: "l-1001",
    title: "iPhone 16 Pro Max 256GB - Sealed Box",
    category: "electronics",
    price: 420,
    currency: "KWD",
    location: "Salmiya, Kuwait",
    image: img("emg-iphone"),
    images: [img("emg-iphone"), img("emg-iphone-2"), img("emg-iphone-3")],
    sellerId: "s-1",
    sellerName: "Ahmad Tech Store",
    sellerRating: 4.9,
    featured: true,
    datePosted: "2026-06-20",
    description: "Brand new, sealed in box with full warranty. All colors available. Free delivery within Kuwait City.",
    condition: "New",
  },
  {
    id: "l-1002",
    title: "2023 Toyota Land Cruiser GXR - Low Mileage",
    category: "vehicles",
    price: 18500,
    currency: "KWD",
    location: "Hawally, Kuwait",
    image: img("emg-cruiser"),
    images: [img("emg-cruiser"), img("emg-cruiser-2"), img("emg-cruiser-3")],
    sellerId: "s-2",
    sellerName: "Gulf Auto Trading",
    sellerRating: 4.7,
    featured: true,
    datePosted: "2026-06-18",
    description: "Single owner, full service history, 32,000 km, GCC specs, agency maintained.",
    condition: "Used - Like New",
  },
  {
    id: "l-1003",
    title: "3BHK Sea View Apartment for Rent",
    category: "real-estate",
    price: 950,
    currency: "KWD",
    location: "Salmiya, Kuwait",
    image: img("emg-apartment"),
    images: [img("emg-apartment"), img("emg-apartment-2"), img("emg-apartment-3")],
    sellerId: "s-3",
    sellerName: "Al Noor Real Estate",
    sellerRating: 4.8,
    featured: true,
    datePosted: "2026-06-22",
    description: "Fully furnished 3-bedroom apartment with sea view, gym & pool access, near Salmiya corniche.",
    condition: "New",
  },
  {
    id: "l-1004",
    title: "Designer Leather Handbag - Limited Edition",
    category: "fashion",
    price: 145,
    currency: "KWD",
    location: "Kuwait City",
    image: img("emg-handbag"),
    images: [img("emg-handbag"), img("emg-handbag-2")],
    sellerId: "s-4",
    sellerName: "Layla's Closet",
    sellerRating: 4.6,
    featured: false,
    datePosted: "2026-06-15",
    description: "Authentic leather handbag, worn twice, comes with original packaging and authenticity card.",
    condition: "Used - Like New",
  },
  {
    id: "l-1005",
    title: "Modern L-Shaped Sofa Set - 7 Seater",
    category: "home-furniture",
    price: 380,
    currency: "KWD",
    location: "Farwaniya, Kuwait",
    image: img("emg-sofa"),
    images: [img("emg-sofa"), img("emg-sofa-2")],
    sellerId: "s-5",
    sellerName: "Home Comfort Furniture",
    sellerRating: 4.5,
    featured: true,
    datePosted: "2026-06-21",
    description: "Premium fabric L-shaped sofa, includes ottoman, available in 4 colors, free delivery & assembly.",
    condition: "New",
  },
  {
    id: "l-1006",
    title: "Senior Digital Marketing Manager - Hiring",
    category: "jobs",
    price: 0,
    currency: "KWD",
    location: "Kuwait City",
    image: img("emg-job"),
    images: [img("emg-job")],
    sellerId: "s-6",
    sellerName: "Brightline Media Group",
    sellerRating: 4.9,
    featured: false,
    datePosted: "2026-06-19",
    description: "Full-time role leading paid media & SEO strategy. 5+ years experience required. Competitive salary + bonus.",
    condition: "New",
  },
  {
    id: "l-1007",
    title: "Professional Home Deep Cleaning Service",
    category: "services",
    price: 35,
    currency: "KWD",
    location: "Mahboula, Kuwait",
    image: img("emg-clean"),
    images: [img("emg-clean")],
    sellerId: "s-7",
    sellerName: "Sparkle Pro Services",
    sellerRating: 4.8,
    featured: false,
    datePosted: "2026-06-17",
    description: "Full home deep cleaning, eco-friendly products, same-day booking available across Kuwait.",
    condition: "New",
  },
  {
    id: "l-1008",
    title: "Established Café Franchise for Sale",
    category: "business",
    price: 65000,
    currency: "KWD",
    location: "Jahra, Kuwait",
    image: img("emg-cafe"),
    images: [img("emg-cafe"), img("emg-cafe-2")],
    sellerId: "s-8",
    sellerName: "Kuwait Business Brokers",
    sellerRating: 4.7,
    featured: true,
    datePosted: "2026-06-12",
    description: "Profitable café with 3-year track record, prime location, full equipment & trained staff included.",
    condition: "Used - Good",
  },
  {
    id: "l-1009",
    title: "Golden Retriever Puppies - Vaccinated",
    category: "pets",
    price: 250,
    currency: "KWD",
    location: "Ahmadi, Kuwait",
    image: img("emg-dog"),
    images: [img("emg-dog"), img("emg-dog-2")],
    sellerId: "s-9",
    sellerName: "Desert Paws Kennel",
    sellerRating: 4.9,
    featured: false,
    datePosted: "2026-06-23",
    description: "8-week-old purebred Golden Retriever puppies, vaccinated & dewormed, parents on-site.",
    condition: "New",
  },
  {
    id: "l-1010",
    title: "Commercial Treadmill - Gym Grade",
    category: "sports-fitness",
    price: 480,
    currency: "KWD",
    location: "Salmiya, Kuwait",
    image: img("emg-treadmill"),
    images: [img("emg-treadmill")],
    sellerId: "s-10",
    sellerName: "FitGear Kuwait",
    sellerRating: 4.6,
    featured: false,
    datePosted: "2026-06-14",
    description: "Commercial-grade treadmill, barely used, perfect for home gym, free delivery within Kuwait.",
    condition: "Used - Like New",
  },
  {
    id: "l-1011",
    title: "MacBook Pro M4 16-inch - 1TB",
    category: "electronics",
    price: 750,
    currency: "KWD",
    location: "Kuwait City",
    image: img("emg-macbook"),
    images: [img("emg-macbook")],
    sellerId: "s-1",
    sellerName: "Ahmad Tech Store",
    sellerRating: 4.9,
    featured: true,
    datePosted: "2026-06-24",
    description: "Latest M4 chip, 1TB storage, space black, AppleCare+ included until 2028.",
    condition: "New",
  },
  {
    id: "l-1012",
    title: "Studio Apartment Near Avenues Mall",
    category: "real-estate",
    price: 420,
    currency: "KWD",
    location: "Al Rai, Kuwait",
    image: img("emg-studio"),
    images: [img("emg-studio")],
    sellerId: "s-3",
    sellerName: "Al Noor Real Estate",
    sellerRating: 4.8,
    featured: false,
    datePosted: "2026-06-16",
    description: "Cozy studio apartment, walking distance to The Avenues, ideal for singles or couples.",
    condition: "New",
  },
];

export function getListingById(id: string) {
  return listings.find((l) => l.id === id);
}

export function getListingsByCategory(slug: string) {
  return listings.filter((l) => l.category === slug);
}

export function getListingsBySeller(sellerId: string) {
  return listings.filter((l) => l.sellerId === sellerId);
}

export function getFeaturedListings() {
  return listings.filter((l) => l.featured);
}

export function getSimilarListings(listing: Listing, limit = 4) {
  return listings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, limit);
}

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  type: "individual" | "business";
  rating: number;
  reviewCount: number;
  memberSince: string;
  location: string;
  responseRate: number;
  phone: string;
  whatsapp: string;
  verified: boolean;
  bio: string;
};

const avatar = (seed: string) => `https://i.pravatar.cc/150?u=${seed}`;

export const sellers: Seller[] = [
  { id: "s-1", name: "Ahmad Tech Store", avatar: avatar("s1"), type: "business", rating: 4.9, reviewCount: 612, memberSince: "2021", location: "Kuwait City", responseRate: 98, phone: "+96550001001", whatsapp: "96550001001", verified: true, bio: "Authorized retailer of new & certified pre-owned electronics across Kuwait since 2021." },
  { id: "s-2", name: "Gulf Auto Trading", avatar: avatar("s2"), type: "business", rating: 4.7, reviewCount: 340, memberSince: "2019", location: "Hawally", responseRate: 95, phone: "+96550001002", whatsapp: "96550001002", verified: true, bio: "Trusted dealership specializing in GCC-spec SUVs and luxury sedans." },
  { id: "s-3", name: "Al Noor Real Estate", avatar: avatar("s3"), type: "business", rating: 4.8, reviewCount: 521, memberSince: "2018", location: "Salmiya", responseRate: 97, phone: "+96550001003", whatsapp: "96550001003", verified: true, bio: "Full-service real estate brokerage for rentals, sales and property management." },
  { id: "s-4", name: "Layla's Closet", avatar: avatar("s4"), type: "individual", rating: 4.6, reviewCount: 88, memberSince: "2023", location: "Kuwait City", responseRate: 90, phone: "+96550001004", whatsapp: "96550001004", verified: false, bio: "Curating pre-loved designer fashion pieces." },
  { id: "s-5", name: "Home Comfort Furniture", avatar: avatar("s5"), type: "business", rating: 4.5, reviewCount: 204, memberSince: "2020", location: "Farwaniya", responseRate: 92, phone: "+96550001005", whatsapp: "96550001005", verified: true, bio: "Modern and classic furniture for every room, with delivery across Kuwait." },
];

export function getSellerById(id: string) {
  return sellers.find((s) => s.id === id);
}

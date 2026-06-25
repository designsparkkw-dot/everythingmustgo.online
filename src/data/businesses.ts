export type Business = {
  id: string;
  name: string;
  logo: string;
  cover: string;
  category: string;
  location: string;
  description: string;
  founded: string;
  listingsCount: number;
  rating: number;
  verified: boolean;
};

const logo = (seed: string) => `https://picsum.photos/seed/${seed}/200/200`;
const cover = (seed: string) => `https://picsum.photos/seed/${seed}/1200/400`;

export const businesses: Business[] = [
  { id: "b-1", name: "Ahmad Tech Store", logo: logo("biz1"), cover: cover("biz1cover"), category: "Electronics", location: "Kuwait City", description: "Authorized retailer of new & certified pre-owned electronics across Kuwait.", founded: "2021", listingsCount: 142, rating: 4.9, verified: true },
  { id: "b-2", name: "Gulf Auto Trading", logo: logo("biz2"), cover: cover("biz2cover"), category: "Vehicles", location: "Hawally", description: "Specialist dealership for GCC-spec SUVs, sedans and luxury vehicles.", founded: "2019", listingsCount: 76, rating: 4.7, verified: true },
  { id: "b-3", name: "Al Noor Real Estate", logo: logo("biz3"), cover: cover("biz3cover"), category: "Real Estate", location: "Salmiya", description: "Full-service brokerage for rentals, sales and property management across Kuwait.", founded: "2018", listingsCount: 210, rating: 4.8, verified: true },
  { id: "b-4", name: "Home Comfort Furniture", logo: logo("biz4"), cover: cover("biz4cover"), category: "Home & Furniture", location: "Farwaniya", description: "Modern and classic furniture for every room, with delivery across Kuwait.", founded: "2020", listingsCount: 95, rating: 4.5, verified: true },
  { id: "b-5", name: "Brightline Media Group", logo: logo("biz5"), cover: cover("biz5cover"), category: "Services", location: "Kuwait City", description: "Full-funnel digital marketing agency serving GCC brands.", founded: "2017", listingsCount: 18, rating: 4.9, verified: true },
  { id: "b-6", name: "Desert Paws Kennel", logo: logo("biz6"), cover: cover("biz6cover"), category: "Pets", location: "Ahmadi", description: "Responsible breeder and pet care center for families across Kuwait.", founded: "2022", listingsCount: 24, rating: 4.9, verified: false },
];

export function getBusinessById(id: string) {
  return businesses.find((b) => b.id === id);
}

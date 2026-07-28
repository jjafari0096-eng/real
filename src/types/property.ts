export interface Property {
  id: string;
  slug: string;
  title: string;
  type: "villa" | "apartment" | "penthouse" | "commercial";
  status: "for-sale" | "for-rent" | "sold";
  price: number;
  currency: string;
  location: { city: string; region: string; lat: number; lng: number };
  specs: { bedrooms: number; bathrooms: number; areaM2: number; plotM2?: number; yearBuilt?: number };
  gallery: { url: string; alt: string }[];
  floorPlanUrl?: string;
  description: string;
  amenities: string[];
  featured: boolean;
}
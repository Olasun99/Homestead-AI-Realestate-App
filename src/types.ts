export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: "Apartment" | "Villa" | "Commercial" | "House" | "Land";
  purpose: "Buy" | "Rent" | "Short-let";
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    lat?: number;
    lng?: number;
  };
  features: {
    beds: number;
    baths: number;
    sqft: number;
    yearBuilt: number;
  };
  amenities: string[];
  images: string[];
  status: "Active" | "Under Contract" | "Sold" | "Off-Market";
  agent: Agent;
  verified: boolean;
  virtualTourUrl?: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  photoUrl: string;
  rating: number;
  reviewsCount: number;
  trustBadge?: "Verified Partner" | "Top Rated" | "Expert";
}

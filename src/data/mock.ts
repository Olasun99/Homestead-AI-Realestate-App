import { Property, Agent } from "../types";

export const mockAgents: Agent[] = [
  {
    id: "a1",
    name: "Sarah Jenkins",
    phone: "+1 555-123-4567",
    email: "sarah@homestead.example.com",
    company: "Homestead Premium Properties",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    rating: 4.9,
    reviewsCount: 124,
    trustBadge: "Top Rated",
  },
  {
    id: "a2",
    name: "Michael Chen",
    phone: "+1 555-987-6543",
    email: "m.chen@homestead.example.com",
    company: "Homestead Urban Living",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop",
    rating: 4.7,
    reviewsCount: 89,
    trustBadge: "Verified Partner",
  }
];

export const mockProperties: Property[] = [
  {
    id: "p1",
    title: "Modern Glass Villa in the Hills",
    description: "Experience unparalleled luxury in this stunning glass villa overlooking the city. Features a massive infinity pool, smart home automation, and floor-to-ceiling windows. Perfect for entertaining or enjoying serene sunsets.",
    price: 3250000,
    currency: "USD",
    type: "Villa",
    purpose: "Buy",
    address: {
      street: "123 Skyline Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90210"
    },
    features: {
      beds: 5,
      baths: 6.5,
      sqft: 6200,
      yearBuilt: 2022
    },
    amenities: ["Infinity Pool", "Smart Home", "Home Theater", "Wine Cellar", "Gated Security", "Outdoor Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&h=900&fit=crop"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=JRW1uFhy5G7",
    status: "Active",
    agent: mockAgents[0],
    verified: true,
  },
  {
    id: "p2",
    title: "Luxury Downtown Penthouse",
    description: "Live above the clouds in this exquisite penthouse. High ceilings, panoramic city views, and top-of-the-line appliances make this a true urban oasis.",
    price: 15000,
    currency: "USD",
    type: "Apartment",
    purpose: "Rent",
    address: {
      street: "450 Center St",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    features: {
      beds: 3,
      baths: 3,
      sqft: 2800,
      yearBuilt: 2019
    },
    amenities: ["Concierge", "Gym", "Rooftop Terrace", "Valet Parking", "Spa"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop"
    ],
    status: "Active",
    agent: mockAgents[1],
    verified: true,
  },
  {
    id: "p3",
    title: "Cozy Family Home in Suburbs",
    description: "A beautifully maintained family home with a large backyard, perfect for kids and pets. Updated kitchen and bathrooms.",
    price: 650000,
    currency: "USD",
    type: "House",
    purpose: "Buy",
    address: {
      street: "789 Oak Lane",
      city: "Austin",
      state: "TX",
      zip: "78704"
    },
    features: {
      beds: 4,
      baths: 2.5,
      sqft: 2400,
      yearBuilt: 2005
    },
    amenities: ["Large Yard", "Updated Kitchen", "Garage", "Near Schools", "Fireplace"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1600&h=900&fit=crop"
    ],
    status: "Active",
    agent: mockAgents[0],
    verified: true,
  },
  {
    id: "p4",
    title: "Luxury Detached Duplex in Lekki",
    description: "Experience premium living in the heart of Lekki Phase 1. This newly built detached duplex features modern architecture, high-end finishing, and a spacious compound.",
    price: 450000000,
    currency: "NGN",
    type: "House",
    purpose: "Buy",
    address: {
      street: "12 Admiralty Way",
      city: "Lagos",
      state: "Lagos",
      zip: "105102"
    },
    features: {
      beds: 5,
      baths: 6,
      sqft: 5000,
      yearBuilt: 2024
    },
    amenities: ["Swimming Pool", "Boys Quarters", "Fitted Kitchen", "Ample Parking", "CCTV", "24/7 Security"],
    images: [
      "https://images.unsplash.com/photo-1613490908578-8fc8221b714b?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1613490908873-6364faeb1db4?w=1600&h=900&fit=crop"
    ],
    status: "Active",
    agent: mockAgents[1],
    verified: true,
  },
  {
    id: "p5",
    title: "Ocean View Apartment in Victoria Island",
    description: "Breathtaking ocean views from this premium high-rise apartment in Victoria Island. Features world-class amenities and unparalleled security.",
    price: 25000,
    currency: "USD",
    type: "Apartment",
    purpose: "Rent",
    address: {
      street: "45 Ahmadu Bello Way",
      city: "Lagos",
      state: "Lagos",
      zip: "101241"
    },
    features: {
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      yearBuilt: 2021
    },
    amenities: ["Ocean View", "Gym", "Pool", "24/7 Power", "Smart Home Features"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&h=900&fit=crop"
    ],
    status: "Active",
    agent: mockAgents[0],
    verified: true,
  },
  {
    id: "p6",
    title: "Minimalist Loft in Soho",
    description: "A trendy, minimalist loft located in the heart of Soho. Features exposed brick walls, industrial-style windows, and an open floor plan.",
    price: 1800000,
    currency: "USD",
    type: "Apartment",
    purpose: "Buy",
    address: {
      street: "89 Spring Street",
      city: "New York",
      state: "NY",
      zip: "10012"
    },
    features: {
      beds: 1,
      baths: 1.5,
      sqft: 1500,
      yearBuilt: 1985
    },
    amenities: ["Exposed Brick", "High Ceilings", "Hardwood Floors", "In-unit Laundry"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1502005097973-f54252373e27?w=1600&h=900&fit=crop"
    ],
    status: "Active",
    agent: mockAgents[1],
    verified: true,
  }
];

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Key, TrendingDown } from "lucide-react";
import { mockProperties } from "../data/mock";

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent">("Buy");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?purpose=${activeTab}&q=${encodeURIComponent(searchQuery)}`);
  };

  const featuredProperties = mockProperties.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-gray-900 px-4 py-24 text-center">
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&h=1200&fit=crop" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-4xl space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Next Perfect Home
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Search thousands of verified properties for sale and rent in top neighborhoods.
          </p>

          <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl">
            <div className="mb-4 flex gap-4 border-b">
              {(["Buy", "Rent"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, Neighborhood, or Zip"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Curated Collections</h2>
            <p className="mt-2 text-gray-500">Hand-picked premium listings available right now.</p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"
          >
            View all listings &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <div 
              key={property.id} 
              onClick={() => navigate(`/property/${property.id}`)}
              className="group cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow">
                  {property.status}
                </div>
                {property.verified && (
                  <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    Verified
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 text-2xl font-bold text-gray-900 tracking-tight">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                </div>
                <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-800">{property.title}</h3>
                <p className="mb-4 text-sm text-gray-500">{property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}</p>
                
                <div className="mt-auto flex items-center gap-4 border-t pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{property.features.beds}</span> Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{property.features.baths}</span> Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{property.features.sqft}</span> Sq Ft
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Explore Neighborhoods</h2>
            <p className="mt-2 text-gray-500">Find the perfect community for your lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Lekki Phase 1", img: "https://images.unsplash.com/photo-1613490908578-8fc8221b714b?w=400&h=400&fit=crop", count: 120 },
              { name: "Victoria Island", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop", count: 85 },
              { name: "Ikoyi", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop", count: 42 },
              { name: "Ikeja GRA", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop", count: 65 }
            ].map((n, i) => (
              <div key={i} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer" onClick={() => navigate(`/search?q=${n.name}`)}>
                <img src={n.img} alt={n.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{n.name}</h3>
                  <p className="text-sm text-gray-300">{n.count} Properties</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { quote: "Homestead made finding our dream home in Lagos an absolute breeze. The verified agents feature gave us peace of mind.", author: "Adebayo S." },
              { quote: "The virtual tours and detailed neighborhood insights helped me secure an apartment without even visiting first.", author: "Jessica M." },
              { quote: "As an agent, the CRM tools and brochure generator have completely transformed how I handle my leads.", author: "Michael C." }
            ].map((t, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl relative">
                <div className="text-blue-500 text-4xl font-serif absolute top-4 left-6">"</div>
                <p className="text-gray-300 mt-4 mb-6 relative z-10 leading-relaxed">{t.quote}</p>
                <p className="font-bold text-white">— {t.author}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-10 border-t border-gray-800 flex flex-wrap justify-center items-center gap-10 opacity-50 grayscale">
            <div className="text-xl font-bold">FORBES</div>
            <div className="text-xl font-bold">TECHCRUNCH</div>
            <div className="text-xl font-bold">WALL STREET JOURNAL</div>
            <div className="text-xl font-bold">BLOOMBERG</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-500">Your journey to a new home made simple.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">1. Browse Properties</h3>
              <p className="text-gray-500">Search thousands of verified listings to find the perfect match for your needs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">2. Book a Tour</h3>
              <p className="text-gray-500">Schedule in-person or virtual tours directly with top-rated agents.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Key className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">3. Close the Deal</h3>
              <p className="text-gray-500">Finalize paperwork securely and get the keys to your new home.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

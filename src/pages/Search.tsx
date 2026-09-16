import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Filter, MapPin, Search as SearchIcon, Map as MapIcon, List, ChevronDown, Scale, Bell, Check } from "lucide-react";
import { mockProperties } from "../data/mock";
import { useCompare } from "../context/CompareContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  
  const purpose = searchParams.get("purpose") || "Buy";
  const query = searchParams.get("q") || "";
  
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [propertyType, setPropertyType] = useState("");
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubscribe = async () => {
    if (isSubscribed) return;
    try {
      await addDoc(collection(db, "alerts"), {
        query,
        purpose,
        minPrice,
        maxPrice,
        beds,
        propertyType,
        createdAt: serverTimestamp()
      });
      setIsSubscribed(true);
      setToastMsg("Successfully subscribed! You'll be notified of new properties matching your search.");
      setTimeout(() => setToastMsg(""), 5000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setToastMsg("Failed to subscribe. Please try again later.");
      setTimeout(() => setToastMsg(""), 5000);
    }
  };

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(p => {
      if (p.purpose !== purpose) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.address.city.toLowerCase().includes(query.toLowerCase())) return false;
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (beds && p.features.beds < parseInt(beds)) return false;
      if (propertyType && p.type !== propertyType) return false;
      return true;
    });
  }, [purpose, query, minPrice, maxPrice, beds, propertyType]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set("q", e.target.value);
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Search Header */}
      <div className="border-b bg-white p-4 sticky top-16 z-30 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="City, Neighborhood, or Zip"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'}`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2 rounded-lg border bg-gray-100 p-1">
            <button 
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <List className="h-4 w-4" />
              List
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <MapIcon className="h-4 w-4" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-start gap-6 p-4 sm:p-6 lg:p-8">
        
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="hidden w-64 flex-shrink-0 flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex sticky top-40">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
                <span className="text-gray-500">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Property Type</h3>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Any Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Bedrooms</h3>
              <div className="flex gap-2">
                {["Any", "1+", "2+", "3+", "4+"].map((num, i) => {
                  const val = i === 0 ? "" : i.toString();
                  return (
                    <button 
                      key={num}
                      onClick={() => setBeds(val)}
                      className={`flex-1 rounded-md border py-2 text-xs font-medium transition-colors ${beds === val ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setBeds("");
                setPropertyType("");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className={`flex-1 transition-all ${viewMode === 'map' ? 'hidden md:block' : ''}`}>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties for {purpose}
              </h1>
              {query && <p className="text-gray-500 mt-1">in "{query}"</p>}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSubscribe}
                disabled={isSubscribed}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border shadow-sm ${isSubscribed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 text-blue-600" />
                    Alert Me
                  </>
                )}
              </button>
              <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {toastMsg && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
              {toastMsg}
            </div>
          )}

          <motion.div layout className={`grid gap-6 ${viewMode === 'list' ? (showFilters ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3') : 'grid-cols-1 sm:grid-cols-2'}`}>
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? filteredProperties.map((property) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
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
                  {property.verified && (
                    <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      Verified
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (compareList.some(p => p.id === property.id)) {
                        removeFromCompare(property.id);
                      } else {
                        addToCompare(property);
                      }
                    }}
                    className={`absolute right-4 top-4 rounded-full p-2 text-white shadow transition-colors backdrop-blur-md ${compareList.some(p => p.id === property.id) ? 'bg-blue-600' : 'bg-black/50 hover:bg-blue-600'}`}
                  >
                    <Scale className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-2xl font-bold text-gray-900 tracking-tight">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                    {property.purpose === "Rent" && <span className="text-sm font-normal text-gray-500"> /mo</span>}
                  </div>
                  <h3 className="mb-1 line-clamp-1 font-semibold text-gray-800 text-lg">{property.title}</h3>
                  <p className="mb-4 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{property.address.city}, {property.address.state}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900">{property.features.beds}</span> bds
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900">{property.features.baths}</span> ba
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900">{new Intl.NumberFormat().format(property.features.sqft)}</span> sqft
                      </div>
                    </div>
                  </div>
                </div>
                </motion.div>
              )) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="col-span-full py-20 text-center"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
                    <SearchIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => {
                      setMinPrice(""); setMaxPrice(""); setBeds(""); setPropertyType("");
                      setSearchParams(new URLSearchParams());
                    }}
                    className="mt-6 text-blue-600 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Map View Placeholder */}
        {viewMode === 'map' && (
          <div className="sticky top-[140px] hidden h-[calc(100vh-160px)] w-full overflow-hidden rounded-2xl bg-gray-200 md:block lg:w-[45%]">
            <div className="flex h-full items-center justify-center text-gray-500">
              <div className="text-center">
                <MapIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p className="text-lg font-medium">Interactive Map View</p>
                <p className="text-sm">Google Maps integration goes here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

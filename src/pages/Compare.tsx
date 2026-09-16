import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { X, Check } from "lucide-react";

export function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 text-3xl font-bold">VS</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No properties to compare</h2>
          <p className="text-gray-500 mb-8">Add properties to your compare list to see their features side-by-side.</p>
          <Link to="/search" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors inline-block">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  // Pre-define amenities to check against
  const allAmenitiesSet = new Set<string>();
  compareList.forEach(p => p.amenities.forEach(a => allAmenitiesSet.add(a)));
  const allAmenities = Array.from(allAmenitiesSet).sort();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Compare Properties</h1>
            <p className="mt-2 text-gray-500">Side-by-side comparison of {compareList.length} {compareList.length === 1 ? 'property' : 'properties'}</p>
          </div>
          <button 
            onClick={clearCompare}
            className="text-red-600 font-medium hover:text-red-800 text-sm"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-6 border-b border-r w-48 bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Features</span>
                </th>
                {compareList.map(property => (
                  <th key={property.id} className="p-6 border-b relative min-w-[250px] align-top">
                    <button 
                      onClick={() => removeFromCompare(property.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                    </div>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 text-lg mb-2">{property.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{property.address.city}, {property.address.state}</p>
                    <Link to={`/property/${property.id}`} className="block w-full text-center bg-blue-50 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                      View Details
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Property Type</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{p.type}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Purpose</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{p.purpose}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Bedrooms</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{p.features.beds}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Bathrooms</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{p.features.baths}</td>)}
              </tr>
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Square Footage</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{new Intl.NumberFormat().format(p.features.sqft)} sqft</td>)}
              </tr>
              <tr>
                <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-900">Year Built</td>
                {compareList.map(p => <td key={p.id} className="p-4 text-gray-700">{p.features.yearBuilt}</td>)}
              </tr>
              
              {/* Amenities Section */}
              <tr>
                <td colSpan={compareList.length + 1} className="p-4 bg-gray-100 font-bold text-gray-900 uppercase tracking-wider text-xs">
                  Amenities
                </td>
              </tr>
              {allAmenities.map(amenity => (
                <tr key={amenity}>
                  <td className="p-4 border-r bg-gray-50/50 font-medium text-gray-700">{amenity}</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 text-center">
                      {p.amenities.includes(amenity) ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Building, Search, User, Menu, Heart, Scale } from "lucide-react";
import { useCompare } from "../../context/CompareContext";

export function Navbar() {
  const { compareList } = useCompare();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Homestead</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/search?purpose=Buy" className="text-sm font-medium text-gray-700 hover:text-blue-600">Buy</Link>
          <Link to="/search?purpose=Rent" className="text-sm font-medium text-gray-700 hover:text-blue-600">Rent</Link>
          <Link to="/list" className="text-sm font-medium text-gray-700 hover:text-blue-600">List Property</Link>
          <Link to="/agents" className="text-sm font-medium text-gray-700 hover:text-blue-600">Find Agent</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/consultation" className="hidden sm:inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
            Book Consultation
          </Link>
          <div className="hidden sm:block h-6 w-px bg-gray-200"></div>
          <Link to="/compare" className="relative hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
            <Scale className="h-5 w-5" />
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {compareList.length}
              </span>
            )}
          </Link>
          <Link to="/saved" className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
            <Heart className="h-5 w-5" />
            <span>Saved</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Log in</span>
          </Link>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}

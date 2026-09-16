import { Building } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Building className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Homestead</span>
            </Link>
            <p className="text-sm text-gray-500">
              Your premium real estate destination. Find, buy, or rent your perfect home today.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link to="/search" className="hover:text-blue-600">Properties for Sale</Link></li>
              <li><Link to="/search?purpose=Rent" className="hover:text-blue-600">Properties for Rent</Link></li>
              <li><Link to="/agents" className="hover:text-blue-600">Find an Agent</Link></li>
              <li><Link to="/guides" className="hover:text-blue-600">Neighborhood Guides</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">For Professionals</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link to="/list" className="hover:text-blue-600">List Your Property</Link></li>
              <li><Link to="/agent-dashboard" className="hover:text-blue-600">Agent Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Homestead Real Estate. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

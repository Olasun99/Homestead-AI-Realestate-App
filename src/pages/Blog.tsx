import { useState } from "react";
import { Search, ChevronRight, Clock, User } from "lucide-react";

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Buying Tips", "Selling Guides", "Home Decor", "Legal & Tax"];

  const posts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers in 2026",
      excerpt: "Navigating the real estate market can be tricky. Here are our top tips to make your first purchase a success.",
      category: "Buying Tips",
      author: "Sarah Jenkins",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "How to Increase Your Property Value Before Selling",
      excerpt: "Simple renovations and staging tricks that can add thousands of dollars to your home's asking price.",
      category: "Selling Guides",
      author: "Michael Chen",
      date: "Oct 05, 2026",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Understanding Property Taxes and Deductions",
      excerpt: "A comprehensive guide to navigating property taxes and maximizing your legal deductions this year.",
      category: "Legal & Tax",
      author: "David Ross",
      date: "Sep 28, 2026",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Modern Interior Design Trends for Small Spaces",
      excerpt: "Make the most of your apartment or condo with these space-saving and visually expanding design ideas.",
      category: "Home Decor",
      author: "Elena Rodriguez",
      date: "Sep 15, 2026",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "What to Expect in Your Real Estate Consultation",
      excerpt: "A comprehensive guide for clients on how to prepare for and maximize your first consultation with a real estate agent.",
      category: "Buying Tips",
      author: "Sarah Jenkins",
      date: "Nov 02, 2026",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "The Core Principles of Real Estate Investment",
      excerpt: "Learn the foundational rules of investing in real estate, from cash flow analysis to long-term appreciation strategies.",
      category: "Buying Tips",
      author: "David Ross",
      date: "Dec 10, 2026",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=400&fit=crop"
    }
  ];

  const filteredPosts = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-blue-900 py-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Resource Center & Insights</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">Expert advice, market trends, and guides to help you navigate your real estate journey.</p>
        
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-blue-800 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest market updates and property alerts delivered to your inbox.</p>
              <form className="flex flex-col gap-3">
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                <button type="button" className="w-full bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition-colors">Subscribe</button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Trending Topics</h3>
              <ul className="space-y-3">
                {["Lagos Real Estate Boom", "Mortgage Rates 2026", "Investing in Commercial Spaces", "Smart Homes Guide"].map(topic => (
                  <li key={topic}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 group">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

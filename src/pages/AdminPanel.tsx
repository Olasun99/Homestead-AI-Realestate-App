import { useState } from "react";
import { BarChart3, Users, FileText, Settings, ShieldAlert, CheckCircle2, Edit3, Trash2 } from "lucide-react";
import { mockProperties } from "../data/mock";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
            Admin Portal
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
          >
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'listings' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> Manage Listings
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Users & Agents
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
          >
            <Edit3 className="w-5 h-5" /> Blog / CMS
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" /> Site Settings
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab.replace("-", " ")}</h1>
          <p className="text-gray-500 mt-1">Manage platform operations and content.</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm border-l-4 border-l-blue-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                <div className="text-3xl font-bold text-gray-900">12,405</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm border-l-4 border-l-green-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Active Listings</p>
                <div className="text-3xl font-bold text-gray-900">8,192</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm border-l-4 border-l-purple-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Verified Agents</p>
                <div className="text-3xl font-bold text-gray-900">342</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm border-l-4 border-l-orange-500">
                <p className="text-sm font-medium text-gray-500 mb-1">Pending Approvals</p>
                <div className="text-3xl font-bold text-gray-900">14</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mt-8">
              <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">Recent Platform Activity</h3>
              </div>
              <div className="divide-y">
                {[
                  { text: "Sarah Jenkins listed a new property in Los Angeles", time: "2 hours ago" },
                  { text: "New user registration: john.doe@example.com", time: "5 hours ago" },
                  { text: "Agent verification approved for Michael Chen", time: "1 day ago" },
                  { text: "Property 'Luxury Downtown Penthouse' marked as sold", time: "1 day ago" }
                ].map((log, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{log.text}</p>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">All Listings</h3>
                <div className="flex gap-4">
                  <input type="text" placeholder="Search ID or Title..." className="border rounded-lg px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-blue-500" />
                  <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">Add Listing</button>
                </div>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">Property Details</th>
                    <th className="px-6 py-3 font-medium">Agent</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockProperties.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <div className="font-semibold text-gray-900">{p.title}</div>
                            <div className="text-xs text-gray-500">{p.address.city}, {p.address.state}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={p.agent.photoUrl} alt="" className="w-6 h-6 rounded-full" />
                          <span className="text-gray-700">{p.agent.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${p.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {p.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {!p.verified && <button className="text-green-600 hover:text-green-800" title="Verify"><CheckCircle2 className="w-4 h-4" /></button>}
                          <button className="text-blue-600 hover:text-blue-800" title="Edit"><Edit3 className="w-4 h-4" /></button>
                          <button className="text-red-600 hover:text-red-800" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">Manage Users & Agents</h3>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">Add User</button>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm">Select a user to edit their profile, role, trust badges, and permissions.</p>
                <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map(u => (
                    <div key={u} className="border rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">User {u}</h4>
                        <p className="text-xs text-gray-500">Agent • Verified</p>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-900">Content Management (CMS)</h3>
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700">New Post</button>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Blog Posts</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map(p => (
                    <div key={p} className="flex justify-between items-center p-4 border rounded-xl">
                      <div>
                        <h5 className="font-medium text-gray-900">10 Tips for First-Time Home Buyers {p}</h5>
                        <p className="text-xs text-gray-500 mt-1">Published • Oct 12, 2026</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium border rounded-lg hover:bg-gray-50">Edit</button>
                        <button className="px-3 py-1.5 text-sm font-medium border border-red-200 text-red-600 rounded-lg hover:bg-red-50">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Site Customization</h3>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title Text</label>
                <input type="text" defaultValue="Find Your Dream Home" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <textarea rows={3} defaultValue="Discover premium properties and verified agents tailored to your lifestyle." className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input type="email" defaultValue="support@homestead.example.com" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Users, Home, Settings, Bell, Search, Mail, Phone, Calendar } from "lucide-react";
import { mockProperties } from "../data/mock";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { LeadCaptureForm } from "../components/LeadCaptureForm";

export function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch leads
    const leadsQ = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribeLeads = onSnapshot(leadsQ, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch consultations
    const consQ = query(collection(db, "consultations"), orderBy("createdAt", "desc"));
    const unsubscribeCons = onSnapshot(consQ, (snapshot) => {
      setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeLeads();
      unsubscribeCons();
    };
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" 
              className="w-10 h-10 rounded-full object-cover"
              alt="Agent" 
            />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Sarah Jenkins</h3>
              <p className="text-xs text-gray-500">Premium Agent</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <BarChart3 className="w-5 h-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'listings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Home className="w-5 h-5" /> My Listings
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'leads' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Users className="w-5 h-5" /> Leads & CRM
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-50"></span>
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Active Listings</p>
                <div className="text-3xl font-bold text-gray-900">12</div>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">↑ 2 this month</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">New Leads</p>
                <div className="text-3xl font-bold text-gray-900">48</div>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">↑ 12% vs last month</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Profile Views</p>
                <div className="text-3xl font-bold text-gray-900">2,405</div>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">↑ 4% vs last month</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">Recent Leads</h3>
              </div>
              <div className="divide-y">
                {leads.length > 0 ? leads.slice(0, 5).map((lead, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">Interested in {lead.interest}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">{lead.status}</span>
                  </div>
                )) : (
                  <div className="px-6 py-4 text-gray-500 text-sm">No recent leads.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">All Leads</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Contact</th>
                        <th className="px-6 py-3 font-medium">Interest</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-1 text-gray-600"><Mail className="w-3 h-3" /> {lead.email}</span>
                              <span className="flex items-center gap-1 text-gray-600"><Phone className="w-3 h-3" /> {lead.phone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">{lead.interest}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">{lead.status}</span>
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No leads found yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">Consultation Requests</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Client</th>
                        <th className="px-6 py-3 font-medium">Date & Time</th>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {consultations.map(cons => (
                        <tr key={cons.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {cons.name}
                            <div className="text-xs text-gray-500 font-normal mt-0.5">{cons.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-gray-700">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              {cons.date} at {cons.time}
                            </div>
                          </td>
                          <td className="px-6 py-4">{cons.consultationType}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">{cons.status}</span>
                          </td>
                        </tr>
                      ))}
                      {consultations.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No consultation requests.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-blue-900 mb-2">Lead Capture Preview</h3>
                    <p className="text-sm text-blue-800 mb-4">This form can be embedded on external sites or landing pages to send leads directly to your CRM.</p>
                  </div>
                  <LeadCaptureForm />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">My Properties</h3>
                <Link to="/list" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Add New</Link>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Property</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Price</th>
                    <th className="px-6 py-3 font-medium">Views</th>
                    <th className="px-6 py-3 font-medium">Leads</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockProperties.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-12 h-12 rounded object-cover" />
                          <div className="font-medium text-gray-900">{p.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">{p.status}</span>
                      </td>
                      <td className="px-6 py-4">{new Intl.NumberFormat('en-US', { style: 'currency', currency: p.currency, maximumFractionDigits: 0 }).format(p.price)}</td>
                      <td className="px-6 py-4">1,204</td>
                      <td className="px-6 py-4">14</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        )}
        
      </main>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { PropertyDetailPage } from "./pages/PropertyDetail";
import { AgentDashboard } from "./pages/AgentDashboard";
import { BlogPage } from "./pages/Blog";
import { AdminPanel } from "./pages/AdminPanel";
import { ConsultationPage } from "./pages/Consultation";
import { ComparePage } from "./pages/Compare";
import { CompareProvider } from "./context/CompareContext";
import { ChatWidget } from "./components/ChatWidget";

export default function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/agent-dashboard" element={<AgentDashboard />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="/compare" element={<ComparePage />} />
              {/* Fallback for other pages */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h1>
                  <p className="text-gray-500">This page is under construction.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </BrowserRouter>
    </CompareProvider>
  );
}

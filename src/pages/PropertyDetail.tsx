import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Share, Phone, Mail, FileText, ChevronRight, Check, User as UserIcon, Play, Image as ImageIcon, Scale, ShieldCheck } from "lucide-react";
import { mockProperties } from "../data/mock";
import { initAuth, googleSignIn, getAccessToken } from "../lib/auth";
import type { User } from "firebase/auth";
import { ContactAgentForm } from "../components/ContactAgentForm";
import { ImageGallery } from "../components/ImageGallery";
import { FAQAccordion } from "../components/FAQAccordion";
import { useCompare } from "../context/CompareContext";
import virtualTourPlaceholder from "../assets/images/virtual_tour_placeholder_1782773457043.jpg";

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find(p => p.id === id) || mockProperties[0];
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [brochureUrl, setBrochureUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const [activeMediaTab, setActiveMediaTab] = useState<"photos" | "3dtour">("photos");

  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const isCompared = compareList.some(p => p.id === property.id);

  const toggleCompare = () => {
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (authUser) => {
        setUser(authUser);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        // Automatically try to generate brochure after login if they clicked the button
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGenerateBrochure = async () => {
    if (needsAuth) {
      await handleLogin();
      return;
    }
    setIsGenerating(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        alert("Authentication required. Please sign in again.");
        setNeedsAuth(true);
        return;
      }
      
      const response = await fetch('/api/generate-brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property, accessToken: token })
      });
      if (response.ok) {
        const data = await response.json();
        setBrochureUrl(data.presentationUrl);
        setPdfUrl(data.pdfDownloadUrl);
      } else {
        alert('Failed to generate brochure.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Action Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button className="text-sm font-medium text-gray-500 flex items-center hover:text-gray-900">
            &larr; Back to search
          </button>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              <Share className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={toggleCompare}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isCompared ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              <Scale className="w-4 h-4" /> {isCompared ? 'Comparing' : 'Compare'}
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600">
              <Heart className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery & 3D Tour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => setActiveMediaTab("photos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeMediaTab === "photos" ? 'bg-gray-900 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
          >
            <ImageIcon className="w-4 h-4" /> Photos
          </button>
          {property.virtualTourUrl && (
            <button 
              onClick={() => setActiveMediaTab("3dtour")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeMediaTab === "3dtour" ? 'bg-gray-900 text-white' : 'bg-white border text-gray-700 hover:bg-gray-100'}`}
            >
              <Play className="w-4 h-4" /> 3D Tour
            </button>
          )}
        </div>

        {activeMediaTab === "photos" ? (
          <ImageGallery images={property.images} />
        ) : (
          <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden bg-black relative">
            {property.virtualTourUrl ? (
              <iframe 
                src={property.virtualTourUrl} 
                frameBorder="0" 
                allowFullScreen 
                allow="vr" 
                className="w-full h-full"
                title="3D Virtual Tour"
              ></iframe>
            ) : (
              <div className="relative w-full h-full">
                <img src={virtualTourPlaceholder} alt="Virtual Tour Placeholder" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">3D Virtual Tour Coming Soon</h3>
                  <p className="text-gray-200 max-w-md">Our team is currently capturing the interactive 3D experience for this property. Check back shortly.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
                  {property.status}
                </span>
                <span className="text-sm font-medium text-gray-500">{property.type} for {property.purpose}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-lg text-gray-500">{property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}</p>
            </div>
            <div className="mt-4 sm:mt-0 text-3xl font-bold text-gray-900">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
            </div>
          </div>

          <div className="flex gap-8 py-6 border-y mb-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{property.features.beds}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Beds</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{property.features.baths}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Baths</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{new Intl.NumberFormat().format(property.features.sqft)}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Sq Ft</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{property.features.yearBuilt}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wide">Built</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this home</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-blue-600" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-10">
            <FAQAccordion property={property} />
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Journey to Ownership</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-bold text-sm">1</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900">Virtual & Physical Tour</h3>
                  <p className="text-sm text-gray-500 mt-1">Explore the property through our 3D tour or schedule a physical viewing to see it in person.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-bold text-sm">2</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900">Contact the Agent</h3>
                  <p className="text-sm text-gray-500 mt-1">Submit your details to express interest. Our verified agents will guide you through the process.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-bold text-sm">3</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900">Make an Offer & Negotiate</h3>
                  <p className="text-sm text-gray-500 mt-1">Work with your agent to make a competitive offer and negotiate terms directly.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="font-bold text-sm">4</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-900">Closing & Handover</h3>
                  <p className="text-sm text-gray-500 mt-1">Complete the legal paperwork, finalize payment, and get the keys to your new property.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-10 p-6 bg-white border rounded-2xl shadow-sm">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Brochure</h2>
                <p className="text-gray-500">Generate a beautiful, ready-to-present Google Slides brochure for this property instantly using Gemini.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {brochureUrl ? (
                  <>
                    <a href={brochureUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                      <FileText className="w-5 h-5" />
                      Open Slides
                    </a>
                    {pdfUrl && (
                      <a href={pdfUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
                        <FileText className="w-5 h-5" />
                        Download PDF
                      </a>
                    )}
                  </>
                ) : (
                  <button 
                    onClick={handleGenerateBrochure}
                    disabled={isGenerating || isLoggingIn}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                  >
                    {needsAuth ? (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        Sign in to Generate
                      </>
                    ) : isGenerating ? (
                      <>Generating Brochure...</>
                    ) : (
                      <><FileText className="w-5 h-5" /> Generate Google Slides</>
                    )}
                  </button>
                )}
                {!needsAuth && user && (
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <img src={user.photoURL || ""} className="w-6 h-6 rounded-full" alt="User avatar" />
                    Signed in as {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:w-96 relative">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <img src={property.agent.photoUrl} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {property.agent.name}
                  {property.agent.trustBadge && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {property.agent.trustBadge}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{property.agent.company}</p>
                <div className="flex items-center gap-1 mt-1 text-sm font-medium text-yellow-600">
                  ★ {property.agent.rating} ({property.agent.reviewsCount} reviews)
                </div>
              </div>
            </div>
            
            <ContactAgentForm propertyId={property.id} agentName={property.agent.name} />
            
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5" /> Call
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 font-semibold py-3 rounded-lg hover:bg-green-100 transition-colors">
                <Mail className="w-5 h-5" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

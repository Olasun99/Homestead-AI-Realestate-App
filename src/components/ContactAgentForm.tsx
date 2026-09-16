import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export function ContactAgentForm({ propertyId, agentName }: { propertyId: string, agentName: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I am interested in this property..."
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        propertyId,
        agentName,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error("Error adding document: ", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center border border-green-200">
        <h4 className="font-bold mb-2">Message Sent!</h4>
        <p className="text-sm">Thank you for your interest. {agentName} will contact you shortly.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-green-700 font-medium underline text-sm hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <input 
        type="text" 
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Your Name" 
        className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      />
      <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Your Email" 
        className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      />
      <input 
        type="tel" 
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        placeholder="Your Phone" 
        className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
      />
      <textarea 
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="I am interested in this property..." 
        rows={3} 
        className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
      ></textarea>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          "Contact Agent"
        )}
      </button>
    </form>
  );
}

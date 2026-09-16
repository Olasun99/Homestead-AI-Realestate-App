import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Property } from '../types';

export function FAQAccordion({ property }: { property: Property }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isPetFriendly = property.amenities.some(a => a.toLowerCase().includes('pet') || a.toLowerCase().includes('dog') || a.toLowerCase().includes('cat'));
  const hasParking = property.amenities.some(a => a.toLowerCase().includes('park') || a.toLowerCase().includes('garage'));

  const faqs = [
    {
      question: "Are pets allowed in this property?",
      answer: isPetFriendly 
        ? "Yes, this property has pet-friendly amenities!" 
        : "Please contact the agent for specific pet policies regarding this property, as it may depend on the owner's discretion."
    },
    {
      question: "What are the typical HOA fees for this area?",
      answer: "HOA fees vary by community and specific property rules. Please contact the agent to get the most up-to-date fee schedule and understand exactly what is covered."
    },
    {
      question: "Is there parking available?",
      answer: hasParking 
        ? "Yes, parking facilities are included with this property." 
        : "Dedicated parking is not explicitly listed. Street parking or alternative arrangements may be available. Please verify with the agent."
    },
    {
      question: "When was this property built?",
      answer: `This property was built in ${property.features.yearBuilt}.`
    },
    {
      question: "How do I schedule a viewing?",
      answer: "You can schedule a viewing by filling out the 'Contact Agent' form on this page or by clicking 'Book Consultation' in the top menu to set up a dedicated time to discuss this and other properties."
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <span className="font-semibold text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="p-5 bg-gray-50 border-t text-gray-600 leading-relaxed text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

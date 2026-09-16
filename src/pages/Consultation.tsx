import React, { useState } from "react";
import { Calendar, Clock, Video, User, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "Buying",
    date: "",
    time: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableTimes = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const nextStep = () => {
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, "consultations"), {
        ...formData,
        status: "Pending",
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setStep(3);
    } catch (err) {
      console.error("Error booking consultation:", err);
      setError("Failed to book consultation. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Book a Consultation</h1>
          <p className="mt-4 text-lg text-gray-600">Schedule a personalized session with our expert real estate advisors to discuss your goals.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-10 relative overflow-hidden">
          {/* Progress Indicator */}
          {!isSuccess && (
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
              <div className={`absolute left-0 top-1/2 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: step === 1 ? '0%' : '100%' }}></div>
              
              <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className="text-xs font-semibold">Select Time</span>
              </div>
              <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className="text-xs font-semibold">Your Details</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" /> Consultation Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Buying", "Selling", "Investing"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData(prev => ({ ...prev, consultationType: type }))}
                      className={`py-3 px-4 rounded-xl border font-medium transition-colors ${formData.consultationType === type ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" /> Select Date
                </h3>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Available Times
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-3 px-4 rounded-xl border font-medium text-sm transition-colors ${formData.time === time ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t flex justify-end">
                <button 
                  onClick={nextStep}
                  disabled={!formData.date || !formData.time}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div>
                  <p className="text-sm text-blue-800 font-medium">{formData.consultationType} Consultation</p>
                  <p className="text-lg font-bold text-blue-900">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {formData.time}</p>
                </div>
                <button type="button" onClick={prevStep} className="text-blue-600 text-sm font-semibold hover:underline">Change</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes (Optional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Tell us a bit about what you're looking for..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-6 border-t flex justify-between items-center">
                <button 
                  type="button"
                  onClick={prevStep}
                  className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-4 py-2"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Your consultation has been successfully scheduled for <strong>{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at <strong>{formData.time}</strong>. We've sent a confirmation email with a calendar invite and video call link.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto flex flex-col gap-4 text-left border">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Your Agent: Sarah Jenkins</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Google Meet Video Call</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">Support: +1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

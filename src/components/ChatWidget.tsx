import React, { useState } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "Hi there! How can we help you find your perfect home today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput("");
    
    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for reaching out! One of our agents will be with you shortly.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-transform transform hover:scale-105 z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Agent Support</h4>
              <p className="text-xs text-gray-300">Typically replies in minutes</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t rounded-b-2xl flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50" disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}

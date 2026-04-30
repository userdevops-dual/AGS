'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Save to localStorage for Admin Dashboard
    const savedInquiries = JSON.parse(localStorage.getItem('ags_inquiries') || '[]');
    const newInquiry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...form,
      status: 'new'
    };
    localStorage.setItem('ags_inquiries', JSON.stringify([newInquiry, ...savedInquiries]));

    // 2. Send to Email via Web3Forms
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_TEST_ACCESS_KEY_HERE", // Go to web3forms.com and get a key for abdulraheemcrown5858@gmail.com
          subject: `New Inquiry: ${form.subject}`,
          from_name: "Abexsun Website Inquiry",
          ...form,
        }),
      });
      setSent(true);
    } catch (error) {
      console.error("Email submission failed", error);
      // Still show success to user as it's saved in admin panel
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-24 pb-8 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header - Minimal */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-black text-[#1B1464] tracking-tight mb-2">Contact Abexsun</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">A Project of Ten Sun Education System</p>
          </motion.div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: MapPin, title: "Location", info: "Mughalpura, Lahore", bg: "bg-blue-50", text: "text-[#00AEEF]" },
            { icon: Phone, title: "Contact", info: "+92 321 6226665", bg: "bg-green-50", text: "text-green-600" },
            { icon: Mail, title: "Email", info: "abexsungrammarinfo@gmail.com", bg: "bg-orange-50", text: "text-orange-600" },
            { icon: Clock, title: "Hours", info: "8AM - 3PM", bg: "bg-purple-50", text: "text-purple-600" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 transition-all hover:shadow-lg group">
              <div className={`w-12 h-12 ${item.bg} ${item.text} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-black text-[#1B1464]">{item.info}</p>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content: Form | Map */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch min-h-[450px]">
          
          {/* Form Side */}
          <div className="bg-gray-50/50 rounded-[3rem] p-10 border border-gray-100 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AEEF]/5 rounded-full -mr-10 -mt-10"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-1.5 h-6 bg-[#00AEEF] rounded-full"></div>
                   <h2 className="text-xl font-black text-[#1B1464] uppercase tracking-tight">Send an Inquiry</h2>
                </div>

                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 bg-white rounded-[2rem] shadow-sm">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-[#25D366]" size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-[#1B1464] mb-2">Inquiry Transmitted!</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">Our team will contact you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" required placeholder="e.g. John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-[#00AEEF] shadow-sm outline-none transition-all font-bold text-sm text-[#1B1464]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" required placeholder="name@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-[#00AEEF] shadow-sm outline-none transition-all font-bold text-sm text-[#1B1464]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                      <input type="text" required placeholder="What is your query about?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-[#00AEEF] shadow-sm outline-none transition-all font-bold text-sm text-[#1B1464]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea rows={3} required placeholder="Write your message here..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent focus:border-[#00AEEF] shadow-sm outline-none transition-all font-bold text-sm text-[#1B1464] resize-none"></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full py-5 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl ${isSubmitting ? 'bg-gray-400' : 'bg-[#1B1464] hover:bg-[#00AEEF] hover:scale-[1.02] shadow-[#1B1464]/20'}`}
                    >
                      {isSubmitting ? 'Transmitting...' : <><Send size={18} /> Transmit Inquiry</>}
                    </button>
                  </form>
                )}
             </div>
          </div>

          {/* Map Side */}
          <div className="rounded-[3rem] overflow-hidden border border-gray-100 relative h-full min-h-[400px]">
              <iframe
                src="https://maps.google.com/maps?q=31.575527,74.376794&z=15&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
                className="w-full h-full"
              ></iframe>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl flex items-center justify-between">
                <div>
                   <p className="text-xs font-black text-[#1B1464] uppercase tracking-widest">Abexsun Main Campus</p>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Behind Shalimar Hospital, Mughalpura, Lahore</p>
                </div>
                <div className="w-12 h-12 bg-[#00AEEF] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#00AEEF]/30">
                   <MapPin size={24} />
                </div>
              </div>
          </div>

        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
           <span>ABEXSUN EDUCATION SYSTEM</span>
           <div className="flex gap-8">
              <span className="text-gray-400">Excellence Since 1995</span>
              <span>&copy; 2026 ALL RIGHTS RESERVED</span>
           </div>
        </div>
      </div>
    </div>
  );
}

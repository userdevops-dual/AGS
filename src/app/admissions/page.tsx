'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, FileText, User, Mail, Phone, Calendar, MapPin, School, GraduationCap } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '', parentName: '', email: '', phone: '', classApplying: '',
    dob: '', gender: '', previousSchool: '', address: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_TEST_ACCESS_KEY_HERE", // Go to web3forms.com and get a key for abdulraheemcrown5858@gmail.com
          subject: `New Admission Application: ${formData.studentName}`,
          from_name: "Abexsun School Website",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-[#1B1464] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-white/20 backdrop-blur-md">
              Admissions Open 2026
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">Join Our Legacy</h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium">Start your child's journey towards excellence with Abexsun Education System.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Left Side: Info & Process */}
              <div className="lg:col-span-1 space-y-10">
                <div>
                  <h3 className="text-2xl font-black text-[#1B1464] uppercase tracking-tight mb-6">The Process</h3>
                  <div className="space-y-8">
                    {[
                      { step: "01", title: "Apply Online", desc: "Complete the digital application form." },
                      { step: "02", title: "Verification", desc: "Submit required documents for review." },
                      { step: "03", title: "Assessment", desc: "Student placement evaluation." },
                      { step: "04", title: "Confirmation", desc: "Finalize enrollment and fee payment." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 bg-gray-50 text-[#1B1464] rounded-2xl flex items-center justify-center font-black text-lg border border-gray-100 group-hover:bg-[#00AEEF] group-hover:text-white transition-all shadow-sm">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-black text-[#1B1464] uppercase tracking-wide text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                  <h3 className="text-xl font-black text-[#1B1464] uppercase tracking-tight mb-4 flex items-center gap-2">
                    <FileText className="text-[#00AEEF]" size={24} /> Documents
                  </h3>
                  <ul className="space-y-3">
                    {["Birth Certificate", "Previous School Record", "Passport Size Photos", "Parent CNIC Copy"].map((doc, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-600">
                        <CheckCircle size={14} className="text-green-500" /> {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(27,20,100,0.1)] border border-gray-100">
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-[#25D366]" size={48} />
                      </div>
                      <h2 className="text-4xl font-black text-[#1B1464] mb-4">Application Received</h2>
                      <p className="text-gray-500 font-medium text-lg">Thank you for choosing Abexsun. Our admissions officer will contact you within 48 hours.</p>
                      <button onClick={() => window.location.reload()} className="mt-10 px-8 py-3 bg-[#1B1464] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#00AEEF] transition-all">Submit Another</button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-10">
                        <h2 className="text-3xl font-black text-[#1B1464] uppercase tracking-tighter mb-2">Admission Form</h2>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Enrollment for Session 2026-27</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Student Info Section */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                            <User size={18} className="text-[#00AEEF]" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Student Information</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Student Full Name *</label>
                              <input type="text" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Class Applying For *</label>
                              <select required value={formData.classApplying} onChange={e => setFormData({...formData, classApplying: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary">
                                <option value="">Select Class</option>
                                {["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Date of Birth *</label>
                              <div className="relative">
                                <input type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Gender *</label>
                              <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Guardian Info Section */}
                        <div className="space-y-6 pt-4">
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                            <Mail size={18} className="text-[#00AEEF]" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Guardian Information</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Parent/Guardian Name *</label>
                              <input type="text" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Phone Number *</label>
                              <input type="tel" required placeholder="+92 XXX XXXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Email Address *</label>
                            <input type="email" required placeholder="parent@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                          </div>
                        </div>

                        {/* Additional Section */}
                        <div className="space-y-6 pt-4">
                          <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                            <MapPin size={18} className="text-[#00AEEF]" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Residential & History</span>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Previous School (if any)</label>
                            <input type="text" value={formData.previousSchool} onChange={e => setFormData({...formData, previousSchool: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-[#1B1464] uppercase tracking-widest ml-1">Home Address *</label>
                            <textarea rows={2} required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-gray-50/50 border-2 border-transparent focus:border-[#00AEEF] focus:bg-white outline-none transition-all font-bold text-primary resize-none"></textarea>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={`w-full py-5 text-white font-black text-sm uppercase tracking-[0.4em] rounded-[1.5rem] transition-all flex items-center justify-center gap-3 shadow-2xl ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1B1464] hover:bg-[#00AEEF] hover:scale-[1.02] shadow-[#1B1464]/20'}`}
                        >
                          {isSubmitting ? 'Transmitting...' : <><GraduationCap size={20} /> Submit Application</>}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-10 border-t border-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">Abexsun Education System &copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}

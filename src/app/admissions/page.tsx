'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, FileText, Calendar } from 'lucide-react';

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
          subject: `TESTING - New Admission Application: ${formData.studentName}`,
          from_name: "AGS Test Application",
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
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-7xl font-black text-primary mb-4 tracking-tighter">Admissions</h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium px-4">Always Be Excellent By Ten Sun Education System. A Project of AES.</p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">How It Works</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">Admission Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Submit Application", desc: "Fill out the online admission form with required details." },
              { step: "02", title: "Document Verification", desc: "Submit required documents for verification and review." },
              { step: "03", title: "Entrance Assessment", desc: "Student takes a placement test (class-appropriate)." },
              { step: "04", title: "Enrollment Confirmed", desc: "Pay fees and receive your admission confirmation letter." },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-primary mb-8 text-center">Required Documents</h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Birth Certificate", "Previous Report Cards", "Transfer Certificate",
              "Passport-size Photos (4)", "Parent's CNIC/ID Copy", "Medical Fitness Certificate",
              "Residence Proof", "Character Certificate"
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <FileText className="text-secondary flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white" id="apply">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Apply Online</h4>
              <h2 className="text-4xl font-extrabold text-primary mb-4">Admission Application Form</h2>
              <p className="text-gray-600">Fill in the details below. Our team will contact you within 48 hours.</p>
            </div>

            {submitted ? (
              <div className="text-center py-16 bg-green-50 rounded-2xl">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">Thank you for applying. We&apos;ll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Student&apos;s Full Name *</label>
                    <input type="text" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Parent/Guardian Name *</label>
                    <input type="text" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Class Applying For *</label>
                    <select required value={formData.classApplying} onChange={e => setFormData({...formData, classApplying: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary bg-white">
                      <option value="">Select Class</option>
                      {["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                    <input type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                    <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary bg-white">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Previous School</label>
                  <input type="text" value={formData.previousSchool} onChange={e => setFormData({...formData, previousSchool: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Home Address *</label>
                  <textarea rows={3} required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                  <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 text-white font-bold text-lg rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-[1.02]'}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

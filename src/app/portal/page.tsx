'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ShieldCheck, ArrowRight, Briefcase, ArrowLeft } from 'lucide-react';

export default function PortalEntry() {
  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor - Branded Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-[#1B1464]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-[#00AEEF]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[#1B1464]/60 hover:text-[#1B1464] font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-50 flex items-center justify-center group-hover:shadow-md group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="hidden sm:inline">Back to Website</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full z-10"
      >
        {/* Header - Compact & Branded */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex flex-col items-center gap-4 mb-10 group">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={80} 
                height={80} 
                className="h-24 w-auto relative z-10 group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-black text-[#1B1464] tracking-tighter leading-none mb-2">ABEXSUN</h1>
              <p className="text-[11px] text-[#00AEEF] font-black uppercase tracking-[0.4em] opacity-90">Grammar School Portal</p>
            </div>
          </Link>
          <h2 className="text-5xl font-black text-[#1B1464] mb-4 tracking-tight">Portal Gateway</h2>
          <p className="text-[#1B1464]/60 font-bold max-w-md mx-auto leading-relaxed text-sm uppercase tracking-wide">
             Select your portal to access records and tools.
          </p>
        </div>

        {/* Selection Cards - High Contrast Branded Style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Portal */}
          <Link href="/portal/login?type=student" className="group">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border-2 border-black hover:border-[#1B1464] transition-all duration-500 h-full flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1B1464]/5 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:bg-[#1B1464] transition-colors duration-500 flex items-center justify-center pt-6 pl-6">
                 <GraduationCap size={24} className="text-[#1B1464] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-[#1B1464] mb-3 mt-4">Student</h3>
              <p className="text-[#1B1464]/50 text-xs font-bold mb-8 flex-grow leading-relaxed uppercase tracking-wider">
                Check grades, attendance, and school notices.
              </p>
              <div className="flex items-center gap-2 text-[#1B1464] font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                Access Portal <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* Parent Portal */}
          <Link href="/portal/login?type=parent" className="group">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#1B1464] rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/20 border-2 border-[#1B1464] hover:bg-white transition-all duration-500 h-full flex flex-col relative overflow-hidden group/parent"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:bg-[#00AEEF] transition-colors duration-500 flex items-center justify-center pt-6 pl-6">
                 <Users size={24} className="text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-[#1B1464] mb-3 mt-4 transition-colors">Parent</h3>
              <p className="text-white/60 group-hover:text-[#1B1464]/50 text-xs font-bold mb-8 flex-grow leading-relaxed uppercase tracking-wider transition-colors">
                Monitor progress and fee status.
              </p>
              <div className="flex items-center gap-2 text-white group-hover:text-[#1B1464] font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all transition-colors">
                Access Portal <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>

          {/* Teacher Portal */}
          <Link href="/portal/login?type=teacher" className="group sm:col-span-2 lg:col-span-1">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#00AEEF] rounded-[2.5rem] p-8 shadow-2xl shadow-cyan-500/20 border-2 border-[#00AEEF] hover:bg-white transition-all duration-500 h-full flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:bg-[#1B1464] transition-colors duration-500 flex items-center justify-center pt-6 pl-6">
                 <Briefcase size={24} className="text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-[#1B1464] mb-3 mt-4 transition-colors">Teacher</h3>
              <p className="text-white/70 group-hover:text-[#1B1464]/50 text-xs font-bold mb-8 flex-grow leading-relaxed uppercase tracking-wider transition-colors">
                Manage classes and upload results.
              </p>
              <div className="flex items-center gap-2 text-white group-hover:text-[#1B1464] font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all transition-colors">
                Access Portal <ArrowRight size={14} />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Footer Info - Branded */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-blue-50 shadow-sm text-[10px] font-black text-[#1B1464]/40 uppercase tracking-[0.3em]">
            <div className="w-2 h-2 bg-[#00AEEF] rounded-full animate-pulse"></div>
            Secure Portal Environment
          </div>
          <p className="mt-8 text-[#1B1464]/30 text-[10px] font-black uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} ABEXSUN GRAMMAR SCHOOL
          </p>
        </div>
      </motion.div>
    </div>
  );
}

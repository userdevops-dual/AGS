'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, Lock, User, Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';

export default function TeacherLogin() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Mock Teacher Auth - Checking ags_staff in localStorage if exists
      const savedStaff = localStorage.getItem('ags_staff');
      const staff = savedStaff ? JSON.parse(savedStaff) : [];
      const found = staff.find((s: any) => s.staffId === id && (s.password === password || password === 'teacher123'));
      
      // Fallback for demo
      if (found || (id === 'teacher123' && password === 'teacher123')) {
        localStorage.setItem('portalAuth', JSON.stringify({
          type: 'teacher',
          id: id,
          name: found?.name || 'Staff Member',
          role: found?.role || 'Educator'
        }));
        router.push('/portal/teacher');
      } else {
        setError('Unauthorized credentials. Access denied.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1B1464]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00AEEF]/5 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-[420px] w-full z-10"
      >
        <Link 
          href="/portal" 
          className="inline-flex items-center gap-2 text-[#1B1464]/40 hover:text-[#1B1464] transition-all mb-8 font-black text-[10px] uppercase tracking-[0.3em] group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-50 flex items-center justify-center group-hover:shadow-md group-hover:-translate-x-1 transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Selection
        </Link>

        <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl shadow-blue-900/10 border border-blue-50 relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-[#1B1464]/5 text-[#1B1464] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/5">
              <Briefcase size={36} />
            </div>
            <h2 className="text-3xl font-black text-[#1B1464] mb-2 tracking-tight uppercase">Teacher Login</h2>
            <p className="text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Faculty Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1B1464]/30 uppercase tracking-[0.2em] ml-2">Staff Identifier</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1B1464]/60 group-focus-within:text-[#1B1464] transition-colors" size={20} />
                <input 
                  type="text" 
                  required 
                  value={id} 
                  onChange={e => setId(e.target.value)} 
                  placeholder="Enter Staff ID" 
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border-2 border-black outline-none focus:border-[#00AEEF] transition-all font-bold text-sm text-[#1B1464] placeholder:text-[#1B1464]/10" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1B1464]/30 uppercase tracking-[0.2em] ml-2">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1B1464]/60 group-focus-within:text-[#1B1464] transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white border-2 border-black outline-none focus:border-[#00AEEF] transition-all font-bold text-sm text-[#1B1464] placeholder:text-[#1B1464]/10" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1B1464]/20 hover:text-[#1B1464] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4.5 rounded-2xl bg-[#1B1464] text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-blue-900/20 hover:bg-[#00AEEF] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <ShieldCheck size={18} />
                  Authenticate
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-blue-50 shadow-sm text-[9px] font-black text-[#1B1464]/40 uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse"></div>
            Faculty Gateway Secure
          </div>
          <p className="text-[#1B1464]/20 text-[9px] font-black uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} ABEXSUN GRAMMAR SCHOOL
          </p>
        </div>
      </motion.div>
    </div>
  );
}

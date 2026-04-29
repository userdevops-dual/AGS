'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ArrowLeft, Mail, ShieldCheck, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@abexsun.edu' && password === 'admin123') {
        localStorage.setItem('ags_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('Verification failed. Invalid credentials.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert('Security reset link dispatched to authorized email.');
      setIsLoading(false);
      setIsForgotPassword(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1B1464]/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00AEEF]/5 rounded-full blur-[140px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] bg-white border border-blue-50 rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-blue-900/10 relative z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-4 mb-10 group">
            <div className="w-14 h-14 relative p-2 bg-[#F8FAFC] rounded-2xl border border-blue-50 group-hover:shadow-md transition-all">
              <Image src="/logo.png" alt="AGS Logo" fill className="object-contain p-1" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black text-[#1B1464] leading-none tracking-tighter uppercase">ABEXSUN</h1>
              <p className="text-[9px] text-[#00AEEF] font-black uppercase tracking-[0.3em] mt-1">Grammar School</p>
            </div>
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1B1464]/5 rounded-full text-[9px] font-black text-[#1B1464] uppercase tracking-[0.2em] mb-4">
             <ShieldCheck size={14} className="text-[#00AEEF]" />
             Administrative Gateway
          </div>
          
          <h2 className="text-3xl font-black text-[#1B1464] tracking-tight uppercase leading-none">
            {isForgotPassword ? 'Security Reset' : 'Admin Auth'}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {!isForgotPassword ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleLogin} 
              className="space-y-6"
            >
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#1B1464]/30 uppercase tracking-[0.2em] ml-2">Authorized Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#1B1464]/60 group-focus-within:text-[#1B1464] transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@abexsun.edu" 
                    className="w-full pl-14 pr-5 py-4.5 bg-white border-2 border-black rounded-2xl outline-none focus:border-[#00AEEF] transition-all font-bold text-sm text-[#1B1464] placeholder:text-[#1B1464]/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-[#1B1464]/30 uppercase tracking-[0.2em]">Secret Key</label>
                  <button 
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-[9px] font-black text-[#00AEEF] hover:text-[#1B1464] transition-all uppercase tracking-widest"
                  >
                    Lost Key?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#1B1464]/60 group-focus-within:text-[#1B1464] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-14 pr-12 py-4.5 bg-white border-2 border-black rounded-2xl outline-none focus:border-[#00AEEF] transition-all font-bold text-sm text-[#1B1464] placeholder:text-[#1B1464]/10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-[#1B1464]/20 hover:text-[#1B1464] transition-all"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-[#1B1464] text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] hover:bg-[#00AEEF] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Establish Session'}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="forgot"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleForgotPassword} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#1B1464]/30 uppercase tracking-[0.2em] ml-2">Verification Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#1B1464]/20 group-focus-within:text-[#1B1464] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter registered email" 
                    className="w-full pl-14 pr-5 py-4.5 bg-[#F8FAFC] border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1B1464] transition-all font-bold text-sm text-[#1B1464] placeholder:text-[#1B1464]/10"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-[#1B1464] text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] hover:bg-[#00AEEF] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Request Reset'}
              </button>

              <button 
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="w-full py-3 text-[10px] font-black text-[#1B1464]/40 hover:text-[#1B1464] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Return to Security
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center flex flex-col items-center gap-6"
      >
        <p className="text-[#1B1464]/20 text-[9px] font-black uppercase tracking-[0.5em]">
          Abexsun Grammar School &bull; Management Console &bull; 2026
        </p>
      </motion.div>
    </div>
  );
}

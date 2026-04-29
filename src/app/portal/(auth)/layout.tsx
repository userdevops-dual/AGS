'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PortalSidebar } from '@/components/portal/sidebar';
import { Loader2, Bell, Search, UserCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('portalAuth');
    if (!auth) {
      router.push('/portal/login');
    } else {
      setIsAuth(true);
      setUser(JSON.parse(auth));
    }
  }, [router]);

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="animate-spin text-[#1B1464]" size={40} />
          <p className="text-[10px] font-black text-[#1B1464]/40 uppercase tracking-[0.4em]">Authenticating Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F0F7FF]">
      <PortalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Compact Branded */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-blue-50 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-sm">
          <div className="hidden md:flex items-center gap-4 bg-[#F8FAFC] px-5 py-2.5 rounded-2xl border border-blue-50 w-96 transition-all focus-within:bg-white focus-within:border-[#1B1464] group shadow-inner">
            <Search size={18} className="text-[#1B1464]/20 group-focus-within:text-[#1B1464] transition-colors" />
            <input
              type="text"
              placeholder="Query portal database..."
              className="bg-transparent border-none outline-none text-[11px] font-black text-[#1B1464] w-full placeholder:text-[#1B1464]/10 uppercase tracking-widest"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 text-[#1B1464]/30 hover:text-[#1B1464] transition-all hover:bg-[#F8FAFC] rounded-xl group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white animate-pulse"></span>
            </button>

            <div className="h-8 w-[1px] bg-blue-50"></div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-black text-[#1B1464] leading-none mb-1 uppercase tracking-tight">{user?.name}</p>
                <div className="flex items-center justify-end gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#00AEEF]"></div>
                  <p className="text-[9px] text-[#1B1464]/40 font-black uppercase tracking-[0.2em]">{user?.type} Access</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#1B1464]/5 flex items-center justify-center text-[#1B1464] border border-[#1B1464]/5 shadow-sm group hover:bg-[#1B1464] hover:text-white transition-all cursor-pointer">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

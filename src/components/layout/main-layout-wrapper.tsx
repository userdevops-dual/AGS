'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import Link from 'next/link';
import Image from 'next/image';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrPortal = pathname?.startsWith('/admin') || pathname?.startsWith('/portal');

  if (isAdminOrPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-white border-t border-white/10">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <Image src="/logo.png" alt="AGS Logo" width={64} height={64} className="h-16 w-auto" />
                <div>
                  <h3 className="font-medium text-xl tracking-tight text-white">ABEXSUN</h3>
                  <p className="text-[10px] text-white/60 font-medium uppercase tracking-widest">Grammar School</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium hidden md:block">
                Always Be Excellent By Ten Sun Education System. Empowering students for a brighter future through excellence in education.
              </p>
              <div className="bg-white/10 inline-block px-4 py-2 rounded-lg">
                <p className="text-xs text-white font-black uppercase tracking-widest">A Project of AES</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-lg mb-6 text-white">Quick Links</h4>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-4 text-sm text-white/70 font-semibold">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Academics", href: "/academics" },
                  { label: "Admissions", href: "/admissions" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Contact", href: "/contact" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-secondary transition-all hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources - Hidden on Mobile */}
            <div className="hidden md:block">
              <h4 className="font-black text-lg mb-6 text-white">Resources</h4>
              <ul className="space-y-4 text-sm text-white/70 font-semibold">
                {[
                  { label: "Admission Policy", href: "/admission-policy" },
                  { label: "Downloads", href: "/downloads" },
                  { label: "Events", href: "/events" },
                  { label: "News", href: "/news" },
                  { label: "Facilities", href: "/facilities" },
                  { label: "Playground", href: "/playground" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="hover:text-secondary transition-all hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-white/70 font-semibold">
                <li className="flex items-start gap-3">📍 <span className="flex-1">Behind Shalimar Hospital, Mughalpura, Lahore</span></li>
                <li className="flex items-start gap-3">📞 <span>+92 321 6226665</span></li>
                <li className="flex items-start gap-3">📧 <span>abexsungrammarinfo@gmail.com</span></li>
                <li className="flex items-start gap-3 hidden md:flex">🕐 <span>Mon – Sat: 8:00 AM – 3:00 PM</span></li>
              </ul>
              <div className="mt-8 hidden md:block">
                <h5 className="text-sm font-black text-white mb-4 uppercase tracking-widest">Newsletter</h5>
                <div className="flex shadow-sm rounded-xl overflow-hidden border border-white/10">
                  <input type="email" placeholder="Your email" className="px-4 py-3 bg-white/10 text-white w-full outline-none text-sm font-medium placeholder:text-white/40" />
                  <button className="bg-secondary text-primary px-5 py-3 font-black text-xs hover:bg-white transition-colors whitespace-nowrap uppercase tracking-widest">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Abexsun Grammar School. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="/admission-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/admission-policy" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

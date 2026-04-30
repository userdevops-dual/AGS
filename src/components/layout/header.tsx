'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Academics", href: "/classes" },
  { label: "Admissions", href: "/admission-policy" },
  {
    label: "Campus", href: "/facilities", children: [
      { label: "Facilities", href: "/facilities" },
      { label: "Playground", href: "/playground" },
      { label: "Gallery", href: "/gallery" },
    ]
  },
  {
    label: "News", href: "/news", children: [
      { label: "Events", href: "/events" },
      { label: "Downloads", href: "/downloads" },
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-[#1B1464] border-b border-white/10 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="opacity-80">📍 Behind Shalimar Hospital, Mughalpura, Lahore | 📧 abexsungrammarinfo@gmail.com</span>
          <div className="flex items-center gap-4">
            <a href="tel:+923216226665" className="hover:text-secondary transition-colors flex items-center gap-1 font-medium opacity-90">
              <Phone size={12} /> +92 321 6226665
            </a>
            <span className="text-secondary font-medium tracking-tight">Always Be Excellent By Ten Sun Education System</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1B1464]/95 backdrop-blur-md shadow-2xl py-1 border-b border-white/10' : 'bg-[#1B1464] py-2'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Abexsun Grammar School" width={72} height={80} className="h-16 w-auto" priority />
            <div className="hidden sm:block">
              <h1 className="text-lg font-medium text-white leading-tight tracking-tight">ABEXSUN GRAMMAR SCHOOL</h1>
              <p className="text-[9px] text-secondary font-medium uppercase tracking-[0.2em]">Always Be Excellent · A Project of AES</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-all flex items-center gap-1.5 ${openDropdown === link.label ? 'bg-white/10 text-[#00AEEF]' : 'text-white/90 hover:text-white hover:bg-white/5'}`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180 text-[#00AEEF]' : 'opacity-70'}`} />}
                </Link>
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl rounded-xl py-2 min-w-[220px] z-50 mt-1 transform origin-top animate-in fade-in slide-in-from-top-2 duration-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-[14px] text-gray-600 hover:text-[#1B1464] hover:bg-[#1B1464]/5 hover:pl-6 font-medium tracking-wide transition-all duration-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/portal" className="bg-[#00AEEF] text-[#1B1464] px-6 py-3 rounded font-black text-sm transition-all duration-300 hover:bg-white hover:scale-105 flex items-center justify-center border border-[#00AEEF] shadow-lg shadow-[#00AEEF]/20">
              Portal Login
            </Link>
            <Link href="/admissions#apply" className="bg-white text-[#1B1464] px-6 py-3 rounded font-black text-sm transition-all duration-300 hover:bg-gray-100 flex items-center justify-center border border-white hover:scale-105">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white relative z-[60]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 z-50 bg-[#1B1464] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col h-full pt-16 pb-10 px-6 overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-white/5">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.label ? null : link.label)}
                        className="flex items-center justify-between w-full py-4 text-lg text-white font-bold tracking-tight hover:text-secondary transition-colors"
                      >
                        {link.label}
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileOpenDropdown === link.label ? 'rotate-180 text-secondary' : 'opacity-50'}`} />
                      </button>
                      {mobileOpenDropdown === link.label && (
                        <div className="pl-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1 text-base text-white/70 hover:text-white transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-lg text-white font-bold tracking-tight hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-4">
              <Link
                href="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-[#00AEEF] text-[#1B1464] py-3.5 rounded-xl font-black text-base shadow-xl shadow-[#00AEEF]/20"
              >
                Portal Login
              </Link>
              <Link
                href="/admissions#apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-white text-[#1B1464] py-3.5 rounded-xl font-black text-base hover:bg-gray-100"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

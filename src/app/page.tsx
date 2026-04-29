'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, BookOpen, Users, Trophy, GraduationCap, Phone, CheckCircle, Star, Calendar, Clock, Sparkles, Shield, Heart, Lightbulb, PenTool, Ruler, Calculator, Divide, Plus, FileText, Atom, Brain, Compass, Globe, Library, Microscope, Music, Palette, Pencil, Variable, Percent } from "lucide-react";

function StatCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const num = Math.round(latest);
    return value.includes('+') ? `${num.toLocaleString()}+` : num.toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[,+]/g, ''));
      const controls = animate(count, numericValue, { duration: 2.5, ease: "easeOut", delay: 0.5 });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Home() {
  const [stars, setStars] = useState<{ top: string, left: string, size: string, delay: string, duration: string }[]>([]);

  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 2}s`
    })));

    const savedNews = localStorage.getItem('ags_news');
    const savedGallery = localStorage.getItem('ags_gallery');
    if (savedNews) setNews(JSON.parse(savedNews).slice(0, 3));
    if (savedGallery) setGallery(JSON.parse(savedGallery).slice(0, 8));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-0 md:pb-0 md:min-h-[90vh] flex items-start md:items-center justify-center overflow-hidden bg-white">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-50"></div>

        {/* Floating Educational Icons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { icon: BookOpen, top: '10%', left: '5%', size: 42, delay: 0 },
            { icon: PenTool, top: '15%', left: '90%', size: 36, delay: 1 },
            { icon: Ruler, top: '80%', left: '10%', size: 38, delay: 2 },
            { icon: Calculator, top: '70%', left: '88%', size: 34, delay: 1.5 },
            { icon: Plus, top: '5%', left: '70%', size: 30, delay: 0.5 },
            { icon: Divide, top: '90%', left: '40%', size: 32, delay: 2.5 },
            { icon: GraduationCap, top: '35%', left: '8%', size: 44, delay: 3 },
            { icon: FileText, top: '12%', left: '45%', size: 28, delay: 1.2 },
            { icon: Lightbulb, top: '45%', left: '95%', size: 38, delay: 0.8 },
            { icon: Atom, top: '25%', left: '15%', size: 36, delay: 1.8 },
            { icon: Brain, top: '60%', left: '5%', size: 34, delay: 2.1 },
            { icon: Compass, top: '15%', left: '25%', size: 32, delay: 0.4 },
            { icon: Globe, top: '85%', left: '75%', size: 40, delay: 1.6 },
            { icon: Library, top: '30%', left: '85%', size: 36, delay: 2.8 },
            { icon: Microscope, top: '75%', left: '25%', size: 38, delay: 0.2 },
            { icon: Music, top: '50%', left: '12%', size: 32, delay: 1.4 },
            { icon: Palette, top: '20%', left: '75%', size: 34, delay: 3.2 },
            { icon: Pencil, top: '92%', left: '15%', size: 30, delay: 0.6 },
            { icon: Variable, top: '40%', left: '92%', size: 22, delay: 2.4 },
            { icon: Percent, top: '8%', left: '35%', size: 28, delay: 1.1 },
            { icon: Star, top: '55%', left: '82%', size: 30, delay: 2.2 },
            { icon: Sparkles, top: '65%', left: '15%', size: 28, delay: 0.9 },
            { icon: Shield, top: '18%', left: '18%', size: 34, delay: 1.7 },
            { icon: Trophy, top: '78%', left: '60%', size: 36, delay: 2.9 },
            { icon: BookOpen, top: '42%', left: '4%', size: 32, delay: 1.3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0.6, 0],
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4, 
                repeat: Infinity, 
                delay: item.delay,
                ease: "easeInOut"
              }}
              className={`absolute ${i > 10 ? 'hidden md:block' : ''}`}
              style={{ top: item.top, left: item.left, color: '#1B1464' }}
            >
              <div className="scale-75 md:scale-100 origin-center">
                <item.icon size={item.size} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full relative z-10 px-6 md:px-0">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 md:px-5 md:py-2 rounded-full bg-primary/5 text-primary font-black text-[7px] sm:text-[9px] md:text-xs mb-3 md:mb-8 tracking-[0.2em] uppercase border border-primary/10"
            >
              Admissions Open 2026-2027
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl sm:text-9xl md:text-8xl font-black text-primary mb-4 md:mb-8 leading-[1] md:leading-[1.05] tracking-tighter"
              style={{ fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif" }}
            >
              Nurturing <span className="text-secondary [-webkit-text-stroke:1px_#1B1464] md:[-webkit-text-stroke:2px_#1B1464]">Excellence</span> <br />
              In Every Student.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-2xl text-gray-500 mb-8 md:mb-12 max-w-3xl font-medium leading-relaxed px-4 md:px-0"
            >
              Abexsun Grammar School — Always Be Excellent By Ten Sun Education System.
              <span className="md:block mt-1 md:mt-2 text-primary font-bold">A Project of AES.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
            >
              <Link href="/admissions" className="group relative w-fit min-w-[200px] sm:w-auto px-5 py-2 md:px-8 md:py-3 bg-primary text-white font-bold text-sm md:text-base rounded-xl hover:bg-secondary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
                Start Your Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="w-fit min-w-[200px] sm:w-auto px-5 py-2 md:px-8 md:py-3 bg-white border border-gray-200 text-primary font-bold text-sm md:text-base rounded-xl hover:border-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                Explore Campus <Phone size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Desktop Only */}
      <section className="relative z-20 -mt-10 px-4 hidden md:block">
        <div className="container mx-auto max-w-4xl bg-white py-4 md:py-5 px-2 md:px-6 relative overflow-hidden border-t border-b border-black">
          <div className="grid grid-cols-4 gap-1 md:gap-4 text-center divide-x divide-gray-100 relative z-10">
            {[
              { icon: Users, label: "Students", value: "1,200+" },
              { icon: GraduationCap, label: "Teachers", value: "85+" },
              { icon: BookOpen, label: "Classes", value: "40+" },
              { icon: Trophy, label: "Awards", value: "150+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center px-0 sm:px-1 md:px-4">
                <div className="w-6 h-6 md:w-9 md:h-9 bg-black/5 rounded-md md:rounded-lg flex items-center justify-center text-black mb-1 md:mb-2 transform hover:scale-110 transition-all">
                  <stat.icon className="w-3 h-3 md:w-5 md:h-5" />
                </div>
                <h3 className="text-[11px] sm:text-sm md:text-2xl font-black text-black leading-none mb-0.5 md:mb-1 tracking-tight">
                  <StatCounter value={stat.value} />
                </h3>
                <p className="text-[6px] sm:text-[7px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/ags1.jpeg"
                  alt="Students studying"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-md">Excellence Since 1995</h3>
                    <p className="drop-shadow-md font-medium">Over 25 years of educational distinction.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">About Us</h4>
              <h2 className="text-4xl font-extrabold text-primary mb-6">Empowering the Next Generation of Leaders</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Abexsun Grammar School, we believe every child has unique potential. Our comprehensive curriculum, state-of-the-art facilities, and dedicated educators create an environment where students thrive academically, socially, and emotionally.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Holistic approach to education",
                  "Modern teaching methodologies",
                  "Focus on character building",
                  "Safe and inclusive environment"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="text-secondary flex-shrink-0" size={24} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-block px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg text-sm">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section - Mobile/Tablet Only (Below Empower Section) */}
      <section className="relative px-4 py-10 md:hidden bg-white">
        <div className="container mx-auto max-w-4xl bg-white py-6 px-4 relative overflow-hidden border-t border-b border-black">
          <div className="grid grid-cols-4 gap-1 text-center divide-x divide-gray-100 relative z-10">
            {[
              { icon: Users, label: "Students", value: "1,200+" },
              { icon: GraduationCap, label: "Teachers", value: "85+" },
              { icon: BookOpen, label: "Classes", value: "40+" },
              { icon: Trophy, label: "Awards", value: "150+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center px-0">
                <div className="w-8 h-8 bg-black/5 rounded-md flex items-center justify-center text-black mb-1 transform hover:scale-110 transition-all">
                  <stat.icon className="w-4 h-4" />
                </div>
                <h3 className="text-[12px] sm:text-sm font-black text-black leading-none mb-0.5 tracking-tight">
                  <StatCounter value={stat.value} />
                </h3>
                <p className="text-[6px] sm:text-[8px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Why Abexsun?</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">Why Parents Choose Us</h2>
            <p className="text-gray-600 text-lg">We go beyond academics to develop well-rounded individuals ready for the challenges of tomorrow.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Academic Excellence", desc: "Consistently top-performing school with outstanding exam results and university placements." },
              { icon: Shield, title: "Safe Environment", desc: "CCTV-monitored campus with trained security staff ensuring a safe space for every child." },
              { icon: Heart, title: "Character Building", desc: "Programs that instil values, leadership skills, and social responsibility in every student." },
              { icon: Lightbulb, title: "Innovative Learning", desc: "Smart classrooms, digital labs, and project-based learning that inspires curiosity." },
            ].map((item, i) => (
              <div key={i} className="bg-primary rounded-2xl p-8 shadow-lg cursor-default">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Our Programs</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">Academic Programs</h2>
            <p className="text-gray-600 text-lg">From early years to senior classes, we offer a structured curriculum that builds strong foundations.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Primary Section", grades: "Nursery – Class 5", desc: "Building foundational literacy, numeracy, and creative skills through play-based and structured learning.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" },
              { title: "Middle Section", grades: "Class 6 – Class 8", desc: "Strengthening analytical thinking, scientific inquiry, and language proficiency for academic growth.", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2064&auto=format&fit=crop" },
              { title: "Senior Section", grades: "Class 9 – Class 12", desc: "Preparing students for board exams, competitive tests, and higher education with focused mentorship.", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop" },
            ].map((prog, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={prog.img} alt={prog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
                  <div className="absolute top-4 left-4 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">{prog.grades}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{prog.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{prog.desc}</p>
                  <Link href="/academics" className="text-secondary font-bold hover:underline inline-flex items-center gap-1">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Playground */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Our Campus</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">World-Class Facilities</h2>
            <p className="text-gray-600 text-lg">An inspiring environment equipped with modern amenities to support comprehensive learning and physical development.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Computer Lab", img: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.16%20AM.jpeg" },
              { title: "Library", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2190&auto=format&fit=crop" },
              { title: "Vast Playground", img: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.03%20AM.jpeg" },
            ].map((facility, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-lg relative h-80">
                <Image src={facility.img} alt={facility.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/facilities" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors text-lg">
              View All Facilities <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Gallery</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">Life at Abexsun</h2>
            <p className="text-gray-600 text-lg">A glimpse into the vibrant campus life, events, and celebrations that make our school special.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.length > 0 ? gallery.map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 || i === 5 ? 'row-span-2 h-full min-h-[320px]' : 'h-40 md:h-48'}`}>
                <img src={img.url} alt={`School life ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300"></div>
              </div>
            )) : [
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.00%20AM.jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.01%20AM.jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.02%20AM%20(1).jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.02%20AM.jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.03%20AM%20(1).jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.03%20AM.jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.04%20AM.jpeg",
              "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.08%20AM.jpeg",
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl group ${i === 0 || i === 5 ? 'row-span-2 h-full min-h-[320px]' : 'h-40 md:h-48'}`}>
                <Image src={img} alt={`School life ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg text-sm">
              View Full Gallery <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Latest Updates</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">News & Events</h2>
            <p className="text-gray-600 text-lg">Stay connected with the latest happenings at Abexsun Grammar School.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {news.length > 0 ? news.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full">{item.tag || 'News'}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.content || item.desc}</p>
                </div>
              </div>
            )) : [
              { date: "Apr 20, 2026", title: "Annual Science Fair 2026", desc: "Students showcase innovative projects in our annual inter-house science competition.", tag: "Event" },
              { date: "Apr 15, 2026", title: "Board Exam Results: 98% Pass Rate!", desc: "Our senior students achieve outstanding results in the 2026 board examinations.", tag: "News" },
              { date: "Apr 10, 2026", title: "Sports Day Celebrations", desc: "Join us for an exciting day of athletic competitions, team spirit, and fun.", tag: "Event" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-full">{item.tag}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors text-lg">
              All News & Events <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Sharing Section - Now with Global Rotating Border (Sharp Corners, No Shadow) */}
      <section className="py-2 bg-white overflow-hidden relative border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl relative">

          {/* Global Rotating Border Container - Sharp Corners, Shadow Removed */}
          <div className="relative p-[2px] overflow-hidden group">
            {/* The Rotating Background (The actual moving color) */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,#1B1464_0deg,#00AEEF_120deg,#1B1464_240deg,#00AEEF_360deg)] animate-rotate-border group-hover:duration-2s transition-all"></div>

            {/* Inner Content Card - Sharp Corners */}
            <div className="relative bg-white p-8 md:p-16 z-10">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                <div className="md:w-7/12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 border border-primary/10">
                    <Shield size={14} className="text-secondary" />
                    Performance & Transparency
                  </div>
                  <h2 className="text-4xl font-black text-primary mb-6 tracking-tight uppercase leading-none">Real-Time Progress Sharing</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed text-base font-medium">
                    At Abexsun Grammar School, we believe that education is a collaborative effort between the school and parents. We provide comprehensive insights into your child's academic journey through our integrated monitoring systems:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Weekly Progress Reports", desc: "Detailed updates on class performance and academic milestones." },
                      { title: "Parent-Teacher Meetings", desc: "Regular one-on-one interactions for personalized feedback." },
                      { title: "Attendance Tracking", desc: "Real-time updates on punctuality and campus presence." },
                      { title: "Behavioral Assessment", desc: "Holistic feedback on classroom conduct and soft skills." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:shadow-xl hover:border-primary/10 transition-all group/card">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary flex-shrink-0 shadow-sm group-hover/card:bg-primary group-hover/card:text-white transition-all">
                          <Shield size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-primary text-sm mb-1 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-[11px] text-gray-500 font-medium leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-5/12 relative flex justify-center">
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden max-w-[380px] shadow-lg border-2 border-gray-100">
                    <Image
                      src="/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.16%20AM.jpeg"
                      alt="Student Performance Review"
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Testimonials</h4>
            <h2 className="text-4xl font-extrabold text-primary mb-6">What Parents Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mrs. Fatima Khan", role: "Parent of Class 7 Student", text: "Abexsun Grammar School has been transformative for my daughter. The teachers are dedicated and the environment is nurturing. I've seen tremendous growth in her confidence and academics." },
              { name: "Mr. Ahmed Ali", role: "Parent of Class 10 Student", text: "The school's focus on both academics and character development is remarkable. My son has not only excelled in studies but has also become a responsible young leader." },
              { name: "Mrs. Sarah Raza", role: "Parent of Class 3 Student", text: "From day one, the warmth and professionalism at Abexsun has been outstanding. The facilities are world-class and the teachers genuinely care about each child's progress." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg relative flex flex-col h-full">
                <div className="absolute -top-3 left-8 text-6xl text-primary font-serif">&ldquo;</div>
                <p className="text-gray-600 leading-relaxed mb-6 mt-4 flex-grow">{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <div>
                  <h4 className="font-bold text-primary">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 bg-black border-t border-white/10 relative overflow-hidden">
        {/* Shining Stars Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration
              }}
            />
          ))}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-black text-white uppercase tracking-widest mb-6">
            Admissions Open 2026-2027
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">Ready to Join <span className="text-secondary">Abexsun?</span></h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Take the first step towards a bright future. Our admissions team is ready to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            <Link href="/admissions" className="w-fit min-w-[220px] px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-secondary hover:text-white hover:scale-105 transition-all shadow-lg flex items-center justify-center">
              Begin Application
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="w-fit min-w-[220px] px-6 py-2.5 bg-[#25D366] text-black text-sm font-bold rounded-xl hover:bg-[#22bd5b] transition-all flex items-center justify-center gap-2 shadow-lg">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-secondary font-bold tracking-wider uppercase mb-2">Get In Touch</h4>
              <h2 className="text-4xl font-extrabold text-primary mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">Have questions about admissions, fees, or anything else? Reach out and our team will get back to you promptly.</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Call Us</h4>
                    <p className="text-gray-600">+92 321 6226665</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Office Hours</h4>
                    <p className="text-gray-600">Monday – Saturday: 8:00 AM – 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Send a Quick Message</h3>
              <form className="space-y-4 relative z-10">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white border border-white/20 text-primary placeholder:text-gray-400 outline-none focus:border-secondary transition-all" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white border border-white/20 text-primary placeholder:text-gray-400 outline-none focus:border-secondary transition-all" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-white border border-white/20 text-primary placeholder:text-gray-400 outline-none focus:border-secondary transition-all" />
                <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-white border border-white/20 text-primary placeholder:text-gray-400 outline-none focus:border-secondary transition-all resize-none"></textarea>
                <button type="submit" className="w-full py-2.5 bg-secondary text-white font-black rounded-xl hover:bg-white hover:text-secondary hover:scale-105 transition-all shadow-lg text-sm">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

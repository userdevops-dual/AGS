'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to 100% over 2.2 seconds
    let start: number | null = null;
    const duration = 2200;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };
    const raf = requestAnimationFrame(step);

    const timer = setTimeout(() => setIsVisible(false), 2600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white overflow-hidden"
        >

          {/* Top thin progress line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-transparent via-[#00AEEF] to-[#1B1464] transition-none"
            />
          </div>

          <div className="flex flex-col items-center px-6 text-center relative z-10">
            {/* Logo with elegant entrance */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-10"
            >
              <Image
                src="/logo.png"
                alt="Abexsun Grammar School Logo"
                width={180}
                height={200}
                className="h-40 w-auto relative z-10"
                priority
              />
            </motion.div>

            {/* School Name with typing animation */}
            <h1 className="text-[#1B1464] text-2xl md:text-5xl font-black tracking-tight flex flex-wrap items-center justify-center pb-2 min-h-[4rem]">
              {"ABEXSUN GRAMMAR SCHOOL".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, display: "none" }}
                  animate={{ opacity: 1, display: "inline" }}
                  transition={{ delay: 0.4 + index * 0.06, duration: 0.01 }}
                  className="whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                className="inline-block w-1 md:w-1.5 h-8 md:h-12 bg-[#1B1464] ml-1"
              />
            </h1>

            {/* Tagline */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#00AEEF] text-sm md:text-base font-semibold tracking-wide flex items-center justify-center gap-3"
              >
                <span className="w-8 h-[1px] bg-[#00AEEF]/30 hidden sm:block"></span>
                Always Be Excellent By Ten Sun Education System
                <span className="w-8 h-[1px] bg-[#00AEEF]/30 hidden sm:block"></span>
              </motion.p>
            </div>

            {/* AES badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
              className="mt-8 px-8 py-2.5 border border-[#1B1464]/10 bg-white/50 backdrop-blur-sm rounded-full shadow-sm"
            >
              <p className="text-[#1B1464] text-[10px] font-bold uppercase tracking-[0.3em]">
                A Project of AES
              </p>
            </motion.div>

            {/* Minimalist Center Loading Bar */}
            <div className="mt-12 w-48 h-[2px] bg-gray-200/50 rounded-full overflow-hidden relative">
              <motion.div
                style={{ width: `${progress}%`, left: `${50 - (progress / 2)}%` }}
                className="absolute top-0 h-full bg-[#1B1464] rounded-full transition-none"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

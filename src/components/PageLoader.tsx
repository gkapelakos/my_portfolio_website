'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quick progress loader simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300); // Small pause at 100%
          return 100;
        }
        // Random increments
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100vh', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono text-zinc-300"
        >
          <div className="w-full max-w-xs md:max-w-md flex flex-col gap-4 px-6">
            {/* Terminal indicator line */}
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-emerald-500 font-semibold">guest@kapelakos.dev:~$</span>
              <span className="text-zinc-100 animate-pulse">initialize_portfolio --fast</span>
            </div>

            {/* Simulated Boot Logs */}
            <div className="text-[10px] text-zinc-500 flex flex-col gap-1 select-none">
              <span>[  OK  ] Mounted /home/johnkap</span>
              <span>[  OK  ] Loaded packages: react, next, framer-motion</span>
              <span>[  OK  ] Detected i18n localization support</span>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"
              />
            </div>

            {/* Percentage Indicator */}
            <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold font-mono">
              <span>SYSTEM BOOTING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle(
    'bg-blue-100',
    'bg-gray-200'
  );

  // Trigger color swap every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle();
    }, 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* 💫 Animated color-shifting blob */}
      <motion.div
        className={`absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full z-0 blur-3xl opacity-40 transition-colors duration-[8000ms] ${colorCycle}`}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 20, -10, 0],
          y: [0, -10, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100 to-transparent z-0" />

      {/* Hero content */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 font-sora mb-4">
          Skydeca
        </h1>
        <p className="text-2xl sm:text-3xl text-blue-800 font-sora">
          Index the Infinite
        </p>
      </motion.div>
    </main>
  );
}

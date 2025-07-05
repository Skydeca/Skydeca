'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle('bg-blue-100', 'bg-gray-200');

  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle();
    }, 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white relative overflow-hidden">

      {/* 🎇 Particle background (tsparticles) */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "#ffffff" } },
          fullScreen: { enable: false },
          particles: {
            number: { value: 45 },
            size: { value: 1.5 },
            color: { value: "#93c5fd" },
            move: { enable: true, speed: 0.4 },
            opacity: { value: 0.2 },
            links: { enable: true, distance: 100, color: "#cbd5e1", opacity: 0.15 },
          },
        }}
      />

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

      {/* ✨ Hero */}
      <motion.div
        className="text-center relative z-10 mt-40 mb-24 animate-fade-in"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-7xl sm:text-8xl font-extrabold text-gray-900 font-sora tracking-tight mb-4">
          Skydeca
        </h1>
        <p className="text-2xl sm:text-3xl text-blue-800 font-sora animate-fade-in">
          Index the Infinite
        </p>
      </motion.div>

      {/* 🟦 Glass Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mb-32 max-w-6xl animate-fade-up"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        {['Tag Smarter', 'Navigate Freely', 'Unlock Media'].map((text, i) => (
          <div
            key={i}
            className="bg-white/30 backdrop-blur-md border border-blue-100 rounded-2xl px-6 py-8 text-center shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900">{text}</h3>
          </div>
        ))}
      </motion.section>

      {/* 🧠 Interactive Tag Strip */}
      <motion.section
        className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-32 z-10 relative animate-fade-up"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Media Intelligence Preview
        </h3>
        <div className="relative h-24 bg-gray-200 rounded-md overflow-hidden mb-4">
          <div className="absolute top-0 left-1/4 w-12 h-full bg-blue-300 opacity-20" />
          <div className="absolute top-0 left-2/4 w-8 h-full bg-blue-500 opacity-30" />
          <div className="absolute top-0 left-3/4 w-10 h-full bg-blue-400 opacity-25" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {['Theology', 'Conflict', 'Breakthrough', 'Quotes'].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full transition font-medium animate-glow-pulse"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

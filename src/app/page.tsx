'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect } from 'react';
import { Particles } from '@tsparticles/react';

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle('bg-indigo-100', 'bg-sky-200');

  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle();
    }, 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white relative overflow-hidden font-sora">

      {/* 🎇 Particle Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: '#ffffff' } },
          fullScreen: { enable: false },
          particles: {
            number: { value: 55 },
            size: { value: 1.8 },
            color: { value: '#a5b4fc' },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.15 },
            links: {
              enable: true,
              distance: 120,
              color: '#e0f2fe',
              opacity: 0.12,
            },
          },
        }}
      />

      {/* 🌌 Pulsating Blob */}
      <motion.div
        className={`absolute -top-40 -left-48 w-[700px] h-[700px] rounded-full z-0 blur-3xl opacity-40 transition-colors duration-[9000ms] ${colorCycle}`}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 25, -15, 0],
          y: [0, -20, 25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ✨ Hero */}
      <motion.div
        className="text-center relative z-10 mt-44 mb-28 animate-fade-in"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-7xl sm:text-8xl font-extrabold text-gray-900 tracking-tight mb-4">
          Skydeca
        </h1>
        <p className="text-2xl sm:text-3xl text-indigo-700">
          Index the Infinite
        </p>
      </motion.div>

      {/* 🟦 Feature Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mb-28 max-w-6xl animate-fade-up"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        {['Tag Smarter', 'Navigate Freely', 'Unlock Media'].map((text, i) => (
          <motion.div
            key={i}
            className="bg-white/40 backdrop-blur-lg border border-indigo-100 rounded-2xl px-6 py-8 text-center shadow-xl hover:shadow-indigo-300 transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">{text}</h3>
          </motion.div>
        ))}
      </motion.section>

      {/* 🧠 Interactive Tag Strip */}
      <motion.section
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 mb-36 z-10 relative animate-fade-up border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Media Intelligence Preview
        </h3>

        {/* Segment Strip */}
        <div className="relative h-24 bg-slate-100 rounded-md overflow-hidden mb-6 border border-blue-50">
          <div className="absolute top-0 left-1/6 w-14 h-full bg-blue-300 opacity-20" />
          <div className="absolute top-0 left-1/2 w-10 h-full bg-blue-500 opacity-25" />
          <div className="absolute top-0 left-3/4 w-12 h-full bg-indigo-400 opacity-20" />
        </div>

        {/* Animated Tags */}
        <div className="flex gap-3 flex-wrap justify-center">
          {['Theology', 'Conflict', 'Breakthrough', 'Quotes', 'Wisdom', 'Philosophy'].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.08, rotate: 1 }}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium shadow-sm cursor-pointer transition"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🚀 Footer Suggestion (Optional) */}
      <motion.footer
        className="mb-10 text-xs text-gray-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Built with love. Searching for meaning — one tag at a time.
      </motion.footer>
    </main>
  );
}

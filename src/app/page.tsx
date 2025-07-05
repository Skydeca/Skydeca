'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect } from 'react';
import { Particles } from '@tsparticles/react';

const wordCloudTags = [
  'Faith',
  'Grace',
  'Doubt',
  'Hope',
  'Science',
  'Creativity',
  'Leadership',
  'Philosophy',
  'Testimony',
  'Identity',
  'Silence',
  'Wisdom',
  'Breakthrough',
  'Narrative',
];

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

      {/* 🧩 Cool Feature Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-8 px-6 sm:px-12 z-10 mb-28 max-w-6xl animate-fade-up"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {},
        }}
      >
        {[
          {
            title: 'Tag Smarter',
            desc: 'Hybrid AI + human labeling for deep contextual intelligence.',
            icon: '🧠',
          },
          {
            title: 'Navigate Freely',
            desc: 'Jump across ideas—not just timestamps—with nonlinear search.',
            icon: '🧭',
          },
          {
            title: 'Unlock Media',
            desc: 'Reveal buried insights with modular, semantic retrieval.',
            icon: '🔓',
          },
        ].map(({ title, desc, icon }, i) => (
          <motion.div
            key={i}
            className="relative bg-gradient-to-br from-white/30 to-indigo-50 backdrop-blur-lg border border-indigo-100 rounded-3xl p-6 text-left shadow-xl hover:shadow-indigo-300 transition-shadow cursor-pointer group overflow-hidden"
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200 opacity-10 blur-2xl rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">{desc}</p>
            <motion.div
              className="h-[2px] bg-indigo-300 mt-4 w-0 group-hover:w-full origin-left transition-all"
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </motion.section>

      {/* 🧠 Media Intelligence Preview */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 mb-36 z-10 relative animate-fade-up border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Media Intelligence Preview
        </h3>

        {/* Segment Strip */}
        <div className="relative h-24 bg-slate-100 rounded-md overflow-hidden mb-6 border border-blue-50 flex items-center">
          {[20, 40, 60, 80].map((percent, i) => (
            <div
              key={i}
              className="absolute top-0 h-full rounded bg-indigo-300/20"
              style={{
                left: `${percent}%`,
                width: `${Math.random() * 6 + 6}%`,
                opacity: 0.3 + Math.random() * 0.3,
              }}
            />
          ))}
          <div className="absolute w-full h-full flex justify-center items-center pointer-events-none text-indigo-300 text-xs">
            Transcript-aware tagging preview
          </div>
        </div>

        {/* Animated Tag Tiles */}
        <div className="flex gap-3 flex-wrap justify-center mb-6">
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

        {/* 🌥 Word Cloud */}
        <div className="relative h-72 overflow-hidden">
          {wordCloudTags.map((word, i) => (
            <motion.div
              key={i}
              className="absolute text-xs sm:text-sm font-medium text-indigo-500"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
              animate={{
                opacity: 0.3 + Math.random() * 0.7,
                x: Math.random() * 300 - 150,
                y: Math.random() * 250 - 125,
                scale: 0.7 + Math.random() * 1.2,
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🚀 Footer */}
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

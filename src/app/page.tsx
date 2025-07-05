'use client';

import { useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import Particles from '@tsparticles/react';

const wordCloudTags = [
  'Faith', 'Grace', 'Doubt', 'Hope', 'Science', 'Creativity',
  'Leadership', 'Philosophy', 'Testimony', 'Identity',
  'Silence', 'Wisdom', 'Breakthrough', 'Narrative',
  'Culture', 'Design', 'Prayer', 'Meaning', 'Emotion',
  'Justice', 'Technology', 'Silhouettes', 'Imagination',
];

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle('bg-blue-100', 'bg-sky-200');

  useEffect(() => {
    const interval = setInterval(() => setColorCycle(), 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-white font-sora overflow-hidden">

      {/* 🎇 Particle Background */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: '#ffffff' } },
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            size: { value: 1.5 },
            color: { value: '#a5b4fc' },
            move: { enable: true, speed: 0.3 },
            opacity: { value: 0.12 },
            links: {
              enable: true,
              distance: 120,
              color: '#c7d2fe',
              opacity: 0.12,
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* 🌌 Animated Background Blob */}
      <motion.div
        className={`absolute -top-40 -left-48 w-[700px] h-[700px] rounded-full z-0 blur-3xl opacity-40 ${colorCycle}`}
        animate={{ scale: [1, 1.1, 1], x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 🚀 Hero Section Centered */}
      <section className="relative z-10 text-center mt-24 mb-10 max-w-4xl px-6">
        <motion.h1
          className="text-6xl sm:text-8xl font-extrabold text-gray-900 tracking-tight mb-6"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Skydeca
        </motion.h1>
        <p className="text-2xl sm:text-3xl text-blue-800 mb-6">Index the Infinite</p>
        <section className="z-10 mt-6 mb-10 text-center px-6">
          <form className="max-w-md mx-auto flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-blue-200 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-blue-200 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              Sign Up
            </button>
          </form>
        </section>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
          Start Tagging
        </button>
      </section>

      {/* 🧩 Feature Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mt-10 mb-20 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {[
          { title: 'Tag Smarter', desc: 'Hybrid AI + human labeling for deep contextual intelligence.' },
          { title: 'Navigate Freely', desc: 'Jump across ideas—not just timestamps—with nonlinear search.' },
          { title: 'Unlock Media', desc: 'Reveal buried insights with modular, semantic retrieval.' },
        ].map(({ title, desc }, i) => (
          <motion.div
            key={i}
            className="relative bg-white/60 border border-blue-100 rounded-2xl p-5 text-left shadow hover:shadow-md transition-shadow backdrop-blur-md group"
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">{desc}</p>
            <div className="h-[1px] bg-blue-300 mt-3 w-0 group-hover:w-full origin-left transition-all duration-500" />
          </motion.div>
        ))}
      </motion.section>

      {/* 🌥 Word Cloud */}
      <div className="relative h-64 w-full mt-12 overflow-hidden">
        {wordCloudTags.map((word, i) => (
          <motion.div
            key={i}
            className="absolute text-xs sm:text-sm font-medium text-blue-500"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
            animate={{
              opacity: 0.3 + Math.random() * 0.6,
              x: Math.random() * 240 - 120,
              y: Math.random() * 180 - 90,
              scale: 0.8 + Math.random() * 1.1,
            }}
            transition={{
              duration: 5,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* 🧠 Preview Grid */}
      <motion.section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-24 mb-32 z-10 relative">
        {[ 
          {
            title: 'Tag Map Collections',
            description: 'Organize semantic tags into flexible collections that span media files.'
          },
          {
            title: 'Transcript-aware Tagging',
            description: 'Precisely map ideas to time-based segments with smart excerpt previews.'
          },
          {
            title: 'Global Search Layer',
            description: 'Search across your entire content library with semantic, nonlinear filters.'
          },
          {
            title: 'Team Collaboration',
            description: 'Tag together, review changes, and build shared intelligence as a team.'
          }
        ].map(({ title, description }, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-md border border-blue-100 p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
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

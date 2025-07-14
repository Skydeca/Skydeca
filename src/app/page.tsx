'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect, useState } from 'react';
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

const tagMaps = [
  {
    label: 'Theology Threads',
    tags: ['Sovereignty', 'Redemption', 'Faith', 'Grace'],
  },
  {
    label: 'Creative Insights',
    tags: ['Inspiration', 'Process', 'Failure', 'Breakthrough'],
  },
  {
    label: 'Life Arcs',
    tags: ['Conflict', 'Calling', 'Restoration', 'Silence'],
  },
];

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle('bg-indigo-100', 'bg-sky-200');
  const [currentMap, setCurrentMap] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle();
      setCurrentMap((prev) => (prev + 1) % tagMaps.length);
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
            className="bg-white border border-indigo-100 rounded-2xl px-6 py-8 text-center shadow-md hover:shadow-sm transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-800">{text}</h3>
          </motion.div>
        ))}
      </motion.section>

      {/* 🧠 Media Intelligence Preview */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 mb-36 z-10 relative animate-fade-up border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Media Intelligence Preview
        </h3>

        {/* Segment Strip */}
        <div className="relative h-24 bg-slate-100 rounded-md overflow-hidden mb-6 border border-blue-50">
          {[20, 40, 60, 80].map((percent, i) => (
            <div
              key={i}
              className="absolute top-0 h-full border-l-2 border-indigo-200"
              style={{
                left: `${percent}%`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-indigo-300 mx-auto mt-2 opacity-70" />
            </div>
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

      {/* 🧩 Tag Map Carousel */}
      <motion.section
        className="max-w-xl mx-auto px-6 sm:px-12 z-10 mb-24 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tag Map Journey</h3>

        <div className="relative h-56">
          {tagMaps.map((map, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: idx === currentMap ? 1 : 0,
                x: idx === currentMap ? 0 : idx < currentMap ? -40 : 40,
              }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl p-6 border border-blue-100 bg-white shadow-md ${
                idx === currentMap ? 'z-10' : 'z-0 pointer-events-none'
              }`}
            >
              <h4 className="text-lg font-semibold text-gray-700 mb-3">{map.label}</h4>
              <div className="flex gap-2 flex-wrap justify-center">
                {map.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentMap((prev) => (prev - 1 + tagMaps.length) % tagMaps.length)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentMap((prev) => (prev + 1) % tagMaps.length)}
            className="text-sm text-blue-600 hover:underline"
          >
            Next →
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Navigate nonlinear ideas — one map at a time.
        </p>
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

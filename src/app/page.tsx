'use client';

import { motion, useCycle } from 'framer-motion';
import { useEffect } from 'react';

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

      {/* 💫 Animated color-shifting blob */}
      <motion.div
        className={`absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full z-0 blur-3xl opacity-40 transition-colors duration-[8000ms] ${colorCycle}`}
        animate={{ scale: [1, 1.05, 1], x: [0, 20, -10, 0], y: [0, -10, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 🌫️ Floating ambient tag words */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {['science', 'story', 'voice', 'insight', 'search', 'media', 'questions'].map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-gray-300 text-sm sm:text-base font-medium opacity-20 blur-sm"
            style={{ top: `${10 + i * 8}%`, left: `${(i * 13) % 80}%` }}
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.div>
        ))}
      </motion.div>

      {/* 💡 Subtle border flare */}
      <div className="pointer-events-none absolute inset-0 z-0 border-[1px] border-blue-100 rounded-3xl blur-3xl opacity-40" />

      {/* ⬇️ Scroll cue */}
      <motion.div
        className="text-2xl text-blue-200 absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ↓
      </motion.div>

      {/* 🧠 Unified float-in section */}
      <motion.section
        className="relative z-10 mt-32 mb-24 px-6 sm:px-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900 font-sora mb-4">
          Skydeca
        </h1>
        <p className="text-2xl sm:text-3xl text-blue-800 font-sora mb-12">
          Index the Infinite
        </p>

        {/* Simplified 3-card statement row */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {['Tag precisely.', 'Explore meaning.', 'Navigate time.'].map((phrase) => (
            <div
              key={phrase}
              className="bg-white/50 backdrop-blur-md border border-blue-100 rounded-xl py-6 px-4 text-lg font-medium text-gray-800 shadow-md"
            >
              {phrase}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 🌀 Tag bubble demo */}
      <motion.section
        className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 relative overflow-hidden mb-32 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Media Intelligence Preview
        </h3>
        <div className="relative h-24 bg-gray-200 rounded-md overflow-hidden">
          <div className="absolute top-0 left-1/4 w-12 h-full bg-blue-300 opacity-20" />
          <div className="absolute top-0 left-2/4 w-8 h-full bg-blue-500 opacity-30" />
          <div className="absolute top-0 left-3/4 w-10 h-full bg-blue-400 opacity-25" />
        </div>
        <div className="flex gap-2 flex-wrap mt-4">
          {['Theology', 'Conflict', 'Breakthrough', 'Quotes'].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full transition"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

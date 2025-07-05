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

      {/* 🌫️ Floating ambient tag words (fade in on mount) */}
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
            style={{
              top: `${10 + i * 8}%`,
              left: `${(i * 13) % 80}%`,
            }}
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

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100 to-transparent z-0" />

      {/* Hero content */}
      <motion.div
        className="text-center relative z-10 mt-32 mb-20"
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

      {/* ⬇️ Scroll hint icon */}
      <motion.div
        className="text-2xl text-blue-200 absolute bottom-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ↓
      </motion.div>

      {/* 2️⃣ Glassmorphic Card Strip with stagger */}
      <motion.section
        className="max-w-6xl w-full px-6 sm:px-12 z-10 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        <div className="grid sm:grid-cols-3 gap-8">
          {['Tag Smarter', 'Navigate Freely', 'Unlock Media'].map((title, i) => (
            <motion.div
              key={title}
              className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 text-center shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Skydeca empowers nonlinear media interaction through a new layer of intelligence — without revealing it all.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3️⃣ Parallax Reveal Section */}
      <motion.section
        className="max-w-4xl mx-auto px-6 sm:px-12 text-center mb-32"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What if time didn’t limit discovery?
        </h2>
        <p className="text-lg text-gray-600">
          Skydeca invites users to explore media not linearly — but meaningfully.
        </p>
      </motion.section>

      {/* 4️⃣ Tag Bubble Demo with subtle hover pulse */}
      <section className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 relative overflow-hidden mb-32 z-10">
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
      </section>
    </main>
  );
}

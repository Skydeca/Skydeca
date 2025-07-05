'use client';

import { motion, useCycle, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

const phrases = [
  'Organize chaos.',
  'Map what matters.',
  'Guide the mind.',
  'Time isn’t linear.',
];

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle('bg-blue-100', 'bg-gray-200');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phraseControls = useAnimationControls();

  // Swap color background
  useEffect(() => {
    const interval = setInterval(() => setColorCycle(), 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  // Rotate poetic phrases
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      phraseControls.start({ opacity: 0 }).then(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        phraseControls.start({ opacity: 1 });
      });
    }, 5000);
    return () => clearInterval(phraseInterval);
  }, [phraseControls]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white relative overflow-hidden">
      {/* 💫 Animated color blob */}
      <motion.div
        className={`absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full z-0 blur-3xl opacity-40 transition-colors duration-[8000ms] ${colorCycle}`}
        animate={{ scale: [1, 1.05, 1], x: [0, 20, -10, 0], y: [0, -10, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 🌫 Floating ambient words */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        {['science', 'story', 'voice', 'insight', 'search', 'media', 'questions'].map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-gray-300 text-sm sm:text-base font-medium opacity-20 blur-sm"
            style={{ top: `${10 + i * 8}%`, left: `${(i * 13) % 80}%` }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            {word}
          </motion.div>
        ))}
      </motion.div>

      {/* ⬆️ Top text prompt */}
      <motion.div className="relative z-10 text-center mt-24 opacity-60 text-sm sm:text-base tracking-wide">
        A new way to move through media.
      </motion.div>

      {/* 🧠 Glow aura behind Skydeca */}
      <motion.div
        className="absolute z-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-blue-200 blur-3xl opacity-20"
        animate={{ scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 🔥 Hero title */}
      <motion.div
        className="text-center relative z-10 mt-4 mb-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-7xl sm:text-[6rem] font-extrabold text-gray-900 font-sora mb-4">
          Skydeca
        </h1>
        <p className="text-2xl sm:text-3xl text-blue-800 font-sora mb-2">
          Index the Infinite
        </p>

        {/* 🌀 Rotating subtext */}
        <motion.p
          className="text-gray-500 text-sm sm:text-base font-medium mt-2"
          animate={phraseControls}
          initial={{ opacity: 1 }}
        >
          {phrases[phraseIndex]}
        </motion.p>
      </motion.div>

      {/* Divider line */}
      <motion.div
        className="w-24 h-[1px] bg-gray-300 opacity-30 mb-20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
      />

      {/* Rest of the page continues here... */}
    </main>
  );
}

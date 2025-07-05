'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Bottom blue gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-100 to-transparent z-0" />

      {/* Centered content with animation */}
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
          Index the infinite
        </p>
      </motion.div>
    </main>
  );
}

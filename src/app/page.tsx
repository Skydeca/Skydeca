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

      {/* 🚀 Hero Section Hybrid */}
      <section className="relative z-10 mt-36 w-full px-6 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl">
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <motion.h1
            className="text-6xl sm:text-8xl lg:text-[120px] font-extrabold text-gray-900 tracking-tight mb-6"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            Skydeca
          </motion.h1>
          <p className="text-2xl sm:text-3xl text-blue-800 mb-6">Index the Infinite</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
            Start Tagging
          </button>
        </div>

        <div className="w-full">
          <div className="relative h-96 w-full bg-slate-100 rounded-xl shadow-inner p-4 overflow-hidden">
            <pre className="text-xs text-gray-700 overflow-auto h-full whitespace-pre-wrap">
{`fetch('/api/tag-media', {
  method: 'POST',
  body: JSON.stringify({
    fileUrl: 'https://cdn.yoursite.com/episode01.mp3',
    tags: ['Wisdom', 'Breakthrough']
  })
})
  .then(res => res.json())
  .then(data => console.log('Success:', data));`}
            </pre>
          </div>
        </div>
      </section>

      {/* 🧩 Feature Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mt-28 mb-20 max-w-6xl"
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

      {/* 🧠 Media Intelligence Preview */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-24 mb-32 z-10 relative border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Intelligence Preview</h3>

        <div className="relative h-20 bg-slate-100 rounded-md overflow-hidden mb-6 border border-blue-50 flex items-center animate-pulse">
          {[...Array(4)].map((_, i) => {
            const left = 20 + i * 20;
            const width = 6 + Math.random() * 6;
            const opacity = 0.3 + Math.random() * 0.3;
            return (
              <div
                key={i}
                className="absolute top-0 h-full rounded bg-blue-300/20"
                style={{ left: `${left}%`, width: `${width}%`, opacity }}
              />
            );
          })}
          <div className="absolute w-full h-full flex justify-center items-center pointer-events-none text-blue-300 text-xs">
            Transcript-aware tagging preview
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {['Theology', 'Conflict', 'Breakthrough', 'Quotes', 'Wisdom', 'Philosophy'].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.08, rotate: 1 }}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium shadow-sm cursor-pointer transition"
            >
              {tag}
            </motion.div>
          ))}
        </div>
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

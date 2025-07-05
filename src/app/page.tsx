'use client';

import { useEffect } from 'react';
import { motion, useCycle } from 'framer-motion';
import Particles from '@tsparticles/react';

import { FolderTree, Text, Search, Users } from 'lucide-react';

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
      <section className="relative z-10 text-center mt-24 mb-6 max-w-4xl px-6">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900 tracking-tight mb-4">Skydeca</h1>
        <p className="text-2xl sm:text-3xl text-blue-800 mb-20">Index the Infinite</p>
        <section className="z-10 mb-10 text-center px-6">
          <form className="max-w-xs mx-auto flex flex-col gap-3 text-sm">
            <input
              type="email"
              placeholder="Email"
              className="border border-blue-200 rounded-md px-3 py-1.5 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-blue-200 rounded-md px-3 py-1.5 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
            >
              Start Tagging
            </button>
          </form>
        </section>
      </section>

      {/* 🧩 Feature Cards */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-6 sm:px-12 z-10 mt-6 mb-16 max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {[
          { title: 'Smarter Tagging', desc: 'Use AI with human help to tag ideas accurately.' },
          { title: 'Idea-Based Search', desc: 'Find content by idea, not just timestamps.' },
          { title: 'Media Unlocked', desc: 'Surface powerful moments from your recordings.' },
          { title: 'Guided Journeys', desc: 'Create learning paths through connected tags.' },
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
      <div className="relative h-64 w-full mt-8 overflow-hidden">
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

      {/* 🧠 Preview Grid + Transcript Graph */}
      <motion.section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-20 mb-28 z-10 relative">
        {[{
          icon: <FolderTree className="w-6 h-6 text-blue-500" />, 
          title: 'Tag Map Collections',
          description: 'Group related tags into collections that connect different files.'
        }, {
          icon: <Text className="w-6 h-6 text-blue-500" />, 
          title: 'Smart Transcripts',
          description: 'Tag quotes and moments straight from the transcript.'
        }, {
          icon: <Search className="w-6 h-6 text-blue-500" />, 
          title: 'Powerful Search',
          description: 'Find clips by meaning, not just keywords.'
        }, {
          icon: <Users className="w-6 h-6 text-blue-500" />, 
          title: 'Collaborate Easily',
          description: 'Work with your team to build shared insight.'
        }].map(({ icon, title, description }, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-md border border-blue-100 p-6 flex items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            {icon}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </motion.div>
        ))}

        {/* 🔁 Transcript Graph Visually Restored */}
        <div className="col-span-full bg-slate-100 border border-blue-200 rounded-lg p-4 mt-8">
          <div className="h-5 relative flex items-center gap-1 animate-pulse">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-full rounded bg-blue-300/30"
                style={{ width: `${4 + Math.random() * 10}%`, opacity: 0.4 + Math.random() * 0.4 }}
              />
            ))}
          </div>
          <p className="text-xs text-center text-blue-500 mt-2">Transcript Insight Graph Preview</p>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="mb-10 text-xs text-gray-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Built with care. Helping ideas speak — one tag at a time.
      </motion.footer>
    </main>
  );
}

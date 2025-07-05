"use client";

import { useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const wordCloudTags = [
  "Faith", "Grace", "Doubt", "Hope", "Science", "Creativity",
  "Leadership", "Philosophy", "Testimony", "Identity",
  "Silence", "Wisdom", "Breakthrough", "Narrative",
  "Beauty", "Curiosity", "Fear", "Joy", "Discovery",
];

export default function HomePage() {
  const [colorCycle, setColorCycle] = useCycle("bg-indigo-100", "bg-sky-200");

  useEffect(() => {
    const interval = setInterval(() => setColorCycle(), 10000);
    return () => clearInterval(interval);
  }, [setColorCycle]);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-white font-sora overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={loadSlim}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            color: { value: "#a5b4fc" },
            move: { enable: true, speed: 0.3 },
            opacity: { value: 0.1 },
            links: {
              enable: true,
              distance: 120,
              color: "#c7d2fe",
              opacity: 0.1,
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Floating Blob */}
      <motion.div
        className={`absolute -top-40 -left-48 w-[700px] h-[700px] rounded-full z-0 blur-3xl opacity-40 ${colorCycle}`}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <motion.div
        className="text-center relative z-10 mt-44 mb-24"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">
          Skydeca
        </h1>
        <p className="text-xl sm:text-2xl text-indigo-700">Index the Infinite</p>
      </motion.div>

      {/* Feature Cards */}
      <motion.section
        className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mb-24 max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {["Tag Smarter", "Navigate Freely", "Unlock Media"].map((title, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-white/50 to-indigo-50 backdrop-blur-lg border border-indigo-100 rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition-shadow group"
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">
              {title === "Tag Smarter"
                ? "Hybrid AI + human labeling for deep contextual intelligence."
                : title === "Navigate Freely"
                ? "Jump across ideas—not just timestamps—with nonlinear search."
                : "Reveal buried insights with modular, semantic retrieval."}
            </p>
            <motion.div className="h-[1px] bg-indigo-300 mt-3 w-0 group-hover:w-full origin-left transition-all duration-500" />
          </motion.div>
        ))}
      </motion.section>

      {/* Media Intelligence Preview */}
      <motion.section
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-32 z-10 relative border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Intelligence Preview</h3>

        {/* Segment Strip */}
        <div className="relative h-20 bg-slate-100 rounded-md overflow-hidden mb-6 border border-blue-50 flex items-center">
          {[...Array(4)].map((_, i) => {
            const left = 20 + i * 20;
            const width = 6 + Math.random() * 6;
            const opacity = 0.3 + Math.random() * 0.3;
            return (
              <div
                key={i}
                className="absolute top-0 h-full rounded bg-indigo-300/20"
                style={{ left: `${left}%`, width: `${width}%`, opacity }}
              />
            );
          })}
          <div className="absolute w-full h-full flex justify-center items-center pointer-events-none text-indigo-300 text-xs">
            Transcript-aware tagging preview
          </div>
        </div>

        {/* Suggested Tags */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {["Theology", "Conflict", "Breakthrough", "Quotes", "Wisdom", "Philosophy"].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.08, rotate: 1 }}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium shadow-sm cursor-pointer transition"
            >
              {tag}
            </motion.div>
          ))}
        </div>

        {/* Word Cloud */}
        <div className="relative h-64 overflow-hidden">
          {wordCloudTags.map((word, i) => (
            <motion.div
              key={i}
              className="absolute text-xs sm:text-sm font-medium text-indigo-500"
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
                repeatType: "reverse",
              }}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mb-10 text-xs text-gray-400 z-10">
        Built with love. Searching for meaning — one tag at a time.
      </footer>
    </main>
  );
}

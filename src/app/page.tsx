'use client';

import { useEffect, useState } from 'react';

const wordCloudTags = [
  'Faith', 'Grace', 'Doubt', 'Hope', 'Science', 'Creativity',
  'Leadership', 'Philosophy', 'Testimony', 'Identity',
  'Silence', 'Wisdom', 'Breakthrough', 'Narrative',
];

export default function HomePage() {
  const [colorCycle, setColorCycle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setColorCycle((prev) => !prev), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-white font-sora overflow-hidden">
      
      {/* 🌌 Simple Blurred Blob Background */}
      <div
        className={`absolute -top-40 -left-48 w-[700px] h-[700px] rounded-full z-0 blur-3xl opacity-40 transition-colors duration-1000 ${
          colorCycle ? 'bg-indigo-100' : 'bg-sky-200'
        }`}
        style={{
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      {/* 🚀 Hero Section */}
      <div className="text-center relative z-10 mt-44 mb-24 transition-opacity duration-1000 animate-fade-in">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">
          Skydeca
        </h1>
        <p className="text-xl sm:text-2xl text-indigo-700">Index the Infinite</p>
      </div>

      {/* 🧩 Feature Cards (No Icons, Tight Layout, Subtle Shadows) */}
      <section className="grid sm:grid-cols-3 gap-6 px-6 sm:px-12 z-10 mb-24 max-w-5xl">
        {[
          { title: 'Tag Smarter', desc: 'Hybrid AI + human labeling for deep contextual intelligence.' },
          { title: 'Navigate Freely', desc: 'Jump across ideas—not just timestamps—with nonlinear search.' },
          { title: 'Unlock Media', desc: 'Reveal buried insights with modular, semantic retrieval.' },
        ].map(({ title, desc }, i) => (
          <div
            key={i}
            className="relative bg-gradient-to-br from-white/50 to-indigo-50 backdrop-blur-lg border border-indigo-100 rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition-shadow group"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">{desc}</p>
            <div className="h-[1px] bg-indigo-300 mt-3 w-0 group-hover:w-full origin-left transition-all duration-500" />
          </div>
        ))}
      </section>

      {/* 🧠 Intelligence Preview */}
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-32 z-10 relative border border-blue-100">
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
          {['Theology', 'Conflict', 'Breakthrough', 'Quotes', 'Wisdom', 'Philosophy'].map((tag) => (
            <div
              key={tag}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium shadow-sm cursor-pointer transition-transform transform hover:scale-105"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Word Cloud */}
        <div className="relative h-64 overflow-hidden">
          {wordCloudTags.map((word, i) => {
            const x = Math.random() * 240 - 120;
            const y = Math.random() * 180 - 90;
            const scale = 0.8 + Math.random() * 1.1;
            const opacity = 0.3 + Math.random() * 0.6;
            return (
              <div
                key={i}
                className="absolute text-xs sm:text-sm font-medium text-indigo-500 transition-all duration-1000"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  opacity,
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mb-10 text-xs text-gray-400 z-10">
        Built with love. Searching for meaning — one tag at a time.
      </footer>

      {/* 🌊 Custom float animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-fade-in {
          animation: fadeIn 1.4s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}

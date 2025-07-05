'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

export default function TagMapCarousel() {
  const [currentMap, setCurrentMap] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMap((prev) => (prev + 1) % tagMaps.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}

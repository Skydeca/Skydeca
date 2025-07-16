'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const mockData = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  title: `Clip ${i + 1}`,
  subtitle: 'Sample Video Title',
  timeRange: '0:00 – 0:45',
  tags: ['Voice', 'Wisdom', 'Theme'],
}));

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login');
    });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockData.map((clip) => (
        <div
          key={clip.id}
          className="bg-black text-white rounded-xl p-4 shadow hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold">{clip.title}</h3>
          <p className="text-sm text-gray-400">{clip.subtitle}</p>
          <p className="text-xs text-gray-500">{clip.timeRange}</p>
          <div className="mt-2 text-xs text-gray-300 space-x-1">
            {clip.tags.map((tag, i) => (
              <span key={i} className="inline-block bg-white/10 px-2 py-1 rounded-md">{tag}</span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 text-xl opacity-80">
            <span>⏮️</span>
            <span>⏪</span>
            <span>⏸️</span>
            <span>▶️</span>
            <span>⏩</span>
            <span>➕</span>
          </div>
        </div>
      ))}
    </div>
  );
}

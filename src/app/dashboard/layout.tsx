import { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Skydeca Dashboard',
  description: 'Index the Infinite',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    // Don't use <html> or <body> here; leave that to root layout!
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        {/* Elegant Top Bar */}
        <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
          <div className="text-2xl font-bold tracking-wide">Skydeca</div>
          <div className="flex items-center gap-4">
            <Link href="/media-upload" passHref>
              <span className="text-lg hover:text-gray-600 cursor-pointer">＋</span>
            </Link>
            <button className="text-lg hover:text-gray-600">🔔</button>
            <div className="w-9 h-9 rounded-full overflow-hidden border">
              <img src="/avatar.jpg" alt="User" className="object-cover w-full h-full" />
            </div>
          </div>
        </header>

        {/* Utility Bar */}
        <section className="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <input
            type="text"
            placeholder="Search tags, titles, notes..."
            className="px-5 py-3 w-full sm:flex-1 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm"
          />
          <div className="flex gap-2 sm:gap-4">
            <select className="bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 focus:outline-none">
              <option disabled selected>Filter</option>
              <option value="tag">By Tag</option>
              <option value="time">By Time</option>
            </select>
            <select className="bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 focus:outline-none">
              <option disabled selected>Sort</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <select className="bg-white border border-gray-300 text-sm rounded-lg px-4 py-2 focus:outline-none">
              <option disabled selected>View</option>
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>
          </div>
        </section>

        {/* Main Content */}
        <main className="w-full max-w-6xl px-6 pb-14 mx-auto">
          {children}
        </main>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

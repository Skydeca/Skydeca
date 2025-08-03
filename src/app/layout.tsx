// src/app/layout.tsx
import '../globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Skydeca',
  description: 'TagDive | Search by meaning, not minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-neutral-900" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center px-4">
            <div className="w-full max-w-screen-xl">{children}</div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

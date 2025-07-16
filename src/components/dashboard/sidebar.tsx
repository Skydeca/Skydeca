// src/components/dashboard/sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/media-upload', label: 'Upload Media' },
  { href: '/dashboard/tag-maps', label: 'Tag Maps' },
  { href: '/dashboard/search', label: 'Search' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r p-6 hidden md:block">
      <div className="text-xl font-bold mb-6">TagDive</div>
      <nav className="space-y-2">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

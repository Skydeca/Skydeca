'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      setUserEmail(user?.email ?? null);
    };

    if (typeof window !== 'undefined') {
      getUser();
    }
  }, []);

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white">
      <Link href="/">
        <h1 className="text-xl font-bold text-blue-800">Skydeca</h1>
      </Link>

      <div className="text-sm text-gray-700">
        {userEmail ? (
          <span>Signed in as <strong>{userEmail}</strong></span>
        ) : (
          <Link href="/login" className="text-blue-600 underline">
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}

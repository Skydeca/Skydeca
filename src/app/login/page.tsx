'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [supabase, setSupabase] = useState<any>(null);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Delay Supabase until after client is ready
    const load = async () => {
      const { createBrowserSupabaseClient } = await import('@supabase/auth-helpers-nextjs');
      setSupabase(createBrowserSupabaseClient());
    };
    load();
  }, []);

  const handleLogin = async () => {
    if (!supabase) return alert('Supabase not ready yet.');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for a magic login link');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">Login to Skydeca</h1>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <Button onClick={handleLogin} disabled={!supabase}>Send Magic Link</Button>
    </div>
  );
}

// LoginPage.tsx
// Skydeca/TagDive - User Login Screen (Email/Password, Supabase Auth)

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Redirect to dashboard/home after successful login
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-24 p-6 bg-white rounded-2xl shadow-2xl">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </Button>
        <div className="text-center text-sm mt-2">
          Don't have an account?{' '}
          <a href="/signup" className="underline cursor-pointer">Sign Up</a>
        </div>
        <div className="text-center text-xs mt-1">
          <a href="#" className="underline cursor-pointer" onClick={() => alert('Password reset coming soon!')}>Forgot password?</a>
        </div>
      </form>
    </div>
  );
}

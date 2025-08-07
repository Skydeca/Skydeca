'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const supabase = createBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push('/dashboard');
    };
    redirectIfLoggedIn();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      alert('Check your email to confirm your account.');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError(error.message);
    } else {
      alert('Password reset email sent.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-950">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-8">
        <h1 className="text-center text-3xl font-bold text-neutral-900 dark:text-white mb-2">Skydeca</h1>
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-6 tracking-widest uppercase">Index the Infinite</p>

        <h2 className="text-2xl font-semibold text-center text-neutral-800 dark:text-white mb-6">
          {mode === 'login' ? 'Login' : mode === 'signup' ? 'Register' : 'Reset Password'}
        </h2>

        <form
          onSubmit={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignup : handleResetPassword}
          className="space-y-4"
        >
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-neutral-500 dark:text-neutral-400" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>

          {(mode === 'login' || mode === 'signup') && (
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-neutral-500 dark:text-neutral-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" /> Remember me
              </label>
              <button type="button" onClick={() => setMode('forgot')} className="hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? mode === 'login'
                ? 'Logging in...'
                : mode === 'signup'
                ? 'Signing up...'
                : 'Sending...'
              : mode === 'login'
              ? 'Login'
              : mode === 'signup'
              ? 'Register'
              : 'Send Email'}
          </Button>

          {mode === 'login' && (
            <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full">
              Continue with Google
            </Button>
          )}
        </form>

        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-blue-600 hover:underline">
                Register
              </button>
            </>
          ) : (
            <>
              Back to{' '}
              <button onClick={() => setMode('login')} className="text-blue-600 hover:underline">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{ backgroundImage: "url('/bg-login.jpg')", backgroundSize: 'cover' }}
    >
      <div className="text-center mt-4 sm:mt-10">
        <h1 className="text-white text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-extrabold leading-none drop-shadow-xl">
          Skydeca
        </h1>
        <p className="text-white text-base sm:text-lg font-light tracking-[0.4em] uppercase mt-2">
          Index the Infinite
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
          <h2 className="text-white text-2xl font-semibold text-center mb-6">
            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Register' : 'Reset Password'}
          </h2>

          <form
            onSubmit={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignup : handleResetPassword}
            className="space-y-4"
          >
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-white opacity-80" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/30 text-white placeholder-white"
                required
              />
            </div>

            {(mode === 'login' || mode === 'signup') && (
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-white opacity-80" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/30 text-white placeholder-white"
                  required
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-between text-white text-xs mt-1">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="accent-white" /> Remember me
                </label>
                <button type="button" onClick={() => setMode('forgot')} className="underline">
                  Forgot password?
                </button>
              </div>
            )}

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full bg-white text-blue-700 font-semibold hover:bg-gray-100">
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

          <div className="text-center text-white text-sm mt-6">
            {mode === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button onClick={() => setMode('signup')} className="underline">
                  Register
                </button>
              </>
            ) : (
              <>
                Back to{' '}
                <button onClick={() => setMode('login')} className="underline">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

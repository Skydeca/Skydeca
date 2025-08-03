'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { FcGoogle } from 'react-icons/fc';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const authFn = isLogin
      ? supabase.auth.signInWithPassword
      : supabase.auth.signUp;

    const { data: authData, error: authError } = await authFn({
      email,
      password,
      ...(isLogin
        ? {}
        : {
            options: {
              emailRedirectTo: `${location.origin}/login`,
            },
          }),
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError('User not found after authentication.');
      setLoading(false);
      return;
    }

    if (!isLogin) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ user_id: user.id, user_email: email });
      if (insertError) {
        setError('Signup succeeded, but user insert failed.');
        setLoading(false);
        return;
      }
    }

    router.push('/media-upload');
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/media-upload`,
      },
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white relative overflow-hidden">
      <Particles
        id="tsparticles-auth"
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: '#ffffff' } },
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            size: { value: 2 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.2 },
            links: {
              enable: true,
              distance: 120,
              color: '#c7d2fe',
              opacity: 0.15,
            },
          },
        }}
      />

      <motion.div
        className="w-full max-w-sm mx-auto mt-32 p-8 bg-white relative z-10 rounded-2xl shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-2">
            {isLogin ? 'Log In' : 'Sign Up'}
          </h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {!isLogin && (
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {successMessage && <div className="text-green-600 text-sm text-center">{successMessage}</div>}

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 justify-center"
          >
            <FcGoogle size={18} />
            Continue with Google
          </Button>

          <div className="text-center text-sm mt-3">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span className="underline cursor-pointer text-indigo-600" onClick={() => setIsLogin(false)}>Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="underline cursor-pointer text-indigo-600" onClick={() => setIsLogin(true)}>Log In</span>
              </>
            )}
          </div>
          <div className="text-center text-xs mt-1">
            <a href="#" className="underline cursor-pointer text-gray-400" onClick={() => alert('Password reset coming soon!')}>Forgot password?</a>
          </div>
        </form>
      </motion.div>
    </main>
  );
}

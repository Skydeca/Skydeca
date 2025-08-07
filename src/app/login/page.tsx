"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const supabase = createBrowserClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Optional: redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        console.log("🔁 Already logged in:", data.session);
        router.push("/upload");
      }
    });
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Login error:", error.message);
      setError(error.message);
    } else {
      console.log("✅ Logged in:", data);
      router.push("/upload");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Skydeca</h1>
      <p className="text-lg mb-6">Index the Infinite</p>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
        {error && <p className="text-red-400">{error}</p>}
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{' '}
        <Link href="/signup" className="underline text-blue-400 hover:text-blue-200">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

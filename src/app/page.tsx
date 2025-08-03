import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  // Let it fall through to login if not authenticated
  redirect('/login');
}

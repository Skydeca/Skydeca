'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MediaUpload from '../../components/MediaUpload';

export default function UploadPage() {
  const router = useRouter();

  useEffect(() => {
    import('@/lib/supabase').then(({ supabase }) => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) router.push('/login');
      });
    });
  }, [router]);

  return <MediaUpload />;
}

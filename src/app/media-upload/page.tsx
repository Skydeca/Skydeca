'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import WaveSurfer from 'wavesurfer.js';
import { MediaUploadPage } from '@/components/MediaUploadPage';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login');
    });
  }, []);

  return <MediaUploadPage />;
}

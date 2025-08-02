'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MediaUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please select a file.');
      setLoading(false);
      return;
    }

    const filePath = `uploads/${Date.now()}-${file.name}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      setLoading(false);
      return;
    }

    // Get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      setError('Auth error: user not found');
      setLoading(false);
      return;
    }
console.log('Trying insert with:', {
  user_id: user.id,
  file_url: filePath,
  type: 'upload',
});

    // Insert into `media` table
    const { error: insertError } = await supabase.from('media').insert([
      {
        user_id: user.id,
        file_url: filePath,
        type: 'upload',
      },
    ]);

    if (insertError) {
      setError('Insert failed: ' + insertError.message);
      setLoading(false);
      return;
    }

    setSuccess('File uploaded and metadata saved!');
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-24 p-6 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Media</h2>
      <form onSubmit={handleFileUpload} className="flex flex-col gap-4">
        <Input
          type="file"
          accept="audio/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </div>
  );
}

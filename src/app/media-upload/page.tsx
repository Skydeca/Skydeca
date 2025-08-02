'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MediaUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [mode, setMode] = useState<'upload' | 'link'>('upload');
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

    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      setError('Auth error: user not found');
      setLoading(false);
      return;
    }

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

  const handleExternalLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!externalUrl) {
      setError('Please paste a link.');
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('You must be logged in to save a link.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('media_links').insert([
      {
        url: externalUrl,
        user_id: user.id,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Link saved!');
      setExternalUrl('');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-24 p-6 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Media</h2>

      <div className="flex justify-center mb-6">
        <Button
          variant={mode === 'upload' ? 'default' : 'ghost'}
          onClick={() => setMode('upload')}
          className="mr-2"
        >
          Upload
        </Button>
        <Button
          variant={mode === 'link' ? 'default' : 'ghost'}
          onClick={() => setMode('link')}
        >
          Link
        </Button>
      </div>

      {mode === 'upload' ? (
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
      ) : (
        <form onSubmit={handleExternalLink} className="flex flex-col gap-4">
          <Input
            type="url"
            placeholder="Paste external media URL (YouTube, Spotify, etc.)"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Link'}
          </Button>
        </form>
      )}
    </div>
  );
}

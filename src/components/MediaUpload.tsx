'use client';
import React, { useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';

const supabase = createBrowserClient();

const MediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    if (!['audio/mpeg', 'audio/wav'].includes(file.type)) {
      setError('Only MP3 or WAV files are supported.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('File is too large (max 50MB).');
      return;
    }

    setUploading(true);
    const filePath = `uploads/${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
    setFileUrl(urlData.publicUrl);
    setUploading(false);
  }, []);

  return (
    <div>
      <input type="file" onChange={onFileChange} accept="audio/*" disabled={uploading} />
      {uploading && <div>Uploading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {fileUrl && (
        <div>
          Uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

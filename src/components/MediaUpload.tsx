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

    // Validate file type and size
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

    const { data: storageData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError('Upload failed: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
    setFileUrl(urlData.publicUrl);

    // Get user ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) {
      setError('Not authenticated or user error.');
      setUploading(false);
      return;
    }

    // Insert media metadata into DB
    const { error: insertError } = await supabase.from('media').insert([
      {
        user_id: user.id,
        file_path: filePath,
        type: 'upload',
      },
    ]);

    if (insertError) {
      setError('Database insert failed: ' + insertError.message);
      setUploading(false);
      return;
    }

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

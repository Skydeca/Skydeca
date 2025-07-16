'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createBrowserClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import WaveSurfer from 'wavesurfer.js';

const supabase = createBrowserClient();

export function MediaUploadPage() {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [transcripts, setTranscripts] = useState<Record<string, string[]>>({});
  const waveforms = useRef<Record<string, WaveSurfer>>({});

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media_files')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setMediaList(data);
      fetchTranscripts(data);
    }
  };

  const fetchTranscripts = async (mediaItems: any[]) => {
    const ids = mediaItems.map((m) => m.transcript_id).filter(Boolean);
    if (!ids.length) return;

    const { data, error } = await supabase
      .from('transcripts')
      .select('id, segments')
      .in('id', ids);

    if (error) {
      console.error('Transcript fetch error:', error.message);
      return;
    }

    const map: Record<string, string[]> = {};
    data.forEach((t: any) => {
      map[t.id] = t.segments || [];
    });
    setTranscripts(map);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const filePath = `uploads/${Date.now()}-${file.name}`;
    setUploading(true);
    setUploadProgress(0);

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Upload error:', error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
    setFileUrl(urlData.publicUrl);

    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;

    if (!userId) {
      console.error('User not authenticated');
      setUploading(false);
      return;
    }

    const insertRes = await supabase.from('media_files').insert({
      user_id: userId,
      file_url: urlData.publicUrl,
      title,
      duration: null,
      transcript_id: null,
    });

    if (insertRes.error) {
      console.error('Insert error:', insertRes.error.message);
    } else {
      console.log('Inserted media record:', insertRes.data);
      fetchMedia();
    }

    setUploading(false);
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <div {...getRootProps()} className="border-2 border-dashed p-8 text-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here...</p> : <p>Drag & drop or click to upload media</p>}
      </div>

      <div className="mt-4">
        <label className="block mb-1">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Media title..." />
      </div>

      <div className="mt-4">
        <label className="block mb-1">Description</label>
        <Textarea placeholder="Optional notes..." />
      </div>

      {uploading && (
        <div className="mt-4 text-sm text-blue-600">
          Uploading... {uploadProgress?.toFixed(1)}%
        </div>
      )}

      {fileUrl && (
        <div className="mt-4 text-green-600">
          File uploaded! <a href={fileUrl} target="_blank" rel="noopener noreferrer">View</a>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Uploaded Media</h2>
        <ul className="space-y-4">
          {mediaList.map((media) => (
            <li key={media.id} className="border p-4 rounded">
              <div className="font-medium">{media.title}</div>
              <div className="text-sm text-gray-600">{media.file_url}</div>
              <div
                id={`waveform-${media.id}`}
                className="mt-2 w-full h-20 bg-gray-200"
                ref={(node) => {
                  if (node && !waveforms.current[media.id]) {
                    const wavesurfer = WaveSurfer.create({
                      container: `#waveform-${media.id}`,
                      waveColor: '#ccc',
                      progressColor: '#4f46e5',
                      height: 80,
                    });
                    wavesurfer.load(media.file_url);
                    waveforms.current[media.id] = wavesurfer;
                  }
                }}
              />
              {media.transcript_id && transcripts[media.transcript_id] && (
                <div className="mt-3 text-sm bg-gray-100 p-2 rounded">
                  <h3 className="font-semibold mb-1">Transcript</h3>
                  <ul className="space-y-1 max-h-40 overflow-auto">
                    {transcripts[media.transcript_id].map((segment, idx) => (
                      <li key={idx}>{segment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

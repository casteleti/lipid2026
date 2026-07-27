'use client';

import { useRef, useState } from 'react';
import { uploadFile, resolveMediaUrl } from '@/lib/api-client';

interface ImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ label, value, onChange, disabled }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const result = await uploadFile(file);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>}

      {value && (
        <div className="mb-3">
          <img
            src={resolveMediaUrl(value)}
            alt="Preview"
            className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={disabled || uploading}
          className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {uploading && <span className="text-sm text-gray-500">Enviando...</span>}
        {value && !uploading && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-sm text-red-600 hover:underline"
            disabled={disabled}
          >
            Remover
          </button>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-500">JPEG, PNG ou WebP, até 5MB</p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

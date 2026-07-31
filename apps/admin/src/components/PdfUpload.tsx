'use client';

import { useRef, useState } from 'react';
import { uploadFile } from '@/lib/api-client';

export interface PdfFile {
  url: string;
  label: string;
  sizeBytes?: number;
}

interface PdfUploadProps {
  label?: string;
  value: PdfFile[];
  onChange: (files: PdfFile[]) => void;
  disabled?: boolean;
}

function formatarTamanho(bytes?: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Anexos PDF (ficha técnica, especificação, certificado).
 *
 * O `label` nasce do nome do arquivo enviado, mas fica editável: é ele que o visitante vê
 * no botão de download, e "FT_REV03_final.pdf" não serve como rótulo público.
 */
export function PdfUpload({ label, value, onChange, disabled }: PdfUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError('');

    try {
      const enviados = await Promise.all(
        files.map(async (file, i) => ({ i, res: await uploadFile(file) })),
      );
      const novos = enviados
        .sort((a, b) => a.i - b.i)
        .map(({ res }) => ({
          url: res.url,
          label: (res.originalName || res.filename).replace(/\.pdf$/i, ''),
          sizeBytes: res.size,
        }));
      onChange([...value, ...novos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remover = (index: number) => onChange(value.filter((_, i) => i !== index));

  const definirLabel = (index: number, novo: string) =>
    onChange(value.map((f, i) => (i === index ? { ...f, label: novo } : f)));

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>}

      {value.length > 0 && (
        <div className="mb-3 space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.url}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-red-50 text-[10px] font-bold text-red-600">
                PDF
              </span>
              <input
                value={file.label}
                onChange={(e) => definirLabel(index, e.target.value)}
                placeholder="Nome exibido no site"
                disabled={disabled}
                className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="w-16 flex-shrink-0 text-right text-xs text-gray-500">
                {formatarTamanho(file.sizeBytes)}
              </span>
              <button
                type="button"
                onClick={() => remover(index)}
                disabled={disabled}
                className="flex-shrink-0 text-sm text-red-600 hover:underline"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFiles}
          disabled={disabled || uploading}
          className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {uploading && <span className="text-sm text-gray-500">Enviando...</span>}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        Somente PDF, até 20MB cada. O nome fica editável — é o que aparece no site.
      </p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

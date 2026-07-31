'use client';

import { useRef, useState } from 'react';
import { uploadFile, resolveMediaUrl } from '@/lib/api-client';

export interface GalleryImage {
  url: string;
  alt?: string;
}

interface GalleryUploadProps {
  label?: string;
  hint?: string;
  value: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  disabled?: boolean;
}

/**
 * Galeria com upload múltiplo e reordenação.
 *
 * Diferente do ImageUpload (uma imagem só), aqui a ordem importa: é a sequência exibida
 * na ficha pública. Os uploads sobem em paralelo, mas o resultado é reordenado pelo índice
 * original — senão a ordem na tela dependeria de qual arquivo terminou primeiro.
 */
export function GalleryUpload({ label, hint, value, onChange, disabled }: GalleryUploadProps) {
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
      const novas = enviados
        .sort((a, b) => a.i - b.i)
        .map(({ res }) => ({ url: res.url, alt: '' }));
      onChange([...value, ...novas]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remover = (index: number) => onChange(value.filter((_, i) => i !== index));

  const mover = (index: number, direcao: -1 | 1) => {
    const destino = index + direcao;
    if (destino < 0 || destino >= value.length) return;
    const copia = [...value];
    [copia[index], copia[destino]] = [copia[destino], copia[index]];
    onChange(copia);
  };

  const definirAlt = (index: number, alt: string) =>
    onChange(value.map((img, i) => (i === index ? { ...img, alt } : img)));

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>}

      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {value.map((img, index) => (
            <div key={`${img.url}-${index}`} className="rounded-lg border border-gray-200 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(img.url)}
                alt={img.alt || 'Imagem do ingrediente'}
                className="mb-2 h-28 w-full rounded-md border border-gray-100 object-cover"
              />
              <input
                value={img.alt || ''}
                onChange={(e) => definirAlt(index, e.target.value)}
                placeholder="Descrição da imagem (acessibilidade)"
                disabled={disabled}
                className="mb-2 w-full rounded-md border border-gray-300 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => mover(index, -1)}
                  disabled={disabled || index === 0}
                  className="text-gray-600 hover:underline disabled:opacity-30"
                >
                  ← Antes
                </button>
                <button
                  type="button"
                  onClick={() => mover(index, 1)}
                  disabled={disabled || index === value.length - 1}
                  className="text-gray-600 hover:underline disabled:opacity-30"
                >
                  Depois →
                </button>
                <button
                  type="button"
                  onClick={() => remover(index)}
                  disabled={disabled}
                  className="ml-auto text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFiles}
          disabled={disabled || uploading}
          className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {uploading && <span className="text-sm text-gray-500">Enviando...</span>}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {hint || 'JPEG, PNG ou WebP, até 20MB cada. Pode selecionar vários — ou deixar sem imagem.'}
      </p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { uploadFile } from '@/lib/api-client';

export interface MaterialFile {
  url: string;
  label: string;
  sizeBytes?: number;
  mimetype?: string;
}

interface MaterialUploadProps {
  value: MaterialFile[];
  onChange: (files: MaterialFile[]) => void;
  disabled?: boolean;
}

const ACEITOS =
  'application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv';

function rotuloTipo(mimetype?: string): string {
  if (!mimetype) return 'ARQ';
  if (mimetype.includes('pdf')) return 'PDF';
  if (mimetype.includes('presentation') || mimetype.includes('powerpoint')) return 'PPT';
  if (mimetype.includes('spreadsheet') || mimetype.includes('excel')) return 'XLS';
  if (mimetype.includes('csv')) return 'CSV';
  return 'ARQ';
}

function formatarTamanho(bytes?: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Materiais entregues após o formulário (PDF, apresentação, planilha). */
export function MaterialUpload({ value, onChange, disabled }: MaterialUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setEnviando(true);
    setErro('');
    try {
      const enviados = await Promise.all(
        files.map(async (file, i) => ({ i, res: await uploadFile(file) })),
      );
      const novos = enviados
        .sort((a, b) => a.i - b.i)
        .map(({ res }) => ({
          url: res.url,
          label: (res.originalName || res.filename).replace(/\.[^.]+$/, ''),
          sizeBytes: res.size,
          mimetype: res.mimetype,
        }));
      onChange([...value, ...novos]);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setEnviando(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remover = (index: number) => onChange(value.filter((_, i) => i !== index));

  const definirLabel = (index: number, label: string) =>
    onChange(value.map((f, i) => (i === index ? { ...f, label } : f)));

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        Arquivos do material
      </label>

      {value.length > 0 && (
        <div className="mb-3 space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.url}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
            >
              <span className="flex h-9 w-11 flex-shrink-0 items-center justify-center rounded-md bg-primary-50 text-[10px] font-bold text-primary-700">
                {rotuloTipo(file.mimetype)}
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
          accept={ACEITOS}
          onChange={handleFiles}
          disabled={disabled || enviando}
          className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {enviando && <span className="text-sm text-gray-500">Enviando...</span>}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        PDF, PPT/PPTX, XLS/XLSX ou CSV, até 20MB cada. O visitante só recebe o link depois de
        preencher o formulário.
      </p>
      {erro && <p className="mt-1 text-sm text-red-600">{erro}</p>}
    </div>
  );
}

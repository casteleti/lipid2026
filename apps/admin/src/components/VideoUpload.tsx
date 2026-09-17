'use client';

import { useRef, useState } from 'react';
import { uploadFile } from '@/lib/api-client';

export interface PartnerVideo {
  url: string;
  title?: string;
  /** Capa do player — só para arquivo próprio; o YouTube já traz a dele. */
  poster?: string;
  sizeBytes?: number;
}

interface VideoUploadProps {
  label?: string;
  value: PartnerVideo[];
  onChange: (videos: PartnerVideo[]) => void;
  disabled?: boolean;
}

const YOUTUBE_RE = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

function formatarTamanho(bytes?: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Vídeos da página do parceiro. Dois caminhos para o mesmo campo: enviar um MP4 (fica
 * hospedado no site, sem moldura do YouTube) ou colar um link do YouTube. Cada item tem
 * título editável — é a legenda que aparece sob o player — e, no caso de arquivo, uma
 * capa opcional, também enviada por aqui.
 *
 * O MP4 precisa chegar já preparado para web (H.264, ~1-2 Mbps, `faststart`): o limite
 * de upload é 60MB e um master de câmera passa disso fácil. Ver videos/LEIA-ME.md.
 */
export function VideoUpload({ label, value, onChange, disabled }: VideoUploadProps) {
  const videoRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [posterDe, setPosterDe] = useState<number | null>(null);
  const [linkYoutube, setLinkYoutube] = useState('');
  const [error, setError] = useState('');

  const patch = (index: number, mudanca: Partial<PartnerVideo>) =>
    onChange(value.map((v, i) => (i === index ? { ...v, ...mudanca } : v)));

  const remover = (index: number) => onChange(value.filter((_, i) => i !== index));

  const mover = (index: number, delta: -1 | 1) => {
    const alvo = index + delta;
    if (alvo < 0 || alvo >= value.length) return;
    const copia = [...value];
    [copia[index], copia[alvo]] = [copia[alvo], copia[index]];
    onChange(copia);
  };

  const enviarVideos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const enviados = await Promise.all(files.map(async (f, i) => ({ i, res: await uploadFile(f) })));
      const novos = enviados
        .sort((a, b) => a.i - b.i)
        .map(({ res }) => ({
          url: res.url,
          title: (res.originalName || res.filename).replace(/\.mp4$/i, '').replace(/[-_]+/g, ' '),
          sizeBytes: res.size,
        }));
      onChange([...value, ...novos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setUploading(false);
      if (videoRef.current) videoRef.current.value = '';
    }
  };

  const enviarPoster = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPosterDe(index);
    setError('');
    try {
      const res = await uploadFile(file);
      patch(index, { poster: res.url });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload da capa');
    } finally {
      setPosterDe(null);
      e.target.value = '';
    }
  };

  const adicionarYoutube = () => {
    const url = linkYoutube.trim();
    if (!url) return;
    if (!YOUTUBE_RE.test(url)) {
      setError('Isso não parece um link do YouTube (watch?v=, youtu.be/, embed/ ou shorts/).');
      return;
    }
    setError('');
    onChange([...value, { url, title: '' }]);
    setLinkYoutube('');
  };

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>}

      {value.length > 0 && (
        <div className="mb-3 space-y-2">
          {value.map((video, index) => {
            const ehYoutube = YOUTUBE_RE.test(video.url);
            return (
              <div key={`${video.url}-${index}`} className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                      ehYoutube ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    {ehYoutube ? 'YT' : 'MP4'}
                  </span>
                  <input
                    value={video.title ?? ''}
                    onChange={(e) => patch(index, { title: e.target.value })}
                    placeholder="Título exibido sob o vídeo"
                    disabled={disabled}
                    className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="w-16 flex-shrink-0 text-right text-xs text-gray-500">
                    {formatarTamanho(video.sizeBytes)}
                  </span>
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <button type="button" onClick={() => mover(index, -1)} disabled={disabled || index === 0} className="px-1 text-gray-500 hover:text-gray-900 disabled:opacity-30" aria-label="Mover para cima">↑</button>
                    <button type="button" onClick={() => mover(index, 1)} disabled={disabled || index === value.length - 1} className="px-1 text-gray-500 hover:text-gray-900 disabled:opacity-30" aria-label="Mover para baixo">↓</button>
                  </div>
                  <button type="button" onClick={() => remover(index)} disabled={disabled} className="flex-shrink-0 text-sm text-red-600 hover:underline">
                    Remover
                  </button>
                </div>

                {!ehYoutube && (
                  <div className="mt-2 flex items-center gap-3 pl-12 text-xs text-gray-600">
                    <span className="truncate" title={video.url}>{video.url}</span>
                    <span className="flex-shrink-0">·</span>
                    <label className="flex-shrink-0 cursor-pointer text-primary-700 hover:underline">
                      {posterDe === index ? 'Enviando capa...' : video.poster ? 'Trocar capa' : 'Adicionar capa'}
                      <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={disabled || posterDe !== null} onChange={(e) => enviarPoster(index, e)} />
                    </label>
                    {video.poster && (
                      <button type="button" onClick={() => patch(index, { poster: undefined })} disabled={disabled} className="flex-shrink-0 text-gray-500 hover:underline">
                        remover capa
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={videoRef}
          type="file"
          multiple
          accept="video/mp4"
          onChange={enviarVideos}
          disabled={disabled || uploading}
          className="text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {uploading && <span className="text-sm text-gray-500">Enviando vídeo...</span>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={linkYoutube}
          onChange={(e) => setLinkYoutube(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); adicionarYoutube(); } }}
          placeholder="ou cole um link do YouTube"
          type="url"
          disabled={disabled}
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button type="button" onClick={adicionarYoutube} disabled={disabled || !linkYoutube.trim()} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40">
          Adicionar
        </button>
      </div>

      <p className="mt-1 text-xs text-gray-500">
        MP4 preparado para web (H.264, até 60MB) ou link do YouTube. O título fica editável — é a legenda sob o player.
      </p>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

import clsx from 'clsx';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { resolveAssetUrl } from '@/lib/api';
import { GridBackdrop } from '@/components/ui/GridBackdrop';

interface ImageSlotProps {
  imageUrl?: string | null;
  imageHint?: string | null;
  alt: string;
  className?: string;
  /** Leve inclinação/flutuação — desligar em grids compactos (ex. bento) onde soma ruído. */
  float?: boolean;
}

/**
 * Área reservada para imagem. Enquanto ninguém sobe um arquivo real (imageUrl vazio), mostra
 * a legenda do que deveria entrar ali (imageHint) — cadastrada pelo editorial no painel, não
 * hardcoded aqui. Assim que o CMS grava um imageUrl, esta mesma área passa a mostrar a foto.
 */
export function ImageSlot({ imageUrl, imageHint, alt, className, float = true }: ImageSlotProps) {
  if (imageUrl) {
    return (
      <div
        className={clsx(
          'group relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-black/[0.06] bg-gray-100 shadow-[0_40px_60px_-30px_rgba(15,23,42,0.25)] transition-transform duration-700 ease-brand',
          float && 'hover:-translate-y-1.5',
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveAssetUrl(imageUrl)}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'relative isolate flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[24px] border-2 border-dashed border-primary-200 bg-primary-50/50 p-8 text-center',
        className,
      )}
      aria-hidden
    >
      <GridBackdrop />
      <HiOutlinePhoto className="relative h-8 w-8 text-primary-300" />
      <p className="relative max-w-[26ch] text-xs font-medium leading-relaxed text-primary-500">
        {imageHint || 'Área reservada para imagem — a definir.'}
      </p>
    </div>
  );
}

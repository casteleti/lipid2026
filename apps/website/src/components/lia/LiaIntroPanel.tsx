import {
  HiOutlineMagnifyingGlassCircle,
  HiOutlineCommandLine,
  HiOutlineSparkles,
  HiOutlineViewfinderCircle,
  HiXMark,
  HiOutlineLockClosed,
  HiArrowRight,
} from 'react-icons/hi2';
import { LiaAvatar } from './LiaAvatar';

const CAPACIDADES = [
  { Icone: HiOutlineMagnifyingGlassCircle, texto: 'Encontre ingredientes ideais' },
  { Icone: HiOutlineCommandLine, texto: 'Compare soluções técnicas' },
  { Icone: HiOutlineSparkles, texto: 'Receba recomendações personalizadas' },
  { Icone: HiOutlineViewfinderCircle, texto: 'Acesse dados e aplicações' },
];

export function LiaIntroPanel({ onClose, onStart }: { onClose: () => void; onStart: () => void }) {
  return (
    <div className="flex w-[380px] max-w-[calc(100vw-2.5rem)] flex-col rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35),0_8px_24px_-12px_rgba(15,23,42,0.15)]">
      <div className="mb-4 flex items-start justify-between">
        <LiaAvatar tamanho="md" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <HiXMark className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-1 flex items-center gap-2.5">
        <h2 className="text-2xl font-extrabold text-gray-900">Olá, sou a Lia</h2>
        <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
          Beta
        </span>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-gray-600">
        Sou sua assistente técnica inteligente para seleção e aplicação de ingredientes.
      </p>

      <ul className="mb-6 space-y-4">
        {CAPACIDADES.map(({ Icone, texto }) => (
          <li key={texto} className="flex items-center gap-3">
            <Icone className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span className="text-sm font-medium text-gray-800">{texto}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="group flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-4 text-base font-bold text-white transition-colors duration-300 hover:bg-primary-700"
      >
        Conversar com a Lia
        <HiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
        <HiOutlineLockClosed className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Respostas baseadas apenas em nosso catálogo e conhecimento técnico validado.
      </p>
    </div>
  );
}

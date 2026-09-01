'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * CTA "Fale com um especialista" do header, com rede de partículas no hover.
 *
 * Valores de cor, medida e timing vêm do handoff em design_handoff_botao_especialista/,
 * marcado como hi-fi. Dois deles não têm token no tailwind.config: o azul de hover
 * (#16306f cai entre primary-700 e primary-800) e a cor das partículas (#8fb6ff é mais
 * claro que primary-300). Ficaram como valor arbitrário de propósito — criar um token
 * novo para um botão só polui a paleta.
 *
 * Diferença consciente em relação aos demais CTAs: `Button` com variant="primary" faz o
 * hover com um véu em gradiente (primary-600 → primary-500). Aqui o hover é chapado, como
 * pede o handoff. Este botão é o único do site que se comporta assim.
 */

const COR_PARTICULA = '#8fb6ff';
const QTD_PARTICULAS = 26;

/** Distância máxima, em px, para dois pontos serem ligados por uma linha. */
const ALCANCE_LINHA = 46;

/** Passo da interpolação da intensidade — é o que dá o fade de entrada e de saída. */
const SUAVIZACAO = 0.09;

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Fase da cintilação, para as partículas não pulsarem todas juntas. */
  fase: number;
}

export function BotaoEspecialista({
  href,
  children,
  onClick,
  tabIndex,
  className,
  compacto = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  tabIndex?: number;
  className?: string;
  /** Estado flutuante do header: o botão encolhe junto com a barra, a logo e o menu. */
  compacto?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** 1 enquanto o ponteiro ou o foco está no botão. Ref, não state: muda a cada frame. */
  const alvo = useRef(0);
  /** Religa o laço quando ele se encerrou por falta de hover. Definido pelo efeito. */
  const ligar = useRef<() => void>(() => {});
  const [semAnimacao, setSemAnimacao] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aplicar = () => setSemAnimacao(mq.matches);
    aplicar();
    mq.addEventListener('change', aplicar);
    return () => mq.removeEventListener('change', aplicar);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || semAnimacao) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rgb = [1, 3, 5]
      .map((i) => parseInt(COR_PARTICULA.slice(i, i + 2), 16))
      .join(',');

    let largura = 0;
    let altura = 0;
    let particulas: Particula[] = [];
    let intensidade = 0;
    let raf: number | null = null;

    const semear = () => {
      particulas = Array.from({ length: QTD_PARTICULAS }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.24,
        r: 0.7 + Math.random() * 1.5,
        fase: Math.random() * Math.PI * 2,
      }));
    };

    const redimensionar = () => {
      const r = canvas.getBoundingClientRect();
      largura = r.width;
      altura = r.height;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particulas.length && largura) semear();
    };

    const quadro = () => {
      intensidade += (alvo.current - intensidade) * SUAVIZACAO;
      ctx.clearRect(0, 0, largura, altura);

      // Fora do hover o laço se encerra, em vez de rodar limpando a tela para sempre:
      // um requestAnimationFrame por header, em toda página, não se paga.
      if (alvo.current === 0 && intensidade < 0.01) {
        raf = null;
        return;
      }

      if (largura) {
        for (const p of particulas) {
          p.x += p.vx;
          p.y += p.vy;
          p.fase += 0.05;
          if (p.x < 0) p.x += largura;
          if (p.x > largura) p.x -= largura;
          if (p.y < 0) p.y += altura;
          if (p.y > altura) p.y -= altura;
        }

        ctx.lineWidth = 0.7;
        for (let i = 0; i < particulas.length; i++) {
          for (let j = i + 1; j < particulas.length; j++) {
            const a = particulas[i];
            const b = particulas[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < ALCANCE_LINHA) {
              const alfa = 0.3 * (1 - d / ALCANCE_LINHA) * intensidade;
              ctx.strokeStyle = `rgba(${rgb},${alfa.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        for (const p of particulas) {
          const brilho = 0.55 + 0.45 * Math.sin(p.fase);
          ctx.fillStyle = `rgba(${rgb},${(0.85 * brilho * intensidade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          // O halo é o que dá a leitura de "molécula" em vez de "poeira".
          ctx.fillStyle = `rgba(${rgb},${(0.12 * brilho * intensidade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(quadro);
    };

    ligar.current = () => {
      if (raf === null) raf = requestAnimationFrame(quadro);
    };

    const observer = new ResizeObserver(redimensionar);
    observer.observe(canvas);
    redimensionar();

    return () => {
      observer.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      ligar.current = () => {};
    };
  }, [semAnimacao]);

  const entrar = useCallback(() => {
    alvo.current = 1;
    ligar.current();
  }, []);

  const sair = useCallback(() => {
    alvo.current = 0;
  }, []);

  return (
    <Link
      href={href}
      onClick={onClick}
      tabIndex={tabIndex}
      onMouseEnter={entrar}
      onMouseLeave={sair}
      onFocus={entrar}
      onBlur={sair}
      className={clsx(
        'relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full',
        // `leading-4` não é enfeite: `text-[15px]` só define o tamanho, e a entrelinha de
        // 1.5 herdada da página empurrava a altura para 53px. Com 16px, 15+16+15 = 46px,
        // que é a medida do handoff.
        //
        // Três faixas de largura, e dentro de cada uma um estado de scroll (`compacto`):
        //
        // - abaixo de `xl` (1000..1279): o rótulo vai em DUAS LINHAS. É o que devolve
        //   largura ao menu nessa faixa e evita cair no hambúrguer antes de 1000px. O
        //   respiro vertical cai junto, senão duas linhas fariam um botão mais alto que a
        //   barra flutuante.
        // - `xl` (1280..1535): uma linha, medida intermediária.
        // - `2xl` para cima: a medida do handoff (46px), onde há espaço de sobra.
        //
        // A entrelinha é controlada no rótulo (ver Header), não aqui: com duas linhas ela
        // precisa ser proporcional, e com uma linha volta a ser fixa em 16px para a altura
        // do botão continuar previsível.
        'bg-[#0f1e46] font-bold tracking-[0.01em] text-white',
        compacto
          ? 'px-[16px] py-[6px] text-[12px] xl:px-[18px] xl:py-[10px] xl:text-[13px] 2xl:px-[26px] 2xl:py-[12px] 2xl:text-[14px]'
          : 'px-[18px] py-[8px] text-[13px] xl:px-[22px] xl:py-[12px] xl:text-[14px] 2xl:px-[30px] 2xl:py-[15px] 2xl:text-[15px]',
        'transition-[background-color,box-shadow,transform,padding,font-size] duration-300 ease-out',
        'hover:-translate-y-px hover:bg-[#16306f] hover:shadow-[0_8px_26px_rgba(20,45,110,0.32)]',
        'focus-visible:-translate-y-px focus-visible:bg-[#16306f]',
        'focus-visible:shadow-[0_8px_26px_rgba(20,45,110,0.32)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className,
      )}
    >
      {/* Só existe quando a animação vai rodar — com movimento reduzido, nem monta. */}
      {!semAnimacao && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
      <span className="relative">{children}</span>
    </Link>
  );
}

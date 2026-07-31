'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface RevealProps {
  children: React.ReactNode;
  /** Atraso em ms, para escalonar itens de uma mesma linha. */
  delay?: number;
  className?: string;
}

/**
 * Anima a entrada quando o elemento aparece na viewport.
 *
 * A classe `.reveal` do globals.css anima no mount — numa página longa isso queima a
 * animação enquanto o bloco ainda está fora da tela. Aqui a transição só dispara quando o
 * IntersectionObserver confirma a visibilidade, e o observer é desconectado em seguida
 * (é animação de entrada, não deve repetir ao rolar de volta).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem suporte a IntersectionObserver, mostra direto em vez de esconder pra sempre.
    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx('reveal-on-scroll', visivel && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

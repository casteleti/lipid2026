'use client';

import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';

/**
 * Frase curta e centralizada que se revela palavra a palavra ao entrar na dobra.
 *
 * Valores vêm do handoff em frase-por-frase/design_handoff_frase_palavra_a_palavra/,
 * marcado como hi-fi: desfoque inicial de 9px, deslocamento de 20px, 800ms com
 * cubic-bezier(.22,.61,.36,1) e 45ms de escalonamento por palavra. O estado das palavras
 * está em globals.css (`.frase-palavra`), junto do `.reveal-on-scroll`.
 *
 * Diferença deliberada em relação ao README: ele manda terminar cada palavra com `&nbsp;`
 * e, duas linhas depois, exige que a frase quebre naturalmente em 2–3 linhas. As duas
 * coisas não convivem — entre `<span>` de `display:inline-block` só existe oportunidade de
 * quebra se houver espaço comum entre eles, e o nbsp é justamente o espaço que não quebra.
 * Com `&nbsp;` a frase vira uma linha só e estoura o container. Aqui vai um espaço normal
 * entre os spans, que dá o mesmo respiro E preserva a quebra.
 */

/** ms entre uma palavra e a seguinte. O handoff permite de 15 a 110. */
const ESCALONAMENTO_MS = 45;

export function FraseRevelada({
  texto,
  stagger = ESCALONAMENTO_MS,
  className,
}: {
  texto: string;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [revelada, setRevelada] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem IntersectionObserver, mostra direto em vez de esconder para sempre.
    if (typeof IntersectionObserver === 'undefined') {
      setRevelada(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevelada(true);
          } else if (e.boundingClientRect.top > 0) {
            // Rearma só quando a frase sai por baixo, ou seja, quando o usuário voltou
            // para cima. Se ela saiu por cima é porque já foi lida — apagar ali faria a
            // frase piscar toda vez que alguém rolasse de volta ao fim da página.
            setRevelada(false);
          }
        }
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const palavras = texto.split(/\s+/).filter(Boolean);

  return (
    <p
      ref={ref}
      className={clsx(
        'mx-auto max-w-[860px] text-center font-bold text-[#0f1e46] [text-wrap:pretty]',
        'text-[25px] leading-[1.34] md:text-[34px]',
        revelada && 'frase-revelada',
        className,
      )}
    >
      {palavras.map((palavra, i) => (
        <Fragment key={i}>
          <span
            className="frase-palavra"
            // Zerado enquanto oculta: o rearme precisa ser instantâneo, senão a cascata
            // roda de novo ao contrário quando o usuário sobe a página.
            style={{ transitionDelay: revelada ? `${i * stagger}ms` : '0ms' }}
          >
            {palavra}
          </span>
          {/* Espaço explícito: o JSX descarta a quebra de linha entre elementos, e um
              espaço no fim do inline-block seria aparado. É este nó que dá o respiro
              entre as palavras e, ao mesmo tempo, a oportunidade de quebra de linha. */}
          {' '}
        </Fragment>
      ))}
    </p>
  );
}

import clsx from 'clsx';

/**
 * Logotipo do header. Expandido mostra símbolo + LIPID + a hairline "ingredients"; ao
 * colapsar, o "ingredients" evapora primeiro e as letras somem uma a uma da esquerda para a
 * direita, subindo, girando e desfocando. Só então o bloco do wordmark fecha a largura. O
 * símbolo não anima: mesmo tamanho, mesma posição, sem rotação.
 *
 * Geometria e tempos vêm do handoff em Logo_Lipid/efeito-logo/design_handoff_logo_header/,
 * marcado como hi-fi. As posições em % são a geometria do vetor oficial, não espaçamento
 * arbitrário — por isso escalar é mexer só em `simbolo`: as porcentagens não mudam.
 *
 * Os SVGs são recortes do vetor oficial (mesmo desenho, viewBox diferente) e estão em
 * public/logo/pecas/. Cada arquivo carrega o vetor inteiro e mostra só a sua janela, então
 * os sete somam ~150 KB de geometria repetida — cacheado no primeiro load, mas há espaço
 * para otimizar depois com um <use> apontando para um símbolo único.
 */

/**
 * Proporções do lockup, tiradas do README: símbolo 62, wordmark 148 × 61.6, gap 10.
 * Tudo é derivado de `--logo-sim` por calc(), e não de um número em JS, para o tamanho poder
 * mudar por media query sem duplicar o componente — a primeira versão renderizava dois
 * logos (um mobile, um desktop) e pagava dois downloads de cada peça.
 */
const LARGURA_WORDMARK = 'calc(var(--logo-sim) * 2.38710)';
const ALTURA_WORDMARK = 'calc(var(--logo-sim) * 0.99355)';
const GAP = 'calc(var(--logo-sim) * 0.16129)';

/** ms entre uma letra e a seguinte. */
const CASCATA = 55;

const LETRAS = [
  { arquivo: 'lipid-letter-l.svg', left: '0%', width: '21.9%' },
  { arquivo: 'lipid-letter-i1.svg', left: '28.58%', width: '3.11%' },
  { arquivo: 'lipid-letter-p.svg', left: '38.11%', width: '23.35%' },
  { arquivo: 'lipid-letter-i2.svg', left: '67.63%', width: '3.11%' },
  { arquivo: 'lipid-letter-d.svg', left: '76.93%', width: '23.06%' },
];

export function LogoLipid({ colapsado, className }: { colapsado: boolean; className?: string }) {
  return (
    <span
      className={clsx(
        // `--logo-sim` é o lado do símbolo e a única medida a mexer para escalar o logo:
        // largura, altura e gap saem dela pelas razões acima.
        'flex items-end [--logo-sim:36px] md:[--logo-sim:44px]',
        colapsado && 'logo-colapsado',
        className,
      )}
      style={{ gap: GAP }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/pecas/lipid-symbol.svg"
        alt="Lipid"
        width={62}
        height={62}
        style={{ width: 'var(--logo-sim)', height: 'var(--logo-sim)' }}
        className="block shrink-0"
      />

      <span
        className="logo-wordmark relative block shrink-0"
        style={{
          width: LARGURA_WORDMARK,
          height: ALTURA_WORDMARK,
          maxWidth: colapsado ? 0 : LARGURA_WORDMARK,
          // Fecha depois das letras sumirem (5 × 55 + 120) e reabre na frente delas.
          transitionDelay: colapsado ? `${5 * CASCATA + 120}ms` : '0ms',
        }}
      >
        {LETRAS.map((letra, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={letra.arquivo}
            src={`/logo/pecas/${letra.arquivo}`}
            // Decorativas de propósito: o símbolo já carrega o nome da marca, e sem isto o
            // leitor de tela soletraria L-I-P-I-D.
            alt=""
            aria-hidden
            className="logo-letra absolute top-0"
            style={{
              left: letra.left,
              width: letra.width,
              height: '55.3%',
              // Some da esquerda para a direita; volta da direita para a esquerda.
              transitionDelay: colapsado
                ? `${i * CASCATA + 60}ms`
                : `${(LETRAS.length - 1 - i) * CASCATA}ms`,
            }}
          />
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/pecas/lipid-ingredients.svg"
          alt=""
          aria-hidden
          className="logo-hairline absolute"
          style={{
            left: '38.05%',
            top: '65.75%',
            width: '60.83%',
            height: '34.25%',
            // Primeira a sair, última a voltar.
            transitionDelay: colapsado ? '0ms' : `${5 * CASCATA + 60}ms`,
          }}
        />
      </span>
    </span>
  );
}

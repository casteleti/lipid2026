import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { FraseRevelada } from '@/components/ui/FraseRevelada';
import { CardSegmento } from '@/components/segmentos/CardSegmento';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { PageViewTracker } from '@/components/segmentos/PageViewTracker';
import { SegmentProjectForm } from '@/components/segmentos/SegmentProjectForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

/** Os 3 beats da seção comercial — iguais nos quatro segmentos, por desenho. */
const ETAPAS_VENDA = ['O contexto', 'Como trabalhamos', 'O que muda'] as const;

/**
 * Artes da dobra, por segmento. São duas composições da mesma linha de produto — uma
 * panorâmica, com o produto à direita do texto, e uma retrato, com o produto embaixo dele.
 * As duas saem de scripts/gerar-banners-segmentos/gerar.py.
 *
 * `reservaMobile` é o espaço que o texto precisa deixar livre embaixo para não cair em cima
 * dos frascos, em PORCENTAGEM DA LARGURA da tela — a unidade certa porque a arte entra com
 * a largura toda e a proporção natural, então a altura do produto acompanha a largura, não
 * a altura da dobra. O gerador mede esse número em cada arte e o imprime; ele varia muito
 * (a veterinária tem os produtos bem mais baixos que a farmacêutica), e um valor único
 * deixaria um vão morto entre o texto e o produto em três das quatro páginas.
 */
const ARTES_SEGMENTO: Record<
  string,
  { mobile: string; banner: string; reservaMobile: number; alt: string }
> = {
  farmaceutica: {
    mobile: '/segmentos/banner-farmaceutica-mobile.webp',
    banner: '/segmentos/banner-farmaceutica.webp',
    reservaMobile: 73,
    alt: 'Linha farmacêutica em embalagens azul-claro com logo LIPID dourado: caixas, frasco de cápsulas, frasco com válvula pump, conta-gotas, pote de creme e blíster',
  },
  cosmetica: {
    mobile: '/segmentos/banner-cosmetica-mobile.webp',
    banner: '/segmentos/banner-cosmetica.webp',
    reservaMobile: 61,
    alt: 'Linha de skincare em frascos azul-claro com logo LIPID em dourado: bisnaga, sérum conta-gotas, tônico, loção com pump e pote de creme',
  },
  nutricional: {
    mobile: '/segmentos/banner-nutricional-mobile.webp',
    banner: '/segmentos/banner-nutricional.webp',
    reservaMobile: 68,
    alt: 'Linha nutricional em embalagens azul-claro com logo LIPID dourado: frasco de cápsulas, sachê stick, pouch, pote e jarra de proteína',
  },
  veterinaria: {
    mobile: '/segmentos/banner-veterinaria-mobile.webp',
    banner: '/segmentos/banner-veterinaria.webp',
    reservaMobile: 47,
    alt: 'Linha veterinária em embalagens brancas com detalhe azul: caixas, frasco-ampola âmbar, blíster de comprimidos, conta-gotas, spray e bisnaga',
  },
};

interface SegmentPageData {
  id: string;
  slug: string;
  sector: string;
  active: boolean;
  eyebrow: string | null;
  h1: string | null;
  subheadline: string | null;
  salesParagraphs: string[] | null;
  applicationsTitle: string | null;
  applicationsIntro: string | null;
  applications: { title: string; description: string }[] | null;
  floatingHighlight: string | null;
  ingredientExplorerHeadline: string | null;
  ingredientExplorerSupportingText: string | null;
  formEyebrow: string | null;
  formTitle: string | null;
  formDescription: string | null;
  formValueProposition: string | null;
  formCtaLabel: string | null;
  formSuccessMessage: string | null;
  formChallengeOptions: string[] | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
}

async function getSegmentPage(slug: string): Promise<SegmentPageData | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/segment-pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getAllSegmentPages(): Promise<SegmentPageData[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/segment-pages`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getSegmentPage(params.slug);
  if (!page) return { title: 'Segmento não encontrado' };

  return {
    title: page.seoTitle || page.h1 || page.slug,
    description: page.seoDescription || undefined,
    keywords: page.seoKeywords || undefined,
    openGraph: { title: page.seoTitle || page.h1 || page.slug, description: page.seoDescription || undefined },
  };
}

export default async function SegmentoPage({ params }: { params: { slug: string } }) {
  const page = await getSegmentPage(params.slug);
  if (!page || !page.active) notFound();

  const outros = (await getAllSegmentPages()).filter((p) => p.slug !== page.slug && p.active);
  const arte = ARTES_SEGMENTO[page.slug];

  return (
    <>
      <PageViewTracker route={`/segmentos/${page.slug}`} sector={page.sector} />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white">
        {/* A partir de xl o banner sangra de borda a borda. Ele ocupa a largura inteira e é
            ancorado embaixo, com a proporção natural do arquivo (2.5:1) — de propósito, em
            vez de `object-cover` sobre a dobra toda.
            Motivo: com `cover`, a altura da imagem passa a ser a da dobra, e a dobra cresce
            conforme o tamanho do h1. Na nutricional, cujo título ocupa cinco linhas, isso
            ampliava a foto a ponto de o pote de creatina encostar no texto. Assim o tamanho
            do produto depende só da largura da tela, e os frascos ficam sempre em 63%..94%. */}
        {arte && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 xl:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={arte.banner} alt={arte.alt} className="w-full" />
            {/* Dissolve as bordas da foto no branco da dobra. Quando a dobra é mais baixa que
                a imagem, estas faixas saem junto no corte — e aí não há emenda nenhuma. */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
          </div>
        )}

        {/* Abaixo de xl entra a arte retrato, sangrando de borda a borda com o produto
            ancorado no rodapé da dobra — é para isso que ela foi composta, com o topo vazio
            reservado ao texto. O corte continua em xl, e não em lg, porque entre 1024 e 1279
            o header já está em modo hambúrguer e o h1 de 72px não caberia numa coluna de
            metade da tela ao lado da panorâmica.

            A arte entra com a largura toda e a proporção natural (0.583:1), o que a deixa
            sempre mais alta que a dobra — ela transborda para cima e o `overflow-hidden` da
            seção corta. Isso é de propósito: garante que o produto fique inteiro e nunca
            seja cortado nas laterais, o que aconteceria com `object-cover` assim que um
            título mais longo fizesse a dobra passar da altura da imagem.

            Vem ANTES do texto no DOM pelo mesmo motivo que a panorâmica: os dois são
            absolutos, e é a ordem do documento que decide quem pinta por cima. Resolver
            isso com z-index negativo joga a arte para trás do gradiente da própria seção,
            que é opaco — a imagem some. */}
        {arte && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 xl:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={arte.mobile} alt={arte.alt} className="w-full" />
            {/* Dissolve o corte do topo no fundo da página. */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
          </div>
        )}

        {/* A largura do texto é conferida, não estimada: `container-main` é max-w-7xl com
            px-8, e os frascos começam em 61% da tela — independente da altura da dobra.
            Medido na página: em 1280 o texto acaba em 704px e o produto começa em 781px
            (calha de 77px); em 1512, 820px e 922px (102px). `max-w-2xl` cabe nos dois.

            Abaixo de xl a reserva embaixo sai de `reservaMobile` (ver ARTES_SEGMENTO): a
            porcentagem vale sobre a LARGURA da seção, que é a mesma largura da arte, então
            texto e produto nunca se encontram por mais que o título cresça. */}
        <div
          className="container-main relative flex items-center pt-16 pb-[var(--reserva-produto)] md:pt-24 xl:min-h-[620px] xl:py-28"
          style={{ '--reserva-produto': `${arte?.reservaMobile ?? 55}%` } as React.CSSProperties}
        >
          <div className="reveal max-w-2xl">
            {page.eyebrow && <Badge variant="primary">{page.eyebrow}</Badge>}
            <h1 className="mt-6 text-gray-900">{page.h1}</h1>
            {page.subheadline && <p className="mt-6 text-lg text-gray-600">{page.subheadline}</p>}
            <div className="mt-9">
              <Button href="#projeto" variant="primary" size="lg">
                {page.formCtaLabel || 'Compartilhar meu projeto'}
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* ---------------------------------------------------------------- 3 PARÁGRAFOS COMERCIAIS */}
      {/* Os três parágrafos sempre contam a mesma história, nos quatro segmentos:
          o contexto do setor → como a Lipid trabalha → o que o cliente ganha.
          Rotular cada coluna deixa isso explícito e permite ler só o que
          interessa, em vez de encarar três blocos iguais de texto corrido.
          A numeração em mono reaproveita a linguagem já usada nos cards de
          aplicações logo abaixo — mesma família visual, sem inventar estilo.
          Os rótulos só aparecem quando há exatamente 3 parágrafos: com outra
          quantidade a semântica não vale, e rótulo errado é pior que nenhum. */}
      {page.salesParagraphs && page.salesParagraphs.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container-main">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              {page.salesParagraphs.map((p, i) => {
                const rotulo = page.salesParagraphs?.length === 3 ? ETAPAS_VENDA[i] : null;
                return (
                  <div key={i} className="border-t border-gray-200 pt-5">
                    {rotulo && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-bold text-primary-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                          {rotulo}
                        </span>
                      </div>
                    )}
                    <p className={`text-base leading-relaxed text-gray-600 ${rotulo ? 'mt-3' : ''}`}>
                      {p}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- APLICAÇÕES */}
      {page.applications && page.applications.length > 0 && (
        <section className="bg-gray-50 py-20 md:py-24">
          <div className="container-main">
            <div className="max-w-2xl">
              {page.applicationsTitle && <h2 className="text-gray-900">{page.applicationsTitle}</h2>}
              {page.applicationsIntro && <p className="mt-4 text-gray-600">{page.applicationsIntro}</p>}
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.applications.map((app, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <span className="font-mono text-xs font-bold text-primary-400">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-2 font-bold text-gray-900">{app.title}</p>
                  <p className="mt-1.5 text-sm text-gray-600">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- FRASE FLUTUANTE */}
      {page.floatingHighlight && (
        <section className="py-20 md:py-24">
          <div className="container-main">
            {/* Sem o <Reveal/> em volta: a própria FraseRevelada observa a dobra, e as duas
                animações somadas fariam o bloco inteiro subir enquanto as palavras sobem. */}
            <FraseRevelada texto={page.floatingHighlight} />
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- NAVEGADOR DE INGREDIENTES (teaser) */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-main">
          <div className="max-w-2xl">
            {page.ingredientExplorerHeadline && <h2 className="text-gray-900">{page.ingredientExplorerHeadline}</h2>}
            {page.ingredientExplorerSupportingText && (
              <p className="mt-4 text-gray-600">{page.ingredientExplorerSupportingText}</p>
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/ingredientes"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900 hover:text-primary-600"
            >
              Ver catálogo completo de ingredientes
              <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- FORMULÁRIO DO PROJETO */}
      <section id="projeto" className="relative isolate overflow-hidden bg-white py-20 md:py-28">
        <GridBackdrop />
        <div className="container-main relative grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {page.formEyebrow && (
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-600">
                <span className="h-px w-8 bg-primary-600/40" />
                {page.formEyebrow}
              </div>
            )}
            <h2 className="mt-5 text-gray-900">{page.formTitle}</h2>
            {page.formDescription && <p className="mt-4 text-gray-600">{page.formDescription}</p>}
            {page.formValueProposition && (
              <p className="mt-4 border-l-2 border-primary-300 pl-4 text-sm font-medium text-primary-700">
                {page.formValueProposition}
              </p>
            )}
          </div>
          <div className="lg:col-span-6">
            <SegmentProjectForm
              sector={page.sector}
              segmentLabel={page.eyebrow || page.h1 || page.slug}
              challengeOptions={page.formChallengeOptions || []}
              ctaLabel={page.formCtaLabel || 'Compartilhar meu projeto'}
              successMessage={
                page.formSuccessMessage ||
                'Projeto recebido. Nossa equipe técnica fará uma análise inicial e entrará em contato.'
              }
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- SEGMENTOS RELACIONADOS */}
      {outros.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-main">
            <p className="eyebrow mb-6">Outros segmentos atendidos</p>
            {/* Mesmo card da home — arte, numerador e "Explorar" — em vez da caixa só de
                texto que havia aqui. O componente é o mesmo, então os dois não divergem. */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {outros.map((o) => (
                <CardSegmento key={o.slug} slug={o.slug} descricao={o.h1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- DISCLAIMER TÉCNICO */}
      <div className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="container-main">
          <p className="max-w-3xl text-xs text-gray-500">
            As aplicações e famílias de ingredientes apresentadas têm caráter informativo.
            Disponibilidade, especificação, grau, documentação, adequação regulatória e desempenho
            devem ser avaliados para cada projeto.
          </p>
        </div>
      </div>
    </>
  );
}

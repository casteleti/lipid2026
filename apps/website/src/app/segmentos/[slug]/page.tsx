import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { PageViewTracker } from '@/components/segmentos/PageViewTracker';
import { SegmentProjectForm } from '@/components/segmentos/SegmentProjectForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

/**
 * Composição de produtos do segmento, exibida na dobra 1. Asset versionado do site: são quatro
 * segmentos fixos e `SegmentPage` não tem coluna de imagem.
 */
const ARTES_SEGMENTO: Record<string, { src: string; alt: string }> = {
  farmaceutica: {
    src: '/segmentos/farmaceutica.webp',
    alt: 'Linha farmacêutica: frascos conta-gotas, blísteres, cápsulas e solução oral em vidro âmbar',
  },
  cosmetica: {
    src: '/segmentos/cosmetica.webp',
    alt: 'Linha cosmética: perfume, batom, potes de creme, máscara de cílios e sérum',
  },
  nutricional: {
    src: '/segmentos/nutricional.webp',
    alt: 'Linha nutricional: whey protein, creatina, cápsulas e barra proteica ao lado de vesícula lipossomal em corte',
  },
  veterinaria: {
    src: '/segmentos/veterinaria.webp',
    alt: 'Linha veterinária: frascos, sachês e embalagens ao lado de vesícula lipossomal em corte',
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
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white py-20 md:py-28">
        <div className="container-main relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={arte ? 'reveal lg:col-span-7' : 'reveal max-w-3xl lg:col-span-12'}>
            {page.eyebrow && <Badge variant="primary">{page.eyebrow}</Badge>}
            <h1 className="mt-6 text-gray-900">{page.h1}</h1>
            {page.subheadline && <p className="mt-6 max-w-2xl text-lg text-gray-600">{page.subheadline}</p>}
            <div className="mt-9">
              <Button href="#projeto" variant="primary" size="lg">
                {page.formCtaLabel || 'Compartilhar meu projeto'}
              </Button>
            </div>
          </div>

          {arte && (
            <div className="reveal lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arte.src}
                alt={arte.alt}
                className="w-full rounded-2xl drop-shadow-[0_28px_36px_rgba(15,23,42,0.10)]"
              />
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- 3 PARÁGRAFOS COMERCIAIS */}
      {page.salesParagraphs && page.salesParagraphs.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-main">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              {page.salesParagraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
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
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-2xl font-medium leading-snug text-gray-900 md:text-3xl">
                {page.floatingHighlight}
              </p>
            </Reveal>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {outros.map((o) => (
                <Link
                  key={o.slug}
                  href={`/segmentos/${o.slug}`}
                  className="group rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:border-primary-300 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.2)]"
                >
                  <p className="font-bold text-gray-900 group-hover:text-primary-600">{o.h1}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-primary-600">
                    Ver segmento
                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
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

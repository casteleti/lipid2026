import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { FraseRevelada } from '@/components/ui/FraseRevelada';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { PageViewTracker } from '@/components/segmentos/PageViewTracker';
import { TechnologyProjectForm } from '@/components/tecnologias/TechnologyProjectForm';
import { resolveMediaUrl } from '@/lib/api';
import { hrefDaAplicacao } from '@/lib/segmentos';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

/**
 * Ambientação do hero: render 3D esmaecido ao fundo, puramente decorativo. Quem explica a
 * tecnologia são os diagramas vetoriais (`imageOneUrl` / `imageTwoUrl`), que ganharam dobras
 * próprias no corpo da página — o banner ficou só com a promessa, sem concorrência visual.
 */
const AMBIENTE_HERO: Record<string, string> = {
  lipossomas: '/tecnologias/hero-lipossomas.webp',
  fosfolipidios: '/tecnologias/hero-fosfolipidios.webp',
  encapsulacao: '/tecnologias/hero-encapsulacao.webp',
};

interface Technology {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string | null;

  eyebrow: string | null;
  h1: string | null;
  subheadline: string | null;
  heroCtaLabel: string | null;

  imageOneUrl: string | null;
  imageOneAlt: string | null;
  imageOneCaption: string | null;
  imageTwoUrl: string | null;
  imageTwoAlt: string | null;
  imageTwoCaption: string | null;

  essenceTitle: string | null;
  essenceIntro: string | null;
  pillars: { title: string; description: string }[] | null;
  criteriaTitle: string | null;
  criteria: { label: string; description: string }[] | null;
  authorityStatement: string | null;

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

  applications: { application: { id: string; name: string; slug: string } }[];
  ingredients: { ingredient: { id: string; name: string } }[];
}

async function getTechnology(slug: string): Promise<Technology | null> {
  const res = await fetch(`${API_URL}/api/v1/technologies/slug/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return await res.json();
}

async function getRelated(currentSlug: string): Promise<Technology[]> {
  const res = await fetch(`${API_URL}/api/v1/technologies?take=6`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as Technology[]).filter((t) => t.slug !== currentSlug).slice(0, 3);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tech = await getTechnology(params.slug);
  if (!tech) return { title: 'Tecnologia não encontrada' };

  const title = tech.seoTitle || tech.name;
  const description = tech.seoDescription || tech.excerpt || tech.description.slice(0, 160);

  return {
    title,
    description,
    keywords: tech.seoKeywords || [tech.name, 'tecnologia lipídica'],
    openGraph: { title, description },
  };
}

/**
 * A imagem da tecnologia pode vir de dois lugares: um asset estático do próprio site
 * (as ilustrações versionadas em public/tecnologias) ou um upload servido pela API
 * (quando o editorial troca a arte pelo painel). `resolveMediaUrl` só sabe tratar o
 * segundo caso — prefixa tudo com a URL da API —, então a origem é decidida aqui.
 */
function urlDaFigura(url: string): string {
  if (url.startsWith('http') || !url.startsWith('/uploads')) return url;
  return resolveMediaUrl(url);
}

/**
 * Dobra dedicada a uma ilustração técnica. Cada diagrama ocupa uma dobra inteira, centrado e
 * sem texto concorrente ao lado: o vetor já carrega rótulo e título internos, então a única
 * coisa que o acompanha é a legenda — a leitura da figura é o assunto da dobra.
 *
 * O desenho flutua: sem moldura, sem borda, sem sombra. Os SVGs também são transparentes
 * (ver `documento()` em scripts/gerar-ilustracoes-tecnologias/gerar.py) — qualquer caixa
 * aqui voltaria a espremer a arte contra o quadro dela.
 *
 * Os SVGs são 900×560, e `max-w-4xl` (896px) os entrega praticamente em tamanho nativo.
 */
function PranchaTecnica({
  url,
  alt,
  caption,
}: {
  url: string;
  alt: string | null;
  caption: string | null;
}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-main">
        <Reveal className="mx-auto max-w-4xl">
          <figure>
            {/* Vetor servido pelo próprio site — <img> evita o pipeline do next/image, que não
                traz ganho algum para SVG. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlDaFigura(url)} alt={alt || ''} className="w-full" loading="lazy" />
            {caption && (
              <figcaption className="mx-auto mt-7 max-w-2xl text-center text-[15px] leading-relaxed text-gray-500">
                {caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export default async function TechnologyDetailPage({ params }: { params: { slug: string } }) {
  const tech = await getTechnology(params.slug);
  if (!tech) notFound();

  const route = `/tecnologias/${tech.slug}`;
  const related = await getRelated(tech.slug);
  const pillars = tech.pillars || [];
  const criteria = tech.criteria || [];

  return (
    <>
      <PageViewTracker route={route} />

      {/* ============================================================ DOBRA 1 — HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white py-24 md:py-32">
        {AMBIENTE_HERO[tech.slug] && (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AMBIENTE_HERO[tech.slug]}
              alt=""
              className="h-full w-full object-cover opacity-[0.45]"
            />
            {/* No celular a elipse do véu cobre uma fração muito menor da tela (o recorte do
                object-cover é vertical), e a arte subia por trás do parágrafo. Esta camada
                chapada só existe abaixo de md. */}
            <div className="absolute inset-0 bg-white/45 md:bg-transparent" />
            {/* Sem o diagrama ao lado, o texto passou a ocupar o centro — então o véu deixou
                de ser um degradê da esquerda para a direita e virou radial: opaco onde a frase
                está, aberto nas bordas, onde a arte pode aparecer inteira. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 72% 68% at 50% 46%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 42%, rgba(255,255,255,0.30) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </div>
        )}
        <div className="container-main relative">
          <div className="reveal mx-auto flex max-w-3xl flex-col items-center text-center">
            <Link
              href="/tecnologias"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-primary-600"
            >
              ← Tecnologias
            </Link>
            {tech.eyebrow && <Badge variant="primary">{tech.eyebrow}</Badge>}
            {/* Sem tamanho local: a escala global do h1 encolheu e já é a medida que este
                título precisava — manter o override aqui só criaria duas escalas parecidas. */}
            <h1 className="mt-6 text-gray-900">{tech.h1 || tech.name}</h1>
            {tech.subheadline && (
              <p className="mt-6 text-lg leading-relaxed text-gray-600">{tech.subheadline}</p>
            )}
            <div className="mt-9">
              <Button href="#projeto" variant="primary" size="lg">
                {tech.heroCtaLabel || 'Falar com um especialista'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================ DOBRA 2 — A FIGURA, SOZINHA */}
      {tech.imageOneUrl && (
        <PranchaTecnica
          url={tech.imageOneUrl}
          alt={tech.imageOneAlt}
          caption={tech.imageOneCaption}
        />
      )}

      {/* ==================================================== DOBRA 3 — ESSÊNCIA TÉCNICA */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="container-main">
          <div className="mx-auto max-w-3xl text-center">
            {tech.essenceTitle && <h2 className="text-gray-900">{tech.essenceTitle}</h2>}
            {tech.essenceIntro && (
              <p className="mt-5 text-lg leading-relaxed text-gray-600">{tech.essenceIntro}</p>
            )}
          </div>

          {pillars.length > 0 && (
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
              {pillars.map((pilar, i) => (
                <Reveal key={i} className="border-t border-gray-200 pt-6">
                  <span className="font-mono text-xs font-bold text-primary-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-lg font-bold text-gray-900">{pilar.title}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-gray-600">
                    {pilar.description}
                  </p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================ DOBRA 4 — A SEGUNDA FIGURA, SOZINHA */}
      {tech.imageTwoUrl && (
        <PranchaTecnica
          url={tech.imageTwoUrl}
          alt={tech.imageTwoAlt}
          caption={tech.imageTwoCaption}
        />
      )}

      {/* ========================================================= DOBRA 5 — CRITÉRIOS */}
      {criteria.length > 0 && (
        <section className="bg-gray-50 py-20 md:py-24">
          <div className="container-main">
            <p className="eyebrow text-center">{tech.criteriaTitle || 'O que colocamos na mesa'}</p>
            <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              {criteria.map((item, i) => (
                <Reveal key={i} className="border-l-2 border-primary-200 pl-5">
                  <dt className="font-bold text-gray-900">{item.label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- FRASE DE AUTORIDADE */}
      {tech.authorityStatement && (
        <section className="py-20 md:py-24">
          <div className="container-main">
            {/* Sem o <Reveal/> em volta: a própria FraseRevelada observa a dobra, e as duas
                animações somadas fariam o bloco inteiro subir enquanto as palavras sobem. */}
            <FraseRevelada texto={tech.authorityStatement} />
          </div>
        </section>
      )}

      {/* ========================================================== DOBRA 6 — CONVERSÃO */}
      <section id="projeto" className="relative isolate overflow-hidden bg-white py-20 md:py-24">
        <GridBackdrop />
        <div className="container-main relative grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {tech.formEyebrow && (
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-600">
                <span className="h-px w-8 bg-primary-600/40" />
                {tech.formEyebrow}
              </div>
            )}
            <h2 className="mt-5 text-gray-900">{tech.formTitle || 'Fale com nossa equipe técnica'}</h2>
            {tech.formDescription && (
              <p className="mt-4 leading-relaxed text-gray-600">{tech.formDescription}</p>
            )}
            {tech.formValueProposition && (
              <p className="mt-5 border-l-2 border-primary-300 pl-4 text-sm font-medium text-primary-700">
                {tech.formValueProposition}
              </p>
            )}

            {(tech.applications.length > 0 || tech.ingredients.length > 0) && (
              <div className="mt-10 space-y-6 border-t border-gray-200 pt-8">
                {tech.applications.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Aplicada em</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.applications.map(({ application }) => (
                        <Link
                          key={application.id}
                          href={hrefDaAplicacao(application.slug)}
                          className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-600"
                        >
                          {application.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {tech.ingredients.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Ingredientes relacionados</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.ingredients.slice(0, 8).map(({ ingredient }) => (
                        <span
                          key={ingredient.id}
                          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-600"
                        >
                          {ingredient.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <TechnologyProjectForm
              landingRoute={route}
              technologyLabel={tech.name}
              challengeOptions={tech.formChallengeOptions || []}
              ctaLabel={tech.formCtaLabel || 'Enviar'}
              successMessage={
                tech.formSuccessMessage ||
                'Mensagem recebida. Nossa equipe técnica retornará em breve.'
              }
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- OUTRAS TECNOLOGIAS */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 py-16 md:py-20">
          <div className="container-main">
            <p className="eyebrow mb-6">Outras tecnologias</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.id}
                  href={`/tecnologias/${t.slug}`}
                  className="group rounded-2xl border border-gray-200 p-5 transition-all duration-300 hover:border-primary-300 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.2)]"
                >
                  <p className="font-bold text-gray-900 group-hover:text-primary-600">{t.name}</p>
                  {t.excerpt && <p className="mt-1.5 text-sm text-gray-600">{t.excerpt}</p>}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-primary-600">
                    Ver tecnologia
                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ NOTA REGULATÓRIA */}
      <div className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="container-main">
          <p className="max-w-3xl text-xs leading-relaxed text-gray-500">
            Conteúdo de caráter técnico-informativo. Alegações de absorção, biodisponibilidade,
            direcionamento, liberação prolongada ou desempenho clínico devem ser sustentadas por
            evidências da formulação final e revisadas conforme a categoria e o mercado do produto.
          </p>
        </div>
      </div>
    </>
  );
}

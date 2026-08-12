import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { DetailHero } from '@/components/ui/DetailHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { DownloadGate } from '@/components/conteudo/DownloadGate';
import { RegistrarVisitaConteudo } from '@/components/conteudo/RegistrarVisitaConteudo';
import { resolveMediaUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://daksa.app.br';

interface ContentItem {
  id: string;
  type: 'ARTIGO' | 'DOWNLOAD';
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured: string | null;
  featuredAlt: string | null;
  author: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  categories: { category: { id: string; name: string } }[];
  summaryPoints: { id: string; text: string }[];
  faqs: { id: string; question: string; answer: string }[];
  files: { id: string; url: string; label: string; sizeBytes: number | null; mimetype: string | null }[];
}

async function getContent(slug: string): Promise<ContentItem | null> {
  const res = await fetch(`${API_URL}/api/v1/content/slug/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

async function getRelacionados(slug: string): Promise<ContentItem[]> {
  const res = await fetch(`${API_URL}/api/v1/content/slug/${slug}/relacionados?limite=3`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

/** Remove tags para gerar descrição a partir do corpo quando não há resumo escrito. */
function textoLimpo(html: string, limite = 160): string {
  const texto = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return texto.length > limite ? `${texto.slice(0, limite - 1)}…` : texto;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getContent(params.slug);
  if (!item) return { title: 'Conteúdo não encontrado' };

  const titulo = item.seoTitle || item.title;
  const descricao = item.seoDescription || item.excerpt || textoLimpo(item.content);
  const url = `${SITE_URL}/blog/${item.slug}`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: titulo,
      description: descricao,
      images: item.featured ? [resolveMediaUrl(item.featured)] : undefined,
      publishedTime: item.publishedAt || undefined,
    },
  };
}

export default async function ConteudoDetalhePage({ params }: { params: { slug: string } }) {
  const bruto = await getContent(params.slug);
  if (!bruto) notFound();

  // Defaults nas coleções: resposta em cache anterior a um campo novo não pode derrubar
  // a página inteira.
  const item = {
    ...bruto,
    summaryPoints: bruto.summaryPoints ?? [],
    faqs: bruto.faqs ?? [],
    files: bruto.files ?? [],
    categories: bruto.categories ?? [],
  };

  const relacionados = (await getRelacionados(params.slug)) ?? [];
  const ehDownload = item.type === 'DOWNLOAD';
  const url = `${SITE_URL}/blog/${item.slug}`;

  /**
   * JSON-LD. Article/FAQPage são os formatos que buscadores exibem em destaque e que
   * motores de resposta conseguem citar com atribuição — é o que faz o conteúdo ser
   * reaproveitado corretamente em vez de parafraseado sem crédito.
   */
  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': ehDownload ? 'DigitalDocument' : 'Article',
      headline: item.title,
      name: item.title,
      description: item.seoDescription || item.excerpt || textoLimpo(item.content),
      inLanguage: 'pt-BR',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(item.featured ? { image: [resolveMediaUrl(item.featured)] } : {}),
      ...(item.publishedAt ? { datePublished: item.publishedAt } : {}),
      ...(item.updatedAt ? { dateModified: item.updatedAt } : {}),
      author: { '@type': 'Organization', name: item.author || 'Lipid Ingredients' },
      publisher: { '@type': 'Organization', name: 'Lipid Ingredients' },
    },
  ];

  if (item.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: item.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return (
    <>
      <RegistrarVisitaConteudo slug={item.slug} />
      <script
        type="application/ld+json"
        // Conteúdo gerado por nós a partir do banco, não entrada de terceiros.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Mesmo hero das outras páginas de detalhe (ver /parceiros/<slug>). Antes daqui o
          bloco era `container-main mx-auto max-w-3xl`: isso centrava o conteúdo DENTRO do
          container e fazia o título começar ~380px para dentro, desalinhado de todos os
          outros heros do site, que encostam na borda do container. */}
      <DetailHero
        backHref="/blog"
        backLabel="Conteúdo técnico"
        badge={ehDownload ? 'Material para download' : 'Artigo'}
        badgeVariant={ehDownload ? 'dark' : 'primary'}
        badgeExtra={
          item.categories.length > 0
            ? item.categories.map((c) => c.category.name).join(', ')
            : null
        }
        title={item.title}
        description={item.excerpt}
      >
        {(item.author || item.publishedAt) && (
          <p className="text-sm text-gray-500">
            {item.author && <span>{item.author}</span>}
            {item.author && item.publishedAt && ' · '}
            {item.publishedAt &&
              new Date(item.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
          </p>
        )}
      </DetailHero>

      <article className="py-16 md:py-20">
        <div
          className={
            ehDownload
              ? 'container-main grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,63fr)_minmax(0,37fr)] lg:gap-12'
              : 'mx-auto max-w-3xl px-4 md:px-6 lg:px-8'
          }
        >
          <div className="space-y-10">
            {item.featured && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={resolveMediaUrl(item.featured)}
                  alt={item.featuredAlt || item.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Resumo em tópicos — some inteiro quando não há tópicos cadastrados. */}
            {item.summaryPoints.length > 0 && (
              <Reveal>
                <div className="rounded-[20px] border border-primary-100 bg-primary-50/50 p-7">
                  <h2 className="text-base font-bold uppercase tracking-wide text-primary-900">
                    O que você vai encontrar
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {item.summaryPoints.map((p) => (
                      <li key={p.id} className="flex gap-3 text-gray-700">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        <span className="leading-relaxed">{p.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {item.content && (
              <div
                className="artigo-conteudo max-w-none text-gray-700"
                // HTML do editor do painel — origem interna e autenticada, não entrada pública.
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}

            {/* FAQ — some inteiro quando não há perguntas. */}
            {item.faqs.length > 0 && (
              <Reveal>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">Perguntas frequentes</h2>
                  <div className="space-y-3">
                    {item.faqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group rounded-[18px] border border-gray-200 bg-white p-5 transition-colors hover:border-primary-200"
                      >
                        <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:hidden">
                          <span className="flex items-start justify-between gap-4">
                            {faq.question}
                            <span
                              aria-hidden
                              className="mt-0.5 flex-shrink-0 text-primary-500 transition-transform duration-300 group-open:rotate-45"
                            >
                              +
                            </span>
                          </span>
                        </summary>
                        <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {ehDownload && (
            <Reveal delay={120}>
              <aside className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-[24px] bg-primary-950 p-7 shadow-[0_40px_80px_-40px_rgba(10,21,51,0.8)] md:p-8">
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/25 blur-[70px]" />
                    <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-400/15 blur-[70px]" />
                  </div>

                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                      Receba o material
                    </p>
                    <p className="mt-3 text-lg font-medium leading-relaxed text-white md:text-xl">
                      Preencha para liberar o download.
                    </p>
                    <div className="my-7 h-px bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

                    {/* Só nome e tamanho vão para o cliente — a URL fica na API até o
                        lead existir, senão o material sairia no código-fonte da página. */}
                    <DownloadGate
                      contentId={item.id}
                      contentSlug={item.slug}
                      contentTitle={item.title}
                      arquivos={item.files.map((f) => ({
                        id: f.id,
                        label: f.label,
                        sizeBytes: f.sizeBytes,
                      }))}
                    />
                  </div>
                </div>
              </aside>
            </Reveal>
          )}
        </div>
      </article>

      {relacionados.length > 0 && (
        <Section variant="light">
          <Reveal>
            <p className="eyebrow">Continue lendo</p>
            <h2 className="mt-3 text-gray-900">Conteúdos relacionados</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((rel, i) => (
              <Reveal key={rel.id} delay={i * 90}>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-black/[0.05] bg-white transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_40px_60px_-30px_rgba(15,23,42,0.22)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {rel.featured ? (
                      <Image
                        src={resolveMediaUrl(rel.featured)}
                        alt={rel.featuredAlt || rel.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
                        <span className="text-sm font-medium text-primary-300">Lipid</span>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 backdrop-blur-md">
                      {rel.type === 'DOWNLOAD' ? 'Material' : 'Artigo'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700">
                      {rel.title}
                    </h3>
                    {rel.excerpt && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                        {rel.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { IngredientInterestForm } from '@/components/ingredientes/IngredientInterestForm';
import { BackToSearch } from '@/components/ingredientes/BackToSearch';
import { RegistrarVisita } from '@/components/ingredientes/RegistrarVisita';
import { resolveMediaUrl } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Ingredient {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string | null;
  cta: string | null;
  inci: string | null;
  partner: { id: string; name: string; slug: string; logo: string | null } | null;
  category: { id: string; name: string; slug: string } | null;
  codes: { id: string; code: string }[];
  images: { id: string; url: string; alt: string | null }[];
  files: { id: string; url: string; label: string; sizeBytes: number | null }[];
  tags: { tag: { id: string; name: string; slug: string } }[];
}

async function getIngredient(slug: string): Promise<Ingredient | null> {
  const res = await fetch(`${API_URL}/api/v1/ingredients/slug/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

async function getSimilares(slug: string): Promise<Ingredient[]> {
  const res = await fetch(`${API_URL}/api/v1/ingredients/slug/${slug}/similares?limite=4`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

function formatarTamanho(bytes: number | null): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getIngredient(params.slug);
  if (!item) return { title: 'Ingrediente não encontrado' };

  const description = item.excerpt || item.description.slice(0, 160);
  return {
    title: item.name,
    description,
    keywords: [item.name, item.inci || '', item.category?.name || '', 'ficha técnica ingrediente'].filter(Boolean),
    openGraph: { title: item.name, description },
  };
}

export default async function IngredienteDetalhePage({ params }: { params: { slug: string } }) {
  const bruto = await getIngredient(params.slug);
  if (!bruto) notFound();

  // Coleções com default: uma resposta em cache anterior a um campo novo (ou uma API mais
  // antiga) não pode derrubar a página inteira com "cannot read properties of undefined".
  const item = {
    ...bruto,
    codes: bruto.codes ?? [],
    images: bruto.images ?? [],
    files: bruto.files ?? [],
    tags: bruto.tags ?? [],
  };

  const similares = (await getSimilares(params.slug)) ?? [];

  // O importador já preserva os parágrafos do PDF separando-os por linha em branco —
  // não adivinhamos quebra por regex de frase aqui (erra em abreviação e frase curta).
  const paragrafos = item.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <RegistrarVisita slug={item.slug} />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-gray-100 pb-20 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-primary-200/40 blur-[120px]" />
          <div className="float-soft absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-cyan-200/30 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,23,42,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.09) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)',
            }}
          />
        </div>

        <div className="container-main relative">
          {/* Logo do fabricante no canto — assina o produto sem competir com o título. */}
          {item.partner?.logo && (
            <Link
              href={`/parceiros/${item.partner.slug}`}
              className="reveal absolute right-4 top-0 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-3 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-all duration-500 ease-brand hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-30px_rgba(15,23,42,0.5)] md:right-6 md:flex lg:right-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Fabricante
              </span>
              <span className="relative h-9 w-28">
                <Image
                  src={resolveMediaUrl(item.partner.logo)}
                  alt={item.partner.name}
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
          )}

          <div className="reveal">
            <Link
              href="/ingredientes"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary-700"
            >
              <span aria-hidden className="transition-transform duration-500 ease-brand group-hover:-translate-x-1">
                ←
              </span>
              Ingredientes
            </Link>
          </div>

          <div className="reveal reveal-delay-1 mt-8 flex flex-wrap items-center gap-2">
            {item.category && (
              <Link
                href={`/ingredientes?categoria=${item.category.slug}`}
                className="inline-flex items-center rounded-full border border-gray-300/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-md transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                {item.category.name}
              </Link>
            )}
            {item.partner && (
              <Link
                href={`/parceiros/${item.partner.slug}`}
                className="inline-flex items-center rounded-full border border-gray-300/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-md transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                {item.partner.name}
              </Link>
            )}
          </div>

          <h1 className="reveal reveal-delay-1 mt-6 max-w-4xl text-gray-900">{item.name}</h1>

          {item.excerpt && (
            <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              {item.excerpt}
            </p>
          )}

          {(item.inci || item.codes.length > 0) && (
            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
              {item.inci && (
                <div className="glass px-5 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">INCI</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">{item.inci}</p>
                </div>
              )}
              {item.codes.length > 0 && (
                <div className="glass px-5 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Código{item.codes.length > 1 ? 's' : ''} comercial
                    {item.codes.length > 1 ? 'is' : ''}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-gray-900">
                    {item.codes.map((c) => c.code).join(' · ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- CONTEÚDO 63 / CTA 37 */}
      <section className="relative bg-gray-50 py-16 md:py-20 lg:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,63fr)_minmax(0,37fr)] lg:gap-12">
            {/* ---- conteúdo do produto */}
            <Reveal className="space-y-8">
              <div className="space-y-5">
                {paragrafos.map((paragrafo, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-lg leading-relaxed text-gray-800 md:text-xl'
                        : 'leading-relaxed text-gray-700'
                    }
                  >
                    {paragrafo}
                  </p>
                ))}
              </div>

              {/* Galeria — some por completo quando não há imagem cadastrada. */}
              {item.images.length > 0 && (
                <div
                  className={`grid gap-4 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
                >
                  {item.images.map((img) => (
                    <figure
                      key={img.id}
                      className="group relative aspect-[4/3] overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]"
                    >
                      <Image
                        src={resolveMediaUrl(img.url)}
                        alt={img.alt || item.name}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                      />
                    </figure>
                  ))}
                </div>
              )}

              <div className="glass p-7">
                <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
                  Ficha resumida
                </h2>
                <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {item.inci && (
                    <div>
                      <dt className="eyebrow">INCI</dt>
                      <dd className="mt-1 text-sm text-gray-800">{item.inci}</dd>
                    </div>
                  )}
                  {item.category && (
                    <div>
                      <dt className="eyebrow">Categoria</dt>
                      <dd className="mt-1 text-sm text-gray-800">{item.category.name}</dd>
                    </div>
                  )}
                  {item.partner && (
                    <div>
                      <dt className="eyebrow">Fabricante</dt>
                      <dd className="mt-1 text-sm text-gray-800">
                        <Link
                          href={`/parceiros/${item.partner.slug}`}
                          className="text-primary-600 transition-colors hover:text-primary-700"
                        >
                          {item.partner.name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {item.codes.length > 0 && (
                    <div>
                      <dt className="eyebrow">
                        Código{item.codes.length > 1 ? 's' : ''} comercial
                        {item.codes.length > 1 ? 'is' : ''}
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-gray-800">
                        {item.codes.map((c) => c.code).join(' · ')}
                      </dd>
                    </div>
                  )}
                </dl>

                {item.tags.length > 0 && (
                  <div className="mt-6 border-t border-gray-200/70 pt-5">
                    <p className="eyebrow">Marcadores</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map(({ tag }) => (
                        <Link
                          key={tag.id}
                          href={`/ingredientes?tag=${tag.slug}`}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-[0_2px_8px_-4px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-700 hover:shadow-[0_6px_16px_-6px_rgba(30,63,153,0.4)]"
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Documentos — também some quando não há nada anexado. */}
              {item.files.length > 0 && (
                <div className="space-y-3">
                  <p className="eyebrow">Documentos técnicos</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {item.files.map((file) => (
                      <a
                        key={file.id}
                        href={resolveMediaUrl(file.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-[18px] border border-black/[0.06] bg-white p-4 transition-all duration-500 ease-brand hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
                      >
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-[10px] font-bold text-red-600">
                          PDF
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-700">
                            {file.label}
                          </span>
                          {file.sizeBytes && (
                            <span className="block text-xs text-gray-500">
                              {formatarTamanho(file.sizeBytes)}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden
                          className="text-gray-400 transition-transform duration-500 ease-brand group-hover:translate-y-0.5"
                        >
                          ↓
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Ressalva técnica: idêntica em todo o catálogo, por isso mora no layout e
                  não no banco. */}
              <p className="text-xs leading-relaxed text-gray-500">
                INCI, teor, faixa de uso, solubilidade, pH, temperatura, armazenamento e etapa de
                incorporação devem ser confirmados na ficha técnica, na especificação e no
                certificado de análise vigentes.
              </p>
            </Reveal>

            {/* ---- CTA do produto + formulário */}
            <Reveal delay={120}>
              <aside className="lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-[24px] bg-primary-950 p-7 shadow-[0_40px_80px_-40px_rgba(10,21,51,0.8)] md:p-8">
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-400/25 blur-[70px]" />
                    <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-400/15 blur-[70px]" />
                  </div>

                  <div className="relative">
                    {item.cta && (
                      <>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                          Próximo passo
                        </p>
                        <p className="mt-3 text-lg font-medium leading-relaxed text-white md:text-xl">
                          {item.cta}
                        </p>
                        <div className="my-7 h-px bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
                      </>
                    )}

                    <IngredientInterestForm ingredientId={item.id} ingredientName={item.name} />
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 01) CONHEÇA TAMBÉM */}
      {similares.length > 0 && (
        <section className="bg-white py-16 md:py-20 lg:py-24">
          <div className="container-main">
            <Reveal>
              <p className="eyebrow">Conheça também</p>
              <h2 className="mt-3 text-gray-900">Ingredientes relacionados</h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similares.map((similar, i) => (
                <Reveal key={similar.id} delay={i * 90}>
                  <Link
                    href={`/ingredientes/${similar.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-[20px] border border-black/[0.05] bg-white p-6 transition-all duration-700 ease-brand hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[0_40px_60px_-30px_rgba(15,23,42,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    {similar.category && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600">
                        {similar.category.name}
                      </p>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                      {similar.name}
                    </h3>
                    {similar.excerpt && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {similar.excerpt}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary-600">
                      Ver ingrediente
                      <span
                        aria-hidden
                        className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------ 02) VOLTAR NA SUA PESQUISA */}
      <section className="border-t border-gray-100 bg-gray-50 py-12 md:py-16">
        <div className="container-main">
          <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">Continue explorando o catálogo</p>
              <p className="mt-1 text-sm text-gray-600">
                Retome de onde parou, com os filtros que você já tinha aplicado.
              </p>
            </div>
            <BackToSearch />
          </Reveal>
        </div>
      </section>
    </>
  );
}

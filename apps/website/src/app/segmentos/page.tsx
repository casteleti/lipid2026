import type { Metadata } from 'next';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface SegmentPage {
  id: string;
  slug: string;
  active: boolean;
  eyebrow: string | null;
  h1: string | null;
  subheadline: string | null;
  applications: { title: string; description: string }[] | null;
}

/** Nome curto do segmento para o card — o `eyebrow` cadastrado costuma ser uma frase. */
const NOMES: Record<string, string> = {
  farmaceutica: 'Farmacêutica',
  cosmetica: 'Cosmética',
  nutricional: 'Nutricional',
  veterinaria: 'Veterinária',
};

async function getSegmentos(): Promise<SegmentPage[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/segment-pages`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data: SegmentPage[] = await res.json();
    return data.filter((s) => s.active).sort((a, b) => a.slug.localeCompare(b.slug));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Segmentos atendidos',
  description:
    'Tecnologia lipídica aplicada a farmacêutica, cosmética, nutricional e veterinária — com seleção técnica, documentação e suporte da formulação à escala industrial.',
  keywords: ['segmentos', 'farmacêutica', 'cosmética', 'nutricional', 'veterinária', 'ingredientes lipídicos'],
};

export default async function SegmentosPage() {
  const segmentos = await getSegmentos();

  return (
    <>
      <ListingHero
        badge="SEGMENTOS"
        title="Cada setor exige uma resposta diferente da mesma tecnologia"
        description="Farmacêutica, cosmética, nutricional e veterinária partem do mesmo conjunto de tecnologias lipídicas — mas o que define um bom projeto muda em cada uma. Escolha o seu segmento."
      />

      <Section>
        {segmentos.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            Não foi possível carregar os segmentos agora.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {segmentos.map((s) => (
              <Link
                key={s.id}
                href={`/segmentos/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-primary-300 hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)]"
              >
                <p className="eyebrow">{NOMES[s.slug] || s.slug}</p>
                <p className="mt-4 text-xl font-bold leading-snug text-gray-900 group-hover:text-primary-700">
                  {s.h1}
                </p>
                {s.subheadline && (
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-600">
                    {s.subheadline}
                  </p>
                )}
                {s.applications && s.applications.length > 0 && (
                  <p className="mt-5 text-sm text-gray-500">
                    {s.applications.length} aplicações mapeadas
                  </p>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500 group-hover:text-primary-600">
                  Ver segmento
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Seu projeto não se encaixa em um segmento só?</h2>
          <p className="text-lg text-white/70">
            A conversa técnica começa pelo ativo e pelo que ele precisa entregar — não pela
            categoria do produto final.
          </p>
          <Button href="/especialista" variant="secondary" size="lg">
            Falar com um especialista
          </Button>
        </div>
      </Section>
    </>
  );
}

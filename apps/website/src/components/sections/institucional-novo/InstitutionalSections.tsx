import clsx from 'clsx';
import Link from 'next/link';
import {
  HiOutlineArrowRight,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineCheckCircle,
  HiOutlineMap,
  HiOutlineDocumentCheck,
  HiOutlineBeaker,
  HiOutlineBuildingOffice2,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { ImageSlot } from './ImageSlot';
import { InstitutionalContactForm } from './InstitutionalContactForm';
import type { InstitutionalSectionData, InstitutionalSectionItemData } from './types';

const ATTENTION_ICONS: Record<string, typeof HiOutlineMap> = {
  route: HiOutlineMap,
  'file-check-2': HiOutlineDocumentCheck,
  'flask-conical': HiOutlineBeaker,
  factory: HiOutlineBuildingOffice2,
  'shield-check': HiOutlineShieldCheck,
};

function paragraphs(body: string | null) {
  return (body || '').split('\n\n').filter(Boolean);
}

/** Envolve texto + imagem alternando o lado a cada seção — o "espalhado esquerda/depois
 * direita" pedido para o layout. */
function AlternatingRow({
  reversed,
  text,
  image,
}: {
  reversed: boolean;
  text: React.ReactNode;
  image: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={clsx('lg:col-span-7', reversed && 'lg:order-2')}>{text}</div>
      <div className={clsx('lg:col-span-5', reversed && 'lg:order-1')}>{image}</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, dark }: { eyebrow?: string | null; title?: string | null; dark?: boolean }) {
  return (
    <>
      {eyebrow && (
        <div
          className={clsx(
            'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em]',
            dark ? 'text-green-400' : 'text-primary-600',
          )}
        >
          <span className={clsx('h-px w-8', dark ? 'bg-green-400/50' : 'bg-primary-600/40')} />
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className={clsx('mt-5', dark ? 'text-white' : 'text-gray-900')}>{title}</h2>
      )}
    </>
  );
}

function Hero({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white py-20 md:py-28">
      <div className="container-main grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-7">
          <Badge variant="primary">{section.eyebrow}</Badge>
          <h1 className="mt-6 text-gray-900">{section.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-gray-600">{section.subtitle}</p>
          {section.highlight && (
            <p className="mt-4 max-w-xl border-l-2 border-primary-300 pl-4 text-sm font-medium text-primary-700">
              {section.highlight}
            </p>
          )}
          {section.body && <p className="mt-4 max-w-xl text-sm text-gray-500">{section.body}</p>}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {section.ctaLabel && (
              <Button href={section.ctaHref || '/contato'} variant="primary" size="lg">
                {section.ctaLabel}
              </Button>
            )}
            {section.secondaryCtaLabel && (
              <Link
                href={section.secondaryCtaHref || '#'}
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900 transition-colors hover:text-primary-600"
              >
                {section.secondaryCtaLabel}
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
        <div className="reveal reveal-delay-2 lg:col-span-5">
          <div className="float-soft">
            <ImageSlot imageUrl={section.imageUrl} imageHint={section.imageHint} alt={section.title || 'Lipid Ingredients'} />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialIntro({ section, reversed }: { section: InstitutionalSectionData; reversed: boolean }) {
  return (
    <section id={section.slug} className="py-20 md:py-28">
      <div className="container-main">
        <AlternatingRow
          reversed={reversed}
          text={
            <div className="space-y-6">
              <SectionHeading eyebrow={section.eyebrow} title={section.title} />
              <div className="space-y-4 text-gray-600">
                {paragraphs(section.body).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {section.quote && (
                <p className="border-l-2 border-primary-400 py-1 pl-5 text-xl font-medium leading-snug text-gray-900">
                  “{section.quote}”
                </p>
              )}
              {section.items.length > 0 && (
                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                  {section.items.map((it) => (
                    <div key={it.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                      <p className="text-lg font-bold text-primary-600">{it.value}</p>
                      <p className="mt-1 text-xs text-gray-500">{it.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
          image={<ImageSlot imageUrl={section.imageUrl} imageHint={section.imageHint} alt={section.title || ''} />}
        />
      </div>
    </section>
  );
}

function ProcessStory({ section, reversed }: { section: InstitutionalSectionData; reversed: boolean }) {
  return (
    <section id={section.slug} className="bg-gray-50 py-20 md:py-28">
      <div className="container-main">
        <AlternatingRow
          reversed={reversed}
          text={
            <div className="space-y-8">
              <div>
                <SectionHeading eyebrow={section.eyebrow} title={section.title} />
                {section.subtitle && <p className="mt-4 max-w-lg text-gray-600">{section.subtitle}</p>}
              </div>
              <ol className="space-y-6">
                {section.items.map((step) => (
                  <li key={step.id} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-900 text-xs font-bold text-white">
                      {step.value}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">{step.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {section.highlight && (
                <p className="rounded-2xl bg-primary-950 px-6 py-5 text-sm font-medium leading-relaxed text-white">
                  {section.highlight}
                </p>
              )}
            </div>
          }
          image={<ImageSlot imageUrl={section.imageUrl} imageHint={section.imageHint} alt={section.title || ''} />}
        />
      </div>
    </section>
  );
}

function AttentionPanel({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="relative isolate overflow-hidden bg-gray-50 py-20 md:py-28">
      <GridBackdrop />
      <div className="container-main relative">
        <div className="max-w-2xl">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
          {section.subtitle && <p className="mt-4 text-gray-600">{section.subtitle}</p>}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it) => {
            const Icon = (it.icon && ATTENTION_ICONS[it.icon]) || HiOutlineShieldCheck;
            return (
              <div
                key={it.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.15)]"
              >
                <Icon className="h-6 w-6 text-primary-600" />
                <p className="mt-4 font-bold text-gray-900">{it.title}</p>
                <p className="mt-2 text-sm text-gray-600">{it.text}</p>
              </div>
            );
          })}
        </div>
        {section.highlight && (
          <p className="mt-10 text-lg font-semibold text-primary-700">{section.highlight}</p>
        )}
      </div>
    </section>
  );
}

function SectorBentoGrid({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="py-20 md:py-28">
      <div className="container-main">
        <div className="max-w-2xl">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {section.items.map((it) => (
            <div key={it.id} className="group overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-500 ease-brand hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.2)]">
              <ImageSlot
                imageUrl={it.imageUrl}
                imageHint={it.imageHint}
                alt={it.title || ''}
                float={false}
                className="!aspect-auto h-24 rounded-none rounded-t-[20px] p-3"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{it.title}</h3>
                <p className="mt-2 text-sm font-medium text-primary-600">{it.subtitle}</p>
                <p className="mt-3 text-sm text-gray-600">{it.text}</p>
                {it.linkLabel && (
                  <Link
                    href={it.linkHref || '#'}
                    className="group/link mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-900 hover:text-primary-600"
                  >
                    {it.linkLabel}
                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatementBreak({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="py-20 md:py-24">
      <div className="container-main">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-medium leading-snug text-gray-900 md:text-3xl">{section.body}</p>
          {section.subtitle && <p className="mt-5 text-gray-500">{section.subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}

function QualityFramework({ section, reversed }: { section: InstitutionalSectionData; reversed: boolean }) {
  return (
    <section id={section.slug} className="py-20 md:py-28">
      <div className="container-main">
        <AlternatingRow
          reversed={reversed}
          text={
            <div className="space-y-6">
              <SectionHeading eyebrow={section.eyebrow} title={section.title} />
              {section.subtitle && <p className="text-gray-600">{section.subtitle}</p>}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.items.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="font-bold text-gray-900">{p.title}</p>
                    <p className="mt-1.5 text-sm text-gray-600">{p.text}</p>
                  </div>
                ))}
              </div>
              {section.quote && (
                <p className="border-l-2 border-primary-400 pl-5 text-lg font-medium text-gray-900">“{section.quote}”</p>
              )}
            </div>
          }
          image={<ImageSlot imageUrl={section.imageUrl} imageHint={section.imageHint} alt={section.title || ''} />}
        />
      </div>
    </section>
  );
}

function ImportantTopics({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="bg-gray-50 py-20 md:py-28">
      <div className="container-main">
        <div className="max-w-2xl">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((it, i) => (
            <div key={it.id} className="rounded-2xl bg-white p-6">
              <span className="font-mono text-xs font-bold text-primary-400">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 font-bold text-gray-900">{it.title}</p>
              <p className="mt-1.5 text-sm text-gray-600">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompactServiceList({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="py-16 md:py-20">
      <div className="container-main">
        <div className="max-w-2xl">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {section.items.map((it) => (
            <li key={it.id} className="flex items-start gap-3 text-sm text-gray-700">
              <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
              {it.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClosingManifesto({ section }: { section: InstitutionalSectionData }) {
  return (
    <section id={section.slug} className="relative isolate overflow-hidden bg-primary-950 py-20 text-white md:py-28">
      <GridBackdrop dark />
      <div className="container-main relative mx-auto max-w-2xl text-center">
        <h2 className="text-white">{section.title}</h2>
        {section.body && <p className="mt-6 text-white/70">{section.body}</p>}
        {section.highlight && <p className="mt-4 text-lg font-semibold text-primary-300">{section.highlight}</p>}
        {section.ctaLabel && (
          <div className="mt-9">
            <Button href={section.ctaHref || '/contato'} variant="primary" size="lg">
              {section.ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactStrip({ section }: { section: InstitutionalSectionData }) {
  const iconFor = (type: string) =>
    type === 'phone' ? HiOutlinePhone : type === 'email' ? HiOutlineEnvelope : HiOutlineMapPin;

  return (
    <section id={section.slug} className="py-20 md:py-28">
      <div id="contact-form" className="container-main scroll-mt-24">
        <AlternatingRow
          reversed={false}
          text={
            <div className="space-y-6">
              <h2 className="text-gray-900">{section.title}</h2>
              {section.subtitle && <p className="text-gray-600">{section.subtitle}</p>}
              <ul className="space-y-4">
                {section.items.map((it) => {
                  const type = (it.extra?.type as string) || 'location';
                  const Icon = iconFor(type);
                  const content = (
                    <span className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wide text-gray-500">{it.title}</span>
                        <span className="text-gray-800">{it.text}</span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={it.id}>
                      {it.linkHref ? (
                        <a href={it.linkHref} className="hover:text-primary-600">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          }
          image={<InstitutionalContactForm />}
        />
      </div>
    </section>
  );
}

const TWO_COLUMN_TYPES = new Set(['editorial_intro', 'process_story', 'quality_framework']);

export function InstitutionalSections({ sections }: { sections: InstitutionalSectionData[] }) {
  const active = sections.filter((s) => s.active).sort((a, b) => a.order - b.order);
  let alternator = 0;

  return (
    <>
      {active.map((section) => {
        const reversed = TWO_COLUMN_TYPES.has(section.type) ? alternator++ % 2 === 1 : false;

        switch (section.type) {
          case 'institutional_hero':
            return <Hero key={section.id} section={section} />;
          case 'editorial_intro':
            return <EditorialIntro key={section.id} section={section} reversed={reversed} />;
          case 'process_story':
            return <ProcessStory key={section.id} section={section} reversed={reversed} />;
          case 'attention_panel':
            return <AttentionPanel key={section.id} section={section} />;
          case 'sector_bento_grid':
            return <SectorBentoGrid key={section.id} section={section} />;
          case 'statement_break':
            return <StatementBreak key={section.id} section={section} />;
          case 'quality_framework':
            return <QualityFramework key={section.id} section={section} reversed={reversed} />;
          case 'important_topics':
            return <ImportantTopics key={section.id} section={section} />;
          case 'compact_service_list':
            return <CompactServiceList key={section.id} section={section} />;
          case 'closing_manifesto':
            return <ClosingManifesto key={section.id} section={section} />;
          case 'contact_strip':
            return <ContactStrip key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export type { InstitutionalSectionData, InstitutionalSectionItemData };

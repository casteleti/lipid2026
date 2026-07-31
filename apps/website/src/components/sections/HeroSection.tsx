import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';

function Particles() {
  const dots = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const size = 2 + (i % 4);
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 7) * 0.6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-primary-500/25"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              animation: `particleFloat ${8 + (i % 5)}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-white py-20 md:py-28 lg:min-h-[680px] lg:py-32">
      {/* Full-bleed hero image */}
      <Image
        src="/hero/fullbanner-lipid.jpg"
        alt="Lipossoma — estrutura lipídica avançada de delivery molecular"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />

      {/* Readability gradient over the text side */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.7) 38%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.05) 78%)',
        }}
      />

      <Particles />

      <div className="container-main relative z-[2] grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
        <div className="space-y-6">
          <div className="reveal">
            <Badge variant="primary">LIPID TECHNOLOGY PLATFORM</Badge>
          </div>

          <h1 className="reveal reveal-delay-1 text-gray-900">
            Ciência que transforma <span className="text-primary-600">formulações</span> em{' '}
            <span className="font-light text-gray-500">performance.</span>
          </h1>

          <p className="reveal reveal-delay-2 max-w-lg text-lg text-gray-600">
            Ingredientes inovadores, tecnologias avançadas e suporte técnico especializado para as
            indústrias farmacêutica, cosmética, nutricional e veterinária.
          </p>

          <div className="reveal reveal-delay-3 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/tecnologias" variant="primary" size="lg">
              Nossas tecnologias
            </Button>
            <LinkArrow href="/contato" diagonal>
              Fale com um especialista
            </LinkArrow>
          </div>
        </div>

        <div aria-hidden className="hidden md:block" />
      </div>
    </section>
  );
}

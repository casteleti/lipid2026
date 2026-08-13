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
      {/* Full-bleed hero image. `object-right` porque a vesícula foi composta encostada à
          direita — em telas mais estreitas que o arquivo (2.29:1) o corte tem de sair da
          esquerda, que é fundo vazio, e não do meio.
          O banner anterior (/hero/fullbanner-lipid.jpg) continua versionado. */}
      <Image
        src="/hero/fullbanner-vesicula.jpg"
        alt="Vesícula lipossomal em corte: bicamada fosfolipídica envolvendo o núcleo aquoso com o princípio ativo"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-right"
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

      {/* O degradê acima é horizontal e pressupõe texto à esquerda, imagem à direita. No
          celular o texto ocupa a largura toda e o recorte cai em cima das caudas lipídicas,
          onde ele já é quase transparente. Esta camada chapada só existe abaixo de md. */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-white/55 md:bg-transparent" />

      <Particles />

      <div className="container-main relative z-[2] grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
        <div className="space-y-6">
          <div className="reveal">
            <Badge variant="primary">LIPID TECHNOLOGY PLATFORM</Badge>
          </div>

          {/* Único h1 do site fora da escala global: a home mantém o tamanho que sempre teve
              (48 / 60 / 72px). Ver o comentário do `h1` em globals.css. */}
          <h1 className="reveal reveal-delay-1 text-5xl leading-tight text-gray-900 md:text-6xl lg:text-7xl">
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
            <LinkArrow href="/especialista" diagonal>
              Fale com um especialista
            </LinkArrow>
          </div>
        </div>

        <div aria-hidden className="hidden md:block" />
      </div>
    </section>
  );
}

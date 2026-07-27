import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { LipidGraphic } from '@/components/ui/LipidGraphic';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white py-20 md:py-28 lg:py-32">
      <div className="container-main grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
        <div className="space-y-6">
          <Badge variant="primary">LIPID TECHNOLOGY PLATFORM</Badge>

          <h1 className="text-gray-900">
            Ciência que transforma <span className="text-primary-600">formulações</span> em{' '}
            <em className="not-italic font-light text-gray-500">performance.</em>
          </h1>

          <p className="max-w-lg text-lg text-gray-600">
            Ingredientes inovadores, tecnologias avançadas e suporte técnico especializado para as
            indústrias farmacêutica, cosmética, nutricional e veterinária.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/tecnologias" variant="primary" size="lg">
              Nossas tecnologias
            </Button>
            <LinkArrow href="/contato" diagonal>
              Fale com um especialista
            </LinkArrow>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-full">
          <LipidGraphic className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}

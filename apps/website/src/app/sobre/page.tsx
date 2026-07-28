import { HiOutlineFlag, HiOutlineRocketLaunch, HiOutlineSparkles } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { ValueCard } from '@/components/ui/ValueCard';
import { Grid } from '@/components/ui/Grid';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Sobre - Daksa',
  description: 'Conheça a missão, visão e valores da Daksa em tecnologias de lipídios.',
};

export default function SobrePage() {
  return (
    <>
      <ListingHero
        badge="SOBRE"
        title="Sobre a Daksa"
        description="Inovação em lipídios. Ciência aplicada ao desempenho. Parcerias que transformam formulações em resultados de impacto."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            A Daksa é uma plataforma institucional especializada em tecnologias de lipídios,
            conectando inovação e ciência para os mercados cosmético, farmacêutico e nutracêutico.
          </p>
          <p>
            Nosso trabalho é dedicado a desenvolver e disponibilizar tecnologias de encapsulação e
            entrega de ativos — como lipossomas e fosfolipídios — que ampliam a eficácia,
            estabilidade e biodisponibilidade de formulações em diversos segmentos.
          </p>
          <p>
            Atuamos em parceria com fornecedores e especialistas para oferecer soluções
            personalizadas às necessidades de cada aplicação.
          </p>
        </div>
      </Section>

      <Section variant="light">
        <div className="mb-16 text-center">
          <h2 className="text-gray-900">Missão, Visão e Valores</h2>
        </div>

        <Grid cols={3} gap="lg">
          <ValueCard
            icon={HiOutlineFlag}
            title="Missão"
            description="Impulsionar a inovação em formulações através de tecnologias lipídicas avançadas e de alto desempenho para indústrias regulamentadas."
          />

          <ValueCard
            icon={HiOutlineRocketLaunch}
            title="Visão"
            description="Ser referência em tecnologias lipídicas, conectando ciência, ingredientes e soluções que transformam formulações."
          />

          <ValueCard
            icon={HiOutlineSparkles}
            title="Valores"
            description="Excelência científica, inovação contínua, integridade nas parcerias e compromisso com desempenho e qualidade."
          />
        </Grid>
      </Section>

      <Section variant="dark">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2>Nosso compromisso com a excelência</h2>
          <p className="text-lg text-white/70">
            Cada tecnologia, cada ingrediente e cada parceria é desenvolvida com rigor científico e
            foco em desempenho e qualidade.
          </p>
          <Button href="/contato" variant="secondary" size="lg">
            Fale com nossos especialistas
          </Button>
        </div>
      </Section>
    </>
  );
}

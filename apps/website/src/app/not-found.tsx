import { HiOutlineMapPin } from 'react-icons/hi2';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export const metadata = {
  title: 'Página não encontrada - Daksa',
};

export default function NotFound() {
  return (
    <Section className="py-24 md:py-32">
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-primary-50">
          <HiOutlineMapPin className="h-7 w-7 text-primary-600" />
        </div>
        <Badge variant="primary">ERRO 404</Badge>
        <h1 className="text-gray-900">Página não encontrada</h1>
        <p className="text-lg text-gray-600">
          O endereço acessado não existe ou foi movido. Volte para a home ou explore nossas
          tecnologias e aplicações.
        </p>
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center">
          <Button href="/" variant="primary" size="lg">
            Voltar para a home
          </Button>
          <Button href="/especialista" variant="outline" size="lg">
            Falar com um especialista
          </Button>
        </div>
      </div>
    </Section>
  );
}

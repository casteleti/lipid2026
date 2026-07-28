import { HiOutlineEnvelope } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

export const metadata = {
  title: 'Contato - Daksa',
  description: 'Entre em contato com nossos especialistas em tecnologias lipídicas.',
};

export default function ContatoPage() {
  return (
    <>
      <ListingHero
        badge="CONTATO"
        title="Fale com Nossos Especialistas"
        description="Dúvidas sobre tecnologias, aplicações ou parcerias? Entre em contato e descubra como podemos ajudar."
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-gray-900">Envie uma mensagem</h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-gray-900">Informações de contato</h3>
              <Card className="space-y-2 p-6">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <HiOutlineEnvelope className="h-5 w-5 text-primary-600" />
                  Email
                </div>
                <a
                  href="mailto:contato@daksa.app.br"
                  className="block text-gray-600 hover:text-primary-600"
                >
                  contato@daksa.app.br
                </a>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-gray-900">Perguntas frequentes</h3>
              <Card className="space-y-2 p-6">
                <h4 className="font-semibold text-gray-900">Como solicito informações técnicas?</h4>
                <p className="text-sm text-gray-600">
                  Preencha o formulário indicando &quot;Suporte técnico&quot; como assunto.
                </p>
              </Card>
              <Card className="space-y-2 p-6">
                <h4 className="font-semibold text-gray-900">Fazem orçamentos personalizados?</h4>
                <p className="text-sm text-gray-600">
                  Sim. Selecione &quot;Outro&quot; e descreva sua necessidade no formulário.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

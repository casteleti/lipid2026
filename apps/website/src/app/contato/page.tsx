import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';
import { ListingHero } from '@/components/ui/ListingHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { CONTATO } from '@/lib/contato';

export const metadata = {
  title: 'Fale com um Especialista',
  description:
    'Apresente sua formulação, aplicação e requisitos técnicos. A equipe da Lipid Ingredients responde com leitura técnica, não só catálogo — ingredientes farmacêuticos, cosméticos, nutricionais e veterinários.',
  keywords: ['contato Lipid Ingredients', 'suporte técnico formulação', 'atendimento técnico ingredientes'],
  openGraph: {
    title: 'Fale com um Especialista | Lipid Ingredients',
    description: 'Apresente sua formulação e requisitos técnicos — a equipe da Lipid retorna com leitura técnica especializada.',
  },
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
                  E-mail
                </div>
                <a
                  href={`mailto:${CONTATO.email}`}
                  className="block text-gray-600 transition-colors hover:text-primary-600"
                >
                  {CONTATO.email}
                </a>
              </Card>

              <Card className="space-y-2 p-6">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <HiOutlinePhone className="h-5 w-5 text-primary-600" />
                  Telefone
                </div>
                <a
                  href={`tel:${CONTATO.telefoneLink}`}
                  className="block text-gray-600 transition-colors hover:text-primary-600"
                >
                  {CONTATO.telefone}
                </a>
              </Card>

              <Card className="space-y-2 p-6">
                <div className="flex items-center gap-2 font-semibold text-gray-900">
                  <HiOutlineMapPin className="h-5 w-5 text-primary-600" />
                  Endereço
                </div>
                <address className="not-italic leading-relaxed text-gray-600">
                  {CONTATO.endereco.logradouro}
                  <br />
                  {CONTATO.endereco.complemento}
                  <br />
                  {CONTATO.endereco.bairro} · {CONTATO.endereco.cidade}/{CONTATO.endereco.estado}
                  <br />
                  CEP {CONTATO.endereco.cep}
                </address>
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

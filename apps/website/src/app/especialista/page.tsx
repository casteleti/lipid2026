import { QuizEspecialista } from '@/components/especialista/QuizEspecialista';

export const metadata = {
  title: 'Fale com um Especialista',
  description:
    'Responda 4 perguntas rápidas sobre seu projeto — farmacêutico, cosmético, nutricional ou veterinário — e receba o retorno de um especialista técnico da Lipid Ingredients.',
  robots: { index: false, follow: true },
};

/**
 * Página imersiva do quiz "Fale com um especialista" — substitui o formulário genérico
 * de /contato como destino do CTA principal do header (BotaoEspecialista).
 *
 * `index: false` porque é uma landing de conversão sem conteúdo próprio para indexar;
 * /contato segue sendo a página institucional de contato para quem chega por busca.
 */
export default function EspecialistaPage() {
  return (
    <main className="flex min-h-[calc(100vh-1px)] flex-col bg-gradient-to-b from-primary-50/60 via-white to-white">
      <QuizEspecialista />
    </main>
  );
}

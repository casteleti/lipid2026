/**
 * Placeholder do avatar da Lia — mesma linguagem visual do botão flutuante (esfera com
 * gradiente + reflexo). Trocar por <img> com a arte real assim que o arquivo for exportado;
 * é a única peça que depende de asset visual ainda não recebido.
 */
export function LiaAvatar({ tamanho = 'md' }: { tamanho?: 'sm' | 'md' }) {
  const dimensao = tamanho === 'sm' ? 'h-9 w-9' : 'h-16 w-16';

  return (
    <span className={`relative inline-flex flex-shrink-0 ${dimensao} rounded-full`}>
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 via-primary-600 to-primary-950 shadow-[0_10px_24px_-10px_rgba(10,21,51,0.6)]" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-70" />
    </span>
  );
}

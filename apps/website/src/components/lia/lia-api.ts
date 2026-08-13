export interface LiaMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Mensagem que abre a conversa — fica só no front, não gasta chamada à API pra isso. */
export const MENSAGEM_INICIAL: LiaMessage = {
  role: 'assistant',
  content:
    'Oi! Me conta o que você está desenvolvendo ou qual característica de ingrediente você está buscando — eu procuro as opções reais do nosso catálogo pra você avaliar.',
};

export async function enviarMensagemLia(historico: LiaMessage[]): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/lia/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: historico }),
  });

  if (res.status === 429) {
    throw new Error('Muitas mensagens em pouco tempo. Aguarde alguns minutos antes de continuar.');
  }

  if (!res.ok) {
    throw new Error('Não consegui responder agora. Tente novamente em instantes.');
  }

  const json: { reply: string } = await res.json();
  return json.reply;
}

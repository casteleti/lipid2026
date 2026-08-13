'use client';

import { useEffect, useRef, useState } from 'react';
import { HiXMark, HiOutlinePaperAirplane } from 'react-icons/hi2';
import { LiaAvatar } from './LiaAvatar';
import { enviarMensagemLia, MENSAGEM_INICIAL, type LiaMessage } from './lia-api';

export function LiaChatWindow({ onClose }: { onClose: () => void }) {
  const [mensagens, setMensagens] = useState<LiaMessage[]>([MENSAGEM_INICIAL]);
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const fimDaListaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [mensagens, enviando]);

  const enviar = async () => {
    const conteudo = texto.trim();
    if (!conteudo || enviando) return;

    const historico = [...mensagens, { role: 'user' as const, content: conteudo }];
    setMensagens(historico);
    setTexto('');
    setEnviando(true);

    try {
      const resposta = await enviarMensagemLia(historico);
      setMensagens((atual) => [...atual, { role: 'assistant', content: resposta }]);
    } catch (erro) {
      setMensagens((atual) => [
        ...atual,
        {
          role: 'assistant',
          content: erro instanceof Error ? erro.message : 'Não consegui responder agora.',
        },
      ]);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex h-[560px] max-h-[calc(100vh-2.5rem)] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35),0_8px_24px_-12px_rgba(15,23,42,0.15)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <LiaAvatar tamanho="sm" />
          <div>
            <p className="text-sm font-bold text-gray-900">Lia</p>
            <p className="text-xs text-emerald-600">Online</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <HiXMark className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {mensagens.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && <LiaAvatar tamanho="sm" />}
            <div
              className={`ml-2 max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {enviando && (
          <div className="flex justify-start">
            <LiaAvatar tamanho="sm" />
            <div className="ml-2 flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={fimDaListaRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
          placeholder="Descreva o que você precisa..."
          disabled={enviando}
          className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:bg-gray-50"
        />
        <button
          type="button"
          onClick={enviar}
          disabled={enviando || !texto.trim()}
          aria-label="Enviar"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        >
          <HiOutlinePaperAirplane className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

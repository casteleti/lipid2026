'use client';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqEditorProps {
  value: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
  disabled?: boolean;
}

/**
 * Perguntas frequentes do tema.
 *
 * Além de resolver a dúvida na própria página, viram FAQPage em JSON-LD — o formato que
 * buscadores exibem direto no resultado e que motores de resposta citam. Escrever a
 * pergunta como a pessoa realmente digitaria vale mais que uma pergunta "bonita".
 * Vazio = seção não aparece.
 */
export function FaqEditor({ value, onChange, disabled }: FaqEditorProps) {
  const atualizar = (index: number, campo: keyof FaqItem, texto: string) =>
    onChange(value.map((f, i) => (i === index ? { ...f, [campo]: texto } : f)));

  const remover = (index: number) => onChange(value.filter((_, i) => i !== index));

  const mover = (index: number, direcao: -1 | 1) => {
    const destino = index + direcao;
    if (destino < 0 || destino >= value.length) return;
    const copia = [...value];
    [copia[index], copia[destino]] = [copia[destino], copia[index]];
    onChange(copia);
  };

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-semibold text-gray-900">Perguntas frequentes</label>

      {value.length === 0 && (
        <p className="mb-2 text-sm text-gray-500">
          Nenhuma pergunta. Sem perguntas, a seção não aparece na página.
        </p>
      )}

      <div className="space-y-3">
        {value.map((faq, index) => (
          <div key={index} className="rounded-lg border border-gray-200 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">#{index + 1}</span>
              <div className="ml-auto flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => mover(index, -1)}
                  disabled={disabled || index === 0}
                  className="text-gray-500 hover:underline disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => mover(index, 1)}
                  disabled={disabled || index === value.length - 1}
                  className="text-gray-500 hover:underline disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remover(index)}
                  disabled={disabled}
                  className="text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>

            <input
              value={faq.question}
              onChange={(e) => atualizar(index, 'question', e.target.value)}
              placeholder="Pergunta — escreva como a pessoa digitaria na busca"
              disabled={disabled}
              maxLength={300}
              className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              value={faq.answer}
              onChange={(e) => atualizar(index, 'answer', e.target.value)}
              placeholder="Resposta objetiva, que se sustente sozinha fora do contexto da página"
              disabled={disabled}
              rows={3}
              maxLength={2000}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...value, { question: '', answer: '' }])}
        disabled={disabled}
        className="mt-3 text-sm font-semibold text-primary-600 hover:underline"
      >
        + Adicionar pergunta
      </button>
    </div>
  );
}

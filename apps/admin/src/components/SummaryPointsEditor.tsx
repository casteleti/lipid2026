'use client';

export interface SummaryPoint {
  text: string;
}

interface SummaryPointsEditorProps {
  value: SummaryPoint[];
  onChange: (pontos: SummaryPoint[]) => void;
  disabled?: boolean;
}

/**
 * Resumo em tópicos do conteúdo.
 *
 * Serve a dois públicos ao mesmo tempo: quem bate o olho e decide se vale ler, e os
 * mecanismos de busca/resposta, que usam uma lista explícita de pontos para entender do
 * que trata a página. Deixar vazio faz a seção sumir do site.
 */
export function SummaryPointsEditor({ value, onChange, disabled }: SummaryPointsEditorProps) {
  const atualizar = (index: number, text: string) =>
    onChange(value.map((p, i) => (i === index ? { text } : p)));

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
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        Resumo em tópicos
      </label>

      {value.length === 0 && (
        <p className="mb-2 text-sm text-gray-500">
          Nenhum tópico. Sem tópicos, a seção não aparece na página.
        </p>
      )}

      <div className="space-y-2">
        {value.map((ponto, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="mt-2.5 text-sm text-gray-400">{index + 1}.</span>
            <textarea
              value={ponto.text}
              onChange={(e) => atualizar(index, e.target.value)}
              placeholder="Ex.: Como a escolha do fosfolipídio afeta a estabilidade do sistema"
              disabled={disabled}
              rows={2}
              maxLength={500}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex flex-col gap-1 pt-1 text-xs">
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
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...value, { text: '' }])}
        disabled={disabled}
        className="mt-3 text-sm font-semibold text-primary-600 hover:underline"
      >
        + Adicionar tópico
      </button>
    </div>
  );
}

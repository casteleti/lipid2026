'use client';

import { Input } from './Input';

interface CodeListInputProps {
  value: string[];
  onChange: (codes: string[]) => void;
  disabled?: boolean;
}

/**
 * Lista de códigos comerciais. Um produto pode ter vários (o ReGrow-Ex tem três), então
 * não dá para usar um campo único. Sempre texto: há códigos com zero à esquerda e pares
 * como .100 / .1000 que um campo numérico arruinaria.
 */
export function CodeListInput({ value, onChange, disabled }: CodeListInputProps) {
  const lista = value.length > 0 ? value : [''];

  const atualizar = (index: number, novo: string) =>
    onChange(lista.map((c, i) => (i === index ? novo : c)));

  const remover = (index: number) => onChange(lista.filter((_, i) => i !== index));

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">Códigos comerciais</label>

      <div className="space-y-3">
        {lista.map((codigo, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              value={codigo}
              onChange={(e) => atualizar(index, e.target.value)}
              placeholder="873645.100"
              disabled={disabled}
              className="flex-1 font-mono"
            />
            {lista.length > 1 && (
              <button
                type="button"
                onClick={() => remover(index)}
                className="text-sm text-red-600 hover:underline"
                disabled={disabled}
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...lista, ''])}
        className="mt-3 text-sm font-semibold text-primary-600 hover:underline"
        disabled={disabled}
      >
        + Adicionar outro código
      </button>

      <p className="mt-1 text-sm text-gray-500">
        Como aparecem na Lista de Produtos LIPID. Cada código é único no sistema.
      </p>
    </div>
  );
}

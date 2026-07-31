'use client';

import { useMemo, useState } from 'react';

interface Tag {
  id: string;
  name: string;
}

interface TagPickerProps {
  label?: string;
  hint?: string;
  tags: Tag[];
  selected: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

/**
 * Seletor de tags com busca. Um CheckboxGroup simples não serve aqui: o catálogo completo
 * passa de 260 tags, e rolar essa lista para achar uma é inviável. As selecionadas ficam
 * como chips no topo, para que o usuário veja o que escolheu sem procurar na lista.
 */
export function TagPicker({ label, hint, tags, selected, onChange, disabled }: TagPickerProps) {
  const [busca, setBusca] = useState('');

  const selecionadas = useMemo(
    () => selected.map((id) => tags.find((t) => t.id === id)).filter((t): t is Tag => !!t),
    [selected, tags],
  );

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return tags;
    return tags.filter((t) => t.name.toLowerCase().includes(termo));
  }, [busca, tags]);

  const alternar = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>}

      {selecionadas.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selecionadas.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => alternar(tag.id)}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-100"
              title="Remover"
            >
              {tag.name}
              <span aria-hidden className="text-primary-400">
                ×
              </span>
              <span className="sr-only">Remover tag {tag.name}</span>
            </button>
          ))}
        </div>
      )}

      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar tag..."
        disabled={disabled}
        className="mb-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      {tags.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma tag cadastrada ainda.</p>
      ) : visiveis.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma tag encontrada para “{busca}”.</p>
      ) : (
        <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-gray-300 p-3">
          {visiveis.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selected.includes(tag.id)}
                onChange={() => alternar(tag.id)}
                disabled={disabled}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              {tag.name}
            </label>
          ))}
        </div>
      )}

      {hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

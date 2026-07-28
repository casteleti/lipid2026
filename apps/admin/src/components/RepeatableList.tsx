'use client';

import { useEffect, useState } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { api } from '@/lib/api-client';
import { INSTITUTIONAL_ICON_NAMES, INSTITUTIONAL_ICONS } from '@/lib/institutional-icons';

interface Block {
  id: string;
  section: string;
  icon: string | null;
  title: string | null;
  value: string | null;
  description: string | null;
  order: number;
  active: boolean;
}

interface FieldConfig {
  key: 'icon' | 'title' | 'value' | 'description';
  label: string;
  kind: 'text' | 'textarea' | 'icon-select';
  placeholder?: string;
}

interface RepeatableListProps {
  section: string;
  fields: FieldConfig[];
  addLabel: string;
  emptyText: string;
}

export function RepeatableList({ section, fields, addLabel, emptyText }: RepeatableListProps) {
  const [items, setItems] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Block[]>(`/institutional-blocks?section=${section}`)
      .then(setItems)
      .catch(() => setError('Não foi possível carregar os itens'))
      .finally(() => setLoading(false));
  }, [section]);

  const updateField = (id: string, key: FieldConfig['key'] | 'order', value: string | number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleAdd = async () => {
    setAdding(true);
    setError('');
    try {
      const created = await api.post<Block>('/institutional-blocks', {
        section,
        order: items.length,
      });
      setItems((prev) => [...prev, created]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível adicionar o item');
    } finally {
      setAdding(false);
    }
  };

  const handleSave = async (item: Block) => {
    setSavingId(item.id);
    setError('');
    try {
      const updated = await api.put<Block>(`/institutional-blocks/${item.id}`, {
        icon: item.icon || undefined,
        title: item.title || undefined,
        value: item.value || undefined,
        description: item.description || undefined,
        order: item.order,
      });
      setItems((prev) => prev.map((it) => (it.id === item.id ? updated : it)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o item');
    } finally {
      setSavingId(null);
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm('Remover este item? Essa ação não pode ser desfeita.')) return;
    setSavingId(id);
    setError('');
    try {
      await api.delete(`/institutional-blocks/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível remover o item');
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Carregando...</p>;

  return (
    <div className="space-y-4">
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      {items.length === 0 && <p className="text-sm text-gray-500">{emptyText}</p>}

      {items.map((item) => (
        <div key={item.id} className="space-y-3 rounded-lg border border-gray-200 p-4">
          <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
            <Input
              label="Ordem"
              type="number"
              value={item.order}
              onChange={(e) => updateField(item.id, 'order', Number(e.target.value))}
              disabled={savingId === item.id}
            />
            <div className="space-y-3">
              {fields.map((field) => {
                if (field.kind === 'icon-select') {
                  const SelectedIcon = item.icon ? INSTITUTIONAL_ICONS[item.icon] : null;
                  return (
                    <div key={field.key} className="w-full">
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        {field.label}
                      </label>
                      <div className="flex items-center gap-3">
                        <select
                          value={item.icon || ''}
                          onChange={(e) => updateField(item.id, 'icon', e.target.value)}
                          disabled={savingId === item.id}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Sem ícone</option>
                          {INSTITUTIONAL_ICON_NAMES.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                        {SelectedIcon && (
                          <SelectedIcon className="h-6 w-6 flex-shrink-0 text-primary-600" />
                        )}
                      </div>
                    </div>
                  );
                }

                if (field.kind === 'textarea') {
                  return (
                    <Textarea
                      key={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={item[field.key] || ''}
                      onChange={(e) => updateField(item.id, field.key, e.target.value)}
                      rows={3}
                      disabled={savingId === item.id}
                    />
                  );
                }

                return (
                  <Input
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={item[field.key] || ''}
                    onChange={(e) => updateField(item.id, field.key, e.target.value)}
                    disabled={savingId === item.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="primary"
              size="sm"
              loading={savingId === item.id}
              onClick={() => handleSave(item)}
            >
              Salvar
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              disabled={savingId === item.id}
              onClick={() => handleRemove(item.id)}
            >
              Remover
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="secondary" loading={adding} onClick={handleAdd}>
        {addLabel}
      </Button>
    </div>
  );
}

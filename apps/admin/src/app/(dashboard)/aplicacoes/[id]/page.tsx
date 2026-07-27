'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { CheckboxGroup } from '@/components/CheckboxGroup';
import { api } from '@/lib/api-client';

interface Technology {
  id: string;
  name: string;
}

interface Ingredient {
  id: string;
  name: string;
}

interface Application {
  id: string;
  name: string;
  description: string;
  excerpt: string | null;
  icon: string | null;
  banner: string | null;
  active: boolean;
  technologies: { technology: Technology }[];
  ingredients: { ingredient: Ingredient }[];
}

export default function EditarAplicacaoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [icon, setIcon] = useState('');
  const [banner, setBanner] = useState('');
  const [active, setActive] = useState(true);
  const [technologyIds, setTechnologyIds] = useState<string[]>([]);
  const [ingredientIds, setIngredientIds] = useState<string[]>([]);
  const [allTechnologies, setAllTechnologies] = useState<Technology[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get<{ data: Technology[] }>('/technologies?take=100')
      .then((res) => setAllTechnologies(res.data))
      .catch(() => setAllTechnologies([]));

    api
      .get<{ data: Ingredient[] }>('/ingredients?take=100')
      .then((res) => setAllIngredients(res.data))
      .catch(() => setAllIngredients([]));

    api
      .get<Application>(`/applications/${params.id}`)
      .then((app) => {
        setName(app.name);
        setDescription(app.description);
        setExcerpt(app.excerpt || '');
        setIcon(app.icon || '');
        setBanner(app.banner || '');
        setActive(app.active);
        setTechnologyIds(app.technologies.map((t) => t.technology.id));
        setIngredientIds(app.ingredients.map((i) => i.ingredient.id));
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoadingData(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await api.put(`/applications/${params.id}`, {
        name,
        description,
        excerpt: excerpt || undefined,
        icon: icon || undefined,
        banner: banner || undefined,
      });
      await api.put(`/applications/${params.id}/technologies`, { ids: technologyIds });
      await api.put(`/applications/${params.id}/ingredients`, { ids: ingredientIds });
      router.push('/aplicacoes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar as alterações');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Desativar esta aplicação?')) return;
    setSaving(true);
    try {
      await api.delete(`/applications/${params.id}`);
      router.push('/aplicacoes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível desativar a aplicação');
      setSaving(false);
    }
  };

  if (loadingData) {
    return <p className="text-gray-500">Carregando...</p>;
  }

  if (notFound) {
    return <p className="text-red-600">Aplicação não encontrada.</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Editar Aplicação</h1>
        <Link href="/aplicacoes" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
            maxLength={100}
            disabled={saving}
          />

          <Textarea
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            disabled={saving}
          />

          <Input
            label="Resumo"
            hint="Texto curto usado em listagens (opcional)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            disabled={saving}
          />

          <Input
            label="URL do ícone"
            hint="Opcional"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            disabled={saving}
          />

          <Input
            label="URL do banner"
            hint="Opcional"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            disabled={saving}
          />

          <CheckboxGroup
            label="Tecnologias vinculadas"
            options={allTechnologies.map((t) => ({ id: t.id, label: t.name }))}
            selected={technologyIds}
            onChange={setTechnologyIds}
            disabled={saving}
            emptyText="Nenhuma tecnologia cadastrada ainda."
          />

          <CheckboxGroup
            label="Ingredientes vinculados"
            options={allIngredients.map((i) => ({ id: i.id, label: i.name }))}
            selected={ingredientIds}
            onChange={setIngredientIds}
            disabled={saving}
            emptyText="Nenhum ingrediente cadastrado ainda."
          />

          <p className="text-sm text-gray-500">
            Status atual:{' '}
            <span className={active ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
              {active ? 'Ativo' : 'Inativo'}
            </span>
          </p>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex gap-3">
            <Button variant="primary" loading={saving}>
              Salvar
            </Button>
            <Link href="/aplicacoes">
              <Button type="button" variant="secondary" disabled={saving}>
                Cancelar
              </Button>
            </Link>
            <Button type="button" variant="danger" onClick={handleDelete} disabled={saving} className="ml-auto">
              Desativar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

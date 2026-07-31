'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PageHeader, EstadoVazio } from '@/components/PageHeader';
import { SearchInput, filtrarPorTexto } from '@/components/SearchInput';
import { useTableSort, SortHead, PlainHead, type Acessores } from '@/components/DataTable';
import { api } from '@/lib/api-client';

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface Paginated<T> {
  data: T[];
}

const ACESSORES: Acessores<Category> = {
  nome: (c) => c.name,
  slug: (c) => c.slug,
  status: (c) => (c.active ? 'Ativo' : 'Inativo'),
};

export default function CategoriasPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Paginated<Category>>('/categories?take=200')
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar as categorias'))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(
    () => filtrarPorTexto(items, busca, (c) => [c.name, c.slug]),
    [items, busca],
  );

  const { dados, campo, direcao, alternar } = useTableSort(filtrados, ACESSORES, 'nome');

  return (
    <div className="painel-entra">
      <PageHeader
        titulo="Categorias"
        descricao="Categorias usadas para classificar o conteúdo técnico."
        acao={
          <Link href="/categorias/novo">
            <Button variant="primary">+ Nova Categoria</Button>
          </Link>
        }
      />

      <Card flush>
        <div className="border-b border-gray-100 px-6 py-4">
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Buscar categoria..."
            contagem={dados.length}
          />
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <EstadoVazio
            titulo="Nenhuma categoria cadastrada ainda"
            acao={
              <Link href="/categorias/novo">
                <Button variant="primary">+ Nova Categoria</Button>
              </Link>
            }
          />
        ) : dados.length === 0 ? (
          <EstadoVazio
            titulo={`Nada encontrado para "${busca}"`}
            acao={
              <Button variant="secondary" onClick={() => setBusca('')}>
                Limpar busca
              </Button>
            }
          />
        ) : (
          <div className="overflow-auto">
            <table className="tabela-painel">
              <thead>
                <tr>
                  <SortHead campo="nome" atual={campo} direcao={direcao} onClick={alternar}>
                    Nome
                  </SortHead>
                  <SortHead campo="slug" atual={campo} direcao={direcao} onClick={alternar}>
                    Slug
                  </SortHead>
                  <SortHead campo="status" atual={campo} direcao={direcao} onClick={alternar}>
                    Status
                  </SortHead>
                  <PlainHead alinhamento="right">Ações</PlainHead>
                </tr>
              </thead>
              <tbody>
                {dados.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium text-gray-900">{item.name}</td>
                    <td className="font-mono text-xs text-gray-500">{item.slug}</td>
                    <td>
                      <span className={`selo ${item.active ? 'selo-verde' : 'selo-vermelho'}`}>
                        {item.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/categorias/${item.id}`}
                        className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-800"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

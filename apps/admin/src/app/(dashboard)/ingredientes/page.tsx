'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PageHeader, EstadoVazio } from '@/components/PageHeader';
import { SearchInput, filtrarPorTexto } from '@/components/SearchInput';
import { useTableSort, SortHead, PlainHead, type Acessores } from '@/components/DataTable';
import { api } from '@/lib/api-client';

interface Ingredient {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  partner: { id: string; name: string } | null;
  category: { id: string; name: string } | null;
  codes: { id: string; code: string }[];
}

interface Paginated<T> {
  data: T[];
  total: number;
}

// O catálogo passa de 200 itens e o painel carrega tudo de uma vez para busca e ordenação
// serem instantâneas. Se um dia passar de ~1000, vale trocar por busca no servidor.
const LIMITE = 1000;

const ACESSORES: Acessores<Ingredient> = {
  nome: (i) => i.name,
  fabricante: (i) => i.partner?.name,
  categoria: (i) => i.category?.name,
  codigos: (i) => i.codes[0]?.code,
  status: (i) => (i.active ? 'Ativo' : 'Inativo'),
};

export default function IngredientesPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Paginated<Ingredient>>(`/ingredients?take=${LIMITE}`)
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar os ingredientes'))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(
    () =>
      filtrarPorTexto(items, busca, (i) => [
        i.name,
        i.partner?.name,
        i.category?.name,
        ...i.codes.map((c) => c.code),
      ]),
    [items, busca],
  );

  const { dados, campo, direcao, alternar } = useTableSort(filtrados, ACESSORES, 'nome');

  return (
    <div className="painel-entra">
      <PageHeader
        titulo="Ingredientes"
        descricao="Catálogo completo. Busque por nome, fabricante, categoria ou código comercial."
        acao={
          <Link href="/ingredientes/novo">
            <Button variant="primary">+ Novo Ingrediente</Button>
          </Link>
        }
      />

      <Card flush>
        <div className="border-b border-gray-100 px-6 py-4">
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Buscar por nome, INCI, fabricante ou código..."
            contagem={dados.length}
          />
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <EstadoVazio
            titulo="Nenhum ingrediente cadastrado ainda"
            descricao="Comece cadastrando o primeiro ingrediente do catálogo."
            acao={
              <Link href="/ingredientes/novo">
                <Button variant="primary">+ Novo Ingrediente</Button>
              </Link>
            }
          />
        ) : dados.length === 0 ? (
          <EstadoVazio
            titulo={`Nada encontrado para "${busca}"`}
            descricao="Tente outro termo ou limpe a busca."
            acao={
              <Button variant="secondary" onClick={() => setBusca('')}>
                Limpar busca
              </Button>
            }
          />
        ) : (
          <div className="max-h-[calc(100vh-19rem)] overflow-auto">
            <table className="tabela-painel">
              <thead>
                <tr>
                  <SortHead campo="nome" atual={campo} direcao={direcao} onClick={alternar}>
                    Nome
                  </SortHead>
                  <SortHead campo="fabricante" atual={campo} direcao={direcao} onClick={alternar}>
                    Fabricante
                  </SortHead>
                  <SortHead campo="categoria" atual={campo} direcao={direcao} onClick={alternar}>
                    Categoria
                  </SortHead>
                  <SortHead campo="codigos" atual={campo} direcao={direcao} onClick={alternar}>
                    Códigos
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
                    <td className="text-gray-600">{item.partner?.name || '—'}</td>
                    <td className="text-gray-600">{item.category?.name || '—'}</td>
                    <td className="font-mono text-xs text-gray-500">
                      {item.codes.length > 0 ? item.codes.map((c) => c.code).join(', ') : '—'}
                    </td>
                    <td>
                      <span className={`selo ${item.active ? 'selo-verde' : 'selo-vermelho'}`}>
                        {item.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/ingredientes/${item.id}`}
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

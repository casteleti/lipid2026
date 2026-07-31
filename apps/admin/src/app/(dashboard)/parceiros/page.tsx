'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PageHeader, EstadoVazio } from '@/components/PageHeader';
import { SearchInput, filtrarPorTexto } from '@/components/SearchInput';
import { useTableSort, SortHead, PlainHead, type Acessores } from '@/components/DataTable';
import { api, resolveMediaUrl } from '@/lib/api-client';

interface Partner {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  country: string | null;
  logo: string | null;
}

interface Paginated<T> {
  data: T[];
}

const ACESSORES: Acessores<Partner> = {
  nome: (p) => p.name,
  pais: (p) => p.country,
  status: (p) => (p.active ? 'Ativo' : 'Inativo'),
};

export default function ParceirosPage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<Paginated<Partner>>('/partners?take=200')
      .then((res) => setItems(res.data))
      .catch(() => setError('Não foi possível carregar os parceiros'))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(
    () => filtrarPorTexto(items, busca, (p) => [p.name, p.country]),
    [items, busca],
  );

  const { dados, campo, direcao, alternar } = useTableSort(filtrados, ACESSORES, 'nome');

  return (
    <div className="painel-entra">
      <PageHeader
        titulo="Parceiros"
        descricao="Fabricantes internacionais representados pela Lipid no Brasil."
        acao={
          <Link href="/parceiros/novo">
            <Button variant="primary">+ Novo Parceiro</Button>
          </Link>
        }
      />

      <Card flush>
        <div className="border-b border-gray-100 px-6 py-4">
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Buscar por nome ou país..."
            contagem={dados.length}
          />
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <EstadoVazio
            titulo="Nenhum parceiro cadastrado ainda"
            descricao="O parceiro é sempre o fabricante representado — nunca a própria Lipid."
            acao={
              <Link href="/parceiros/novo">
                <Button variant="primary">+ Novo Parceiro</Button>
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
                    Parceiro
                  </SortHead>
                  <SortHead campo="pais" atual={campo} direcao={direcao} onClick={alternar}>
                    País
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
                    <td>
                      <div className="flex items-center gap-3">
                        {item.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={resolveMediaUrl(item.logo)}
                            alt=""
                            className="h-8 w-20 flex-shrink-0 object-contain object-left"
                          />
                        ) : (
                          <span className="flex h-8 w-20 flex-shrink-0 items-center justify-center rounded bg-gray-50 text-[10px] text-gray-400">
                            sem logo
                          </span>
                        )}
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-600">{item.country || '—'}</td>
                    <td>
                      <span className={`selo ${item.active ? 'selo-verde' : 'selo-vermelho'}`}>
                        {item.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/parceiros/${item.id}`}
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

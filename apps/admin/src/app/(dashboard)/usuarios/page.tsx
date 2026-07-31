'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PageHeader, EstadoVazio } from '@/components/PageHeader';
import { SearchInput, filtrarPorTexto } from '@/components/SearchInput';
import { useTableSort, SortHead, type Acessores } from '@/components/DataTable';
import { api } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  active: boolean;
}

const ROTULO_PAPEL: Record<User['role'], { texto: string; selo: string }> = {
  ADMIN: { texto: 'Administrador', selo: 'selo-azul' },
  EDITOR: { texto: 'Editor', selo: 'selo-ambar' },
  USER: { texto: 'Usuário', selo: 'selo-cinza' },
};

const ACESSORES: Acessores<User> = {
  nome: (u) => u.name,
  email: (u) => u.email,
  papel: (u) => u.role,
  status: (u) => (u.active ? 'Ativo' : 'Inativo'),
};

export default function UsuariosPage() {
  const [items, setItems] = useState<User[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get<User[]>('/admin/users')
      .then(setItems)
      .catch(() => setError('Não foi possível carregar os usuários'))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(
    () => filtrarPorTexto(items, busca, (u) => [u.name, u.email, u.role]),
    [items, busca],
  );

  const { dados, campo, direcao, alternar } = useTableSort(filtrados, ACESSORES, 'nome');

  return (
    <div className="painel-entra">
      <PageHeader
        titulo="Usuários"
        descricao="Quem tem acesso ao painel."
        acao={
          <Link href="/usuarios/novo">
            <Button variant="primary">+ Novo Usuário</Button>
          </Link>
        }
      />

      <Card flush>
        <div className="border-b border-gray-100 px-6 py-4">
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Buscar por nome, e-mail ou papel..."
            contagem={dados.length}
          />
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <EstadoVazio titulo="Nenhum usuário cadastrado ainda" />
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
                  <SortHead campo="email" atual={campo} direcao={direcao} onClick={alternar}>
                    E-mail
                  </SortHead>
                  <SortHead campo="papel" atual={campo} direcao={direcao} onClick={alternar}>
                    Papel
                  </SortHead>
                  <SortHead campo="status" atual={campo} direcao={direcao} onClick={alternar}>
                    Status
                  </SortHead>
                </tr>
              </thead>
              <tbody>
                {dados.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium text-gray-900">{item.name || '—'}</td>
                    <td className="text-gray-600">{item.email}</td>
                    <td>
                      <span className={`selo ${ROTULO_PAPEL[item.role].selo}`}>
                        {ROTULO_PAPEL[item.role].texto}
                      </span>
                    </td>
                    <td>
                      <span className={`selo ${item.active ? 'selo-verde' : 'selo-vermelho'}`}>
                        {item.active ? 'Ativo' : 'Inativo'}
                      </span>
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

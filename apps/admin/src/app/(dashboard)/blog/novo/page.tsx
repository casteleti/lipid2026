'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ContentForm,
  VALORES_INICIAIS,
  type ContentFormValues,
} from '@/components/ContentForm';
import { montarPayload } from '@/lib/content-payload';
import { api } from '@/lib/api-client';

export default function NovoConteudoPage() {
  const router = useRouter();
  const [valores, setValores] = useState<ContentFormValues>(VALORES_INICIAIS);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async () => {
    setSalvando(true);
    setErro('');
    try {
      await api.post('/content', montarPayload(valores));
      router.push('/blog');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível criar o conteúdo');
      setSalvando(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo conteúdo</h1>
          <p className="mt-1 text-sm text-gray-600">
            Artigo para leitura ou material para download com captura de lead.
          </p>
        </div>
        <Link href="/blog" className="text-sm text-primary-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <ContentForm
        valores={valores}
        onChange={setValores}
        onSubmit={handleSubmit}
        salvando={salvando}
        erro={erro}
        textoBotao="Criar conteúdo"
      />
    </div>
  );
}

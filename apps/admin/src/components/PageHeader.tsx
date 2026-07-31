interface PageHeaderProps {
  titulo: string;
  descricao?: string;
  acao?: React.ReactNode;
}

/** Cabeçalho padrão das telas do painel — mantém título, apoio e ação sempre no mesmo lugar. */
export function PageHeader({ titulo, descricao, acao }: PageHeaderProps) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{titulo}</h1>
        {descricao && <p className="mt-1 text-sm text-gray-500">{descricao}</p>}
      </div>
      {acao && <div className="flex-shrink-0">{acao}</div>}
    </div>
  );
}

/** Estado vazio consistente: diz o que houve e, quando dá, o que fazer a seguir. */
export function EstadoVazio({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-gray-900">{titulo}</p>
      {descricao && <p className="max-w-sm text-sm text-gray-500">{descricao}</p>}
      {acao && <div className="mt-2">{acao}</div>}
    </div>
  );
}

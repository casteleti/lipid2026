import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renderização de Markdown das respostas da Lia. Estilo compacto de propósito — é bolha de
 * chat, não artigo: espaçamento pequeno entre blocos, negrito com peso moderado (não
 * `font-black`), sem headings grandes. `react-markdown` nunca injeta HTML bruto do modelo
 * (sem `dangerouslySetInnerHTML`), então isso é seguro mesmo a resposta vindo direto da API.
 */
const componentes: Components = {
  p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => <p className="mb-1.5 mt-1 text-sm font-bold text-gray-900">{children}</p>,
  h2: ({ children }) => <p className="mb-1.5 mt-1 text-sm font-bold text-gray-900">{children}</p>,
  h3: ({ children }) => <p className="mb-1 mt-1 text-sm font-bold text-gray-900">{children}</p>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-primary-600 underline underline-offset-2 hover:text-primary-700"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-black/[0.06] px-1 py-0.5 font-mono text-[0.85em]">{children}</code>
  ),
  table: ({ children }) => (
    <div className="mb-2 overflow-x-auto rounded-lg border border-gray-200 last:mb-0">
      <table className="w-full text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-gray-200 px-2.5 py-1.5 text-left font-semibold text-gray-700">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-gray-100 px-2.5 py-1.5 align-top">{children}</td>,
};

export function LiaMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={componentes}>
      {children}
    </ReactMarkdown>
  );
}

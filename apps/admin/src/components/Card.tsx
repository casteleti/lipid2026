interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  /** Remove o respiro interno — para quando o conteúdo é uma tabela de ponta a ponta. */
  flush?: boolean;
  className?: string;
}

export function Card({ title, subtitle, action, children, flush, className = '' }: CardProps) {
  const temCabecalho = title || subtitle || action;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)] ${className}`}
    >
      {temCabecalho && (
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={flush ? '' : 'p-6'}>{children}</div>
    </div>
  );
}

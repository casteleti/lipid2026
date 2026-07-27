interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Card({ title, subtitle, action, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {(title || subtitle || action) && (
        <div className="flex justify-between items-start mb-6 pb-6 px-6 pt-6 border-b border-gray-200">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={title || subtitle || action ? 'px-6 pb-6' : 'p-6'}>{children}</div>
    </div>
  );
}

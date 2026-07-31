interface GridBackdropProps {
  /** Usar em fundos escuros (linhas brancas em vez de escuras). */
  dark?: boolean;
  className?: string;
}

/**
 * O grid quadriculado com desvanecimento radial usado no hero das fichas de ingrediente —
 * reaproveitado aqui para qualquer área de fundo "vazia" (placeholder de imagem, painel de
 * cor sólida) ganhar a mesma textura em vez de ficar chapada.
 */
export function GridBackdrop({ dark = false, className }: GridBackdropProps) {
  const lineColor = dark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.09)';

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ''}`}>
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
    </div>
  );
}

interface LipidGraphicProps {
  className?: string;
}

/**
 * Ilustração abstrata (placeholder) de um lipossoma em corte, na paleta da marca.
 * Substituir por um render 3D real quando o asset estiver disponível.
 */
export function LipidGraphic({ className }: LipidGraphicProps) {
  const dots = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const r = 168;
    return { x: 220 + Math.cos(angle) * r, y: 220 + Math.sin(angle) * r, angle };
  });

  return (
    <svg viewBox="0 0 440 440" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lipidCore" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#eaf1ff" />
          <stop offset="55%" stopColor="#95abea" />
          <stop offset="100%" stopColor="#1e3f99" />
        </radialGradient>
        <linearGradient id="lipidRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5579dd" />
          <stop offset="100%" stopColor="#132862" />
        </linearGradient>
      </defs>

      <circle cx="220" cy="220" r="168" fill="none" stroke="#bfdbfe" strokeOpacity="0.4" strokeWidth="1" />

      {dots.map((d, i) => (
        <line
          key={`line-${i}`}
          x1={220 + Math.cos(d.angle) * 96}
          y1={220 + Math.sin(d.angle) * 96}
          x2={d.x}
          y2={d.y}
          stroke="url(#lipidRing)"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      ))}

      {dots.map((d, i) => (
        <circle key={`dot-${i}`} cx={d.x} cy={d.y} r={i % 3 === 0 ? 7 : 5} fill="url(#lipidRing)" />
      ))}

      <circle cx="220" cy="220" r="98" fill="url(#lipidCore)" />
      <circle cx="220" cy="220" r="98" fill="none" stroke="#0e1e48" strokeOpacity="0.15" strokeWidth="6" />

      <circle cx="196" cy="196" r="10" fill="#ffffff" fillOpacity="0.55" />
      <circle cx="248" cy="250" r="5" fill="#ffffff" fillOpacity="0.4" />
    </svg>
  );
}

import { useEffect, useRef } from "react";

/**
 * Botão "Fale com um especialista" com rede de partículas (molecular) no hover.
 * Sem dependências. Estilos inline — troque por Tailwind/CSS Modules se preferir.
 */
export default function BotaoEspecialista({
  children = "Fale com um especialista",
  particleColor = "#8fb6ff",
  particleCount = 26,
  ...props
}) {
  const canvasRef = useRef(null);
  const target = useRef(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, parts = [], hover = 0, raf;

    const seed = () => {
      parts = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.24,
        r: 0.7 + Math.random() * 1.5, p: Math.random() * Math.PI * 2,
      }));
    };
    const resize = () => {
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!parts.length) seed();
    };

    const hex = particleColor.replace("#", "");
    const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");

    const tick = () => {
      hover += (target.current - hover) * 0.09;
      ctx.clearRect(0, 0, w, h);
      if (hover > 0.01 && w) {
        for (const p of parts) {
          p.x += p.vx; p.y += p.vy; p.p += 0.05;
          if (p.x < 0) p.x += w; if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h; if (p.y > h) p.y -= h;
        }
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const a = parts[i], b = parts[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 46) {
              ctx.strokeStyle = `rgba(${rgb},${(0.3 * (1 - d / 46) * hover).toFixed(3)})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        for (const p of parts) {
          const tw = 0.55 + 0.45 * Math.sin(p.p);
          ctx.fillStyle = `rgba(${rgb},${(0.85 * tw * hover).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${rgb},${(0.12 * tw * hover).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(c);
    resize();
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [particleColor, particleCount]);

  return (
    <button
      type="button"
      onMouseEnter={() => (target.current = 1)}
      onMouseLeave={() => (target.current = 0)}
      onFocus={() => (target.current = 1)}
      onBlur={() => (target.current = 0)}
      style={{
        position: "relative", overflow: "hidden", border: 0, cursor: "pointer",
        padding: "15px 30px", borderRadius: 999, background: "#0f1e46",
        color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "0.01em",
        transition: "background 300ms ease, box-shadow 300ms ease, transform 300ms ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#16306f";
        e.currentTarget.style.boxShadow = "0 8px 26px rgba(20,45,110,0.32)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "#0f1e46";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
      {...props}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      <span style={{ position: "relative" }}>{children}</span>
    </button>
  );
}

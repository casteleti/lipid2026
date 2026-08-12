import { useEffect, useRef, useState } from "react";

/**
 * Header da Lipid: ao rolar, o "ingredients" e as letras L-I-P-I-D evaporam
 * (sobem, giram levemente e desfocam), uma a uma. O símbolo permanece FIXO,
 * no tamanho original. Ao voltar ao topo, o lockup se reconstrói na ordem inversa.
 */
const LETTERS = [
  { src: "/assets/lipid-letter-l.svg",  left: "0%",      width: "21.9%" },
  { src: "/assets/lipid-letter-i1.svg", left: "28.58%",  width: "3.11%" },
  { src: "/assets/lipid-letter-p.svg",  left: "38.11%",  width: "23.35%" },
  { src: "/assets/lipid-letter-i2.svg", left: "67.63%",  width: "3.11%" },
  { src: "/assets/lipid-letter-d.svg",  left: "76.93%",  width: "23.06%" },
];

const WORD_W = 148;      // px — largura do bloco do wordmark
const WORD_H = 61.6;     // px — altura (mantém a proporção 147.46 x 61.32 do vetor)
const STAGGER = 55;      // ms entre letras
const THRESHOLD = 70;    // px de scroll para colapsar

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const on = collapsed;
  const n = LETTERS.length;

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: on ? "13px 40px" : "24px 40px",
        background: on ? "rgba(241,237,231,0.95)" : "rgba(241,237,231,0.84)",
        backdropFilter: "blur(8px)",
        boxShadow: on ? "0 10px 30px rgba(20,30,60,0.09)" : "none",
        transition: "padding 420ms cubic-bezier(.19,1,.22,1), box-shadow 420ms ease, background 420ms ease",
      }}
    >
      <a href="/" style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        {/* símbolo: tamanho fixo, nunca anima */}
        <img src="/assets/lipid-symbol.svg" alt="Lipid" width={62} height={62} style={{ display: "block", flex: "none" }} />

        {/* wordmark: colapsa a largura depois que as letras somem */}
        <span
          style={{
            display: "block", overflow: "hidden",
            maxWidth: on ? 0 : WORD_W,
            transitionProperty: "max-width",
            transitionDuration: "620ms",
            transitionTimingFunction: "cubic-bezier(.19,1,.22,1)",
            transitionDelay: on ? `${n * STAGGER + 120}ms` : "0ms",
          }}
        >
          <span style={{ position: "relative", display: "block", width: WORD_W, height: WORD_H }}>
            {LETTERS.map((l, i) => (
              <img
                key={l.src}
                src={l.src}
                alt=""
                style={{
                  position: "absolute", left: l.left, top: 0, width: l.width, height: "55.3%",
                  opacity: on ? 0 : 1,
                  filter: on ? "blur(6px)" : "none",
                  transform: on ? "translateY(-18px) rotate(-8deg) scale(0.92)" : "none",
                  transition:
                    "transform 520ms cubic-bezier(.19,1,.22,1), opacity 380ms ease, filter 520ms ease",
                  transitionDelay: `${on ? i * STAGGER + 60 : (n - 1 - i) * STAGGER}ms`,
                }}
              />
            ))}
            {/* hairline "ingredients": sai primeiro, volta por último */}
            <img
              src="/assets/lipid-ingredients.svg"
              alt="ingredients"
              style={{
                position: "absolute", left: "38.05%", top: "65.75%", width: "60.83%", height: "34.25%",
                opacity: on ? 0 : 1,
                filter: on ? "blur(5px)" : "none",
                transform: on ? "translateY(-10px) rotate(-5deg)" : "none",
                transition:
                  "transform 460ms cubic-bezier(.19,1,.22,1), opacity 320ms ease, filter 460ms ease",
                transitionDelay: on ? "0ms" : `${n * STAGGER + 60}ms`,
              }}
            />
          </span>
        </span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14, fontWeight: 600, color: "#4b5468" }}>
        {/* seus links aqui */}
      </nav>
    </header>
  );
}

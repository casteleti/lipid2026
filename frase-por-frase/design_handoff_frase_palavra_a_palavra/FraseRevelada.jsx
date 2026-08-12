import { useEffect, useRef } from "react";

/**
 * Frase centralizada que se revela PALAVRA A PALAVRA ao entrar na dobra.
 * Cada palavra sobe, sai do desfoque e aparece, em cascata.
 */
export default function FraseRevelada({
  text = "Quando a tecnologia fica invisível na fórmula, ela aparece no desempenho, no sensorial e no valor percebido.",
  stagger = 45,          // ms entre palavras
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-word]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.filter = "none";
        w.style.transform = "none";
      });
      return;
    }

    const show = (on) =>
      words.forEach((w, i) => {
        w.style.transitionDelay = on ? `${i * stagger}ms` : "0ms";
        w.style.opacity = on ? "1" : "0";
        w.style.filter = on ? "blur(0px)" : "blur(9px)";
        w.style.transform = on ? "translateY(0)" : "translateY(20px)";
      });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) show(true);
          else if (e.boundingClientRect.top > 0) show(false); // rearma ao subir de volta
        }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, stagger]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        maxWidth: 860,
        margin: "0 auto",
        textAlign: "center",
        fontSize: 34,
        lineHeight: 1.34,
        fontWeight: 700,
        color: "#0f1e46",
        textWrap: "pretty",
      }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          data-word
          style={{
            display: "inline-block",
            opacity: 0,
            filter: "blur(9px)",
            transform: "translateY(20px)",
            transition:
              "opacity 800ms cubic-bezier(.22,.61,.36,1), transform 800ms cubic-bezier(.22,.61,.36,1), filter 800ms cubic-bezier(.22,.61,.36,1)",
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
}

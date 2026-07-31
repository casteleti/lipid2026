/**
 * Normalização canônica de slug do projeto.
 *
 * ATENÇÃO: o importador de catálogo replica este algoritmo em Python
 * (scripts/import-catalogo/importar_catalogo.py, função `slugify`). Se mudar aqui,
 * mude lá também — senão editar um produto no CMS regenera um slug diferente do que
 * foi importado e a URL pública muda sozinha, quebrando links e SEO.
 *
 * Decisões que o catálogo real exigiu:
 *  - Letras gregas viram palavra ("β-Nicotinamide" -> "beta-nicotinamide"). Descartar o
 *    caractere geraria "-nicotinamide", com hífen solto na frente.
 *  - ® e ™ somem sem deixar hífen (97 produtos Lipoid usam "Herbasol®").
 *  - Hifens repetidos colapsam ("Rice - Herbasol" -> "rice-herbasol", não "rice---herbasol").
 */

const TRANSLITERACAO: Record<string, string> = {
  α: 'alpha',
  β: 'beta',
  γ: 'gamma',
  δ: 'delta',
  ε: 'epsilon',
  κ: 'kappa',
  λ: 'lambda',
  μ: 'mu',
  ω: 'omega',
  '&': ' e ',
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[αβγδεκλμω&]/g, (c) => TRANSLITERACAO[c] ?? c)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // acentos
    .replace(/[^a-z0-9\s-]/g, '') // ASCII apenas — \w aceitaria não-latinos
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Gera um slug único, sufixando -1, -2... quando já existe.
 * `existe` consulta a tabela do módulo chamador (o slug é único por tabela).
 */
export async function generateUniqueSlug(
  value: string,
  existe: (slug: string) => Promise<boolean>,
): Promise<string> {
  const base = slugify(value);
  let slug = base;
  let counter = 1;

  while (await existe(slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}

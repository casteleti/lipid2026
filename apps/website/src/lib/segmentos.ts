/**
 * Ponte entre o modelo antigo `Application` (/aplicacoes) e as landings de segmento
 * (/segmentos). As páginas públicas passaram a ser as de segmento; `Application`
 * continua existindo como classificação interna (sem tela própria no admin desde a
 * migração para /segmentos), sem relação com ingredientes — o model `Ingredient` foi
 * removido do sistema.
 *
 * Uma fonte só de verdade para o de-para: os redirects do next.config e os links
 * internos ("Aplicada em") leem daqui. Aplicação sem equivalente cai no índice.
 */
export const APLICACAO_PARA_SEGMENTO: Record<string, string> = {
  pharma: 'farmaceutica',
  cosmeticos: 'cosmetica',
};

export function hrefDaAplicacao(slug: string): string {
  const segmento = APLICACAO_PARA_SEGMENTO[slug];
  return segmento ? `/segmentos/${segmento}` : '/segmentos';
}

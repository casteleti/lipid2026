import { NextRequest, NextResponse } from 'next/server';

/**
 * Mapa de preservação das URLs públicas do site anterior.
 *
 * O catálogo antigo foi removido do novo produto. Cada família legada segue para a
 * página de segmento ou tecnologia mais próxima — nunca para a homepage. URLs de
 * campanha sem equivalente e caminhos de spam não passam por aqui e permanecem 404.
 *
 * O middleware devolve 301 explicitamente. `redirects()` do next.config usa 308
 * para redirects permanentes, que é tecnicamente válido, mas este mapa precisa
 * manter o código histórico 301 combinado para a migração de SEO.
 */
const DESTINOS_EXATOS: Record<string, string> = {
  '/institucional': '/sobre',
  '/conheca-a-lipid-ingredients': '/sobre',
  '/servicos': '/tecnologias',
  '/servicos/1/pesquisa-e-desenvolvimento': '/tecnologias/encapsulacao',
  '/servicos/2/analiticos': '/tecnologias',
  '/servicos/3/estudo-de-permeacao-e-liberacao': '/tecnologias/encapsulacao',
  '/lecitinas-fosfolipidios': '/tecnologias/fosfolipidios',
  '/blog/industria-cosmetica/5/pele-renovada-e-protegida':
    '/blog/lipoid-kosmetik-ativos-para-longevidade-da-pele',
  '/blog/lecitinas/3/conheca-as-vantagens-unicas-dos-fosfolipidios': '/tecnologias/fosfolipidios',
  '/blog/lecitinas/2/a-importancia-dos-fosfolipidios-no-combate-ao-covid-19':
    '/blog/lipoid-fosfolipidios-em-vacinas-avancadas',
  '/blog/botanicos/1/lipoid-kosmetik-lanca-novo-ativo-botanico-phytocodine':
    '/blog/lipoid-kosmetik-catalogo-de-ativos-e-extratos-botanicos',
};

function destinoLegado(pathname: string): string | undefined {
  if (pathname === '/index.php') return '/';

  const normalized = pathname.startsWith('/index.php/')
    ? pathname.slice('/index.php'.length)
    : pathname;

  const exact = DESTINOS_EXATOS[normalized];
  if (exact) return exact;

  if (normalized === '/produtos') return '/segmentos';
  if (normalized.startsWith('/produtos/farmaceutico/')) return '/segmentos/farmaceutica';
  if (normalized.startsWith('/produtos/cosmetico/')) return '/segmentos/cosmetica';
  if (normalized.startsWith('/produtos/veterinario/')) return '/segmentos/veterinaria';

  if (normalized.startsWith('/produtos/nutricao/9/sistemas-de-liberacao')) {
    return '/tecnologias/encapsulacao';
  }
  if (normalized.startsWith('/produtos/nutricao/')) return '/tecnologias/fosfolipidios';

  return undefined;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const destination = destinoLegado(pathname);

  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  // O novo blog não tem arquivo por categoria. Preserva a intenção editorial sem
  // manter parâmetros de uma taxonomia que não existe mais.
  if (pathname === '/blog' && searchParams.has('categoria')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/index.php',
    '/index.php/:path*',
    '/institucional',
    '/conheca-a-lipid-ingredients',
    '/lecitinas-fosfolipidios',
    '/produtos',
    '/produtos/:path*',
    '/servicos',
    '/servicos/:path*',
    '/blog',
    '/blog/:path*',
  ],
};

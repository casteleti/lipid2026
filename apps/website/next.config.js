/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'api.daksa.app.br' },
      { protocol: 'http', hostname: 'localhost', port: '3002' },
    ],
  },

  // Serve /uploads/* pelo próprio domínio do site, proxiado internamente pro serviço da
  // API (`API_URL`, endereço Docker interno — mesma lógica de `lib/api-url.ts`). Sem isso,
  // `resolveMediaUrl`/`resolveAssetUrl` montavam `src`/`href` apontando direto pra
  // `api.daksa.app.br`: funcionava pro navegador buscar a imagem crua, mas o otimizador de
  // imagem do Next (`/_next/image`, roda no servidor) precisa buscar essa mesma URL — e o
  // container `website` chamando o domínio público da API cai no mesmo hairpin NAT do
  // incidente 2026-09-11, só que agora sempre (não só em rotas SSR por slug). Com o proxy,
  // a busca do otimizador acontece internamente (`website` → `api:3002`), sem passar pelo
  // Traefik/domínio público.
  rewrites: async () => {
    const apiInterno = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
    return [{ source: '/uploads/:path*', destination: `${apiInterno}/uploads/:path*` }];
  },

  // /aplicacoes foi substituída por /segmentos. Redirect permanente (301) porque as URLs
  // antigas já podem estar indexadas. O de-para de slug também existe em
  // src/lib/segmentos.ts (para links internos) — este arquivo é CommonJS e não importa TS.
  redirects: async () => {
    return [
      { source: '/aplicacoes', destination: '/segmentos', permanent: true },
      { source: '/aplicacoes/pharma', destination: '/segmentos/farmaceutica', permanent: true },
      { source: '/aplicacoes/cosmeticos', destination: '/segmentos/cosmetica', permanent: true },
      { source: '/aplicacoes/nutraceutico', destination: '/segmentos', permanent: true },
      // Aplicação sem equivalente cai no índice em vez de dar 404.
      { source: '/aplicacoes/:slug', destination: '/segmentos', permanent: true },
      // Segmento Nutricional descontinuado — a landing saiu do ar, cai no índice.
      { source: '/segmentos/nutricional', destination: '/segmentos', permanent: true },
    ];
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

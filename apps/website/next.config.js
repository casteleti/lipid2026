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

  // /aplicacoes foi substituída por /segmentos. Redirect permanente (301) porque as URLs
  // antigas já podem estar indexadas. O de-para de slug também existe em
  // src/lib/segmentos.ts (para links internos) — este arquivo é CommonJS e não importa TS.
  redirects: async () => {
    return [
      { source: '/aplicacoes', destination: '/segmentos', permanent: true },
      { source: '/aplicacoes/pharma', destination: '/segmentos/farmaceutica', permanent: true },
      { source: '/aplicacoes/cosmeticos', destination: '/segmentos/cosmetica', permanent: true },
      { source: '/aplicacoes/nutraceutico', destination: '/segmentos/nutricional', permanent: true },
      // Aplicação sem equivalente cai no índice em vez de dar 404.
      { source: '/aplicacoes/:slug', destination: '/segmentos', permanent: true },
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

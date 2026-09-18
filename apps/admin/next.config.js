const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Imagem de runtime enxuta (só o server.js + deps traçadas, sem node_modules inteiro).
  // outputFileTracingRoot precisa apontar pra raiz do monorepo pnpm, senão o tracing não
  // encontra os pacotes hoisted no node_modules raiz e o build standalone falha em runtime.
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;

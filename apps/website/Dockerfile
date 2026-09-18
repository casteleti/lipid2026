# Stage 1: Dependencies
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/website/package.json ./apps/website/package.json
COPY packages ./packages

RUN pnpm install --frozen-lockfile --prod=false --filter lipid-website...

# Stage 2: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY --from=deps /app ./
COPY apps/website ./apps/website

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter lipid-website run build

# Stage 3: Runtime (Next.js standalone output — não precisa de pnpm/node_modules completo)
FROM node:22-alpine

WORKDIR /app

# output: 'standalone' em monorepo pnpm replica a estrutura de pastas a partir da raiz do
# workspace (outputFileTracingRoot) — por isso copiamos para /app e não para
# /app/apps/website diretamente.
COPY --from=builder /app/apps/website/.next/standalone ./
COPY --from=builder /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=builder /app/apps/website/public ./apps/website/public

WORKDIR /app/apps/website

EXPOSE 3000

CMD ["node", "server.js"]

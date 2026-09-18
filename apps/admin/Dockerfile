# Stage 1: Dependencies
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages ./packages

RUN pnpm install --frozen-lockfile --prod=false --filter lipid-admin...

# Stage 2: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY --from=deps /app ./
COPY apps/admin ./apps/admin

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter lipid-admin run build

# Stage 3: Runtime (Next.js standalone output — não precisa de pnpm/node_modules completo)
FROM node:22-alpine

WORKDIR /app

# output: 'standalone' em monorepo pnpm replica a estrutura de pastas a partir da raiz do
# workspace (outputFileTracingRoot) — por isso copiamos para /app e não para
# /app/apps/admin diretamente.
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder /app/apps/admin/public ./apps/admin/public

WORKDIR /app/apps/admin

EXPOSE 3001

CMD ["node", "server.js"]

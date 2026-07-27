# Stage 1: Build
FROM node:18-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter lipid-api...

COPY apps/api ./apps/api

RUN pnpm --filter lipid-api exec prisma generate

RUN pnpm --filter lipid-api run build

# Stage 2: Runtime
FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# node_modules raiz contém o store pnpm (.pnpm) para o qual os symlinks apontam
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api

EXPOSE 3002

CMD ["node", "dist/main"]

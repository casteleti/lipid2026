# Stage 1: Dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY apps/admin/package.json ./apps/admin/package.json
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter lipid-admin...

# Stage 2: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app ./
COPY apps/admin ./apps/admin

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm install -g pnpm && pnpm --filter lipid-admin run build

# Stage 3: Runtime
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

# node_modules raiz contém o store pnpm (.pnpm) para o qual os symlinks apontam
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=builder /app/apps/admin/.next ./apps/admin/.next
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder /app/apps/admin/package.json ./apps/admin/package.json

WORKDIR /app/apps/admin

EXPOSE 3001

CMD ["pnpm", "start"]

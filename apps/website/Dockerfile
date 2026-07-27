# Stage 1: Dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY apps/website/package.json ./apps/website/package.json
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter lipid-website...

# Stage 2: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app ./
COPY apps/website ./apps/website

RUN npm install -g pnpm && pnpm --filter lipid-website run build

# Stage 3: Runtime
FROM node:18-alpine

WORKDIR /app

# node_modules raiz contém o store pnpm (.pnpm) para o qual os symlinks apontam
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/website/node_modules ./apps/website/node_modules
COPY --from=builder /app/apps/website/.next ./apps/website/.next
COPY --from=builder /app/apps/website/public ./apps/website/public
COPY --from=builder /app/apps/website/package.json ./apps/website/package.json

WORKDIR /app/apps/website

EXPOSE 3000

CMD ["pnpm", "start"]

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --frozen-lockfile --filter lipid-api...

COPY apps/api ./apps/api

RUN pnpm --filter lipid-api run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3002

CMD ["node", "dist/main"]

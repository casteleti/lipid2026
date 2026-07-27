# Stage 1: Dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY apps/website/package.json ./apps/website/package.json
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --frozen-lockfile --filter lipid-website...

# Stage 2: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app ./
COPY apps/website ./apps/website

RUN npm install -g pnpm && pnpm --filter lipid-website run build

# Stage 3: Runtime
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/apps/website/node_modules ./node_modules
COPY --from=builder /app/apps/website/.next ./.next
COPY --from=builder /app/apps/website/public ./public
COPY --from=builder /app/apps/website/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]

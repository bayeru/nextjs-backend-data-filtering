# 1. Install dependencies only when needed
FROM node:alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./

RUN npm install

# 2. Rebuild the source code only when needed
FROM node:alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY ./ ./

ENV NEXT_TELEMETRY_DISABLED 1

# This will do the trick, use the corresponding env file for each environment.
COPY .env.production.sample .env.production

RUN npm run build

# 3. Production image, copy all the files and run next
FROM node:alpine AS runner

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
RUN chown nextjs:nodejs /app

ENV NODE_ENV production

COPY --chown=nextjs:nodejs --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder /app/.next/static ./.next/static

USER nextjs:nodejs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

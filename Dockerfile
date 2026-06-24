FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
RUN npx prisma generate
RUN npx tsc

FROM node:22-slim AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY prisma.config.ts ./

ENV PORT=10000
EXPOSE 10000

CMD npx prisma migrate deploy && node dist/server.js

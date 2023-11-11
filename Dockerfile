FROM node:alpine AS builder

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/

RUN npm install

COPY . .
COPY tsconfig.json .

RUN npm run build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000

CMD [ "npm", "run", "dev:prisma" ]
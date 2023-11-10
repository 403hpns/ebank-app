FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

RUN npm install bcrypt
RUN npm install -D @types/bcrypt

COPY . .

RUN npx prisma generate

RUN npm run build
COPY .next/ ./.next/

EXPOSE 3000:3000
CMD [ "npm", "run", "dev" ]
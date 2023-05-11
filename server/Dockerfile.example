FROM node:alpine

WORKDIR /app
COPY . .
COPY tsconfig.json .
COPY package.json .
EXPOSE 80
# Colocar a URL Depois que o Fly.io criar o banco de dados
ENV DATABASE_URL="URL Banco de dados"
RUN yarn install
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build
CMD [ "node", "dist/server.js" ]

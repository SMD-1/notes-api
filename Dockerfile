FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]

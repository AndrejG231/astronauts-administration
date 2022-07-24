FROM node:16.13.2-alpine3.15

WORKDIR /usr/src/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD yarn start
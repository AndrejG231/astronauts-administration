FROM node:16.13.2-alpine3.15

WORKDIR /client

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

ENV API_URL=${api_url}

CMD yarn start
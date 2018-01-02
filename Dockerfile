FROM node:latest

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

## Add mercadopago public and secret
# MERCADOPAGO_SECRET=
# MERCADOPAGO_PUBLIC_KEY =

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT npm run dev
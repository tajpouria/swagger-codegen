FROM node:alpine

WORKDIR /usr/swagger-codegen

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run bootstrap

RUN npm run build
FROM node:alpine

WORKDIR /usr/swagger-codegen

COPY ./package.json .

RUN yarn

COPY . .

RUN yarn lerna bootstrap
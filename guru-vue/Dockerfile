FROM node:alpine

RUN mkdir /app
WORKDIR /app
RUN npm install -g @vue/cli

COPY ./package.json yarn.lock /app/
RUN yarn install
COPY . /app

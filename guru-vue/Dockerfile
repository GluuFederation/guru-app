FROM node:alpine

RUN mkdir /app
WORKDIR /app
RUN npm install -g @vue/cli

COPY ./package.json /app/
RUN npm install
COPY . /app

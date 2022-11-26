FROM node:alpine as builder

ARG NODE_ENV

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN if [ "$NODE_ENV"="production" ];  then npm run build; fi

COPY . .

EXPOSE 3000


CMD ["npm","run", "start"]


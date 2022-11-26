FROM node:alpine as builder

WORKDIR /app

COPY package*.json .

ARG NODE_ENV

RUN npm install

RUN if [ "$NODE_ENV"="production" ]; \
    then npm run build; \
    fi

COPY . .

EXPOSE 3000


CMD ["npm","run", "start"]


FROM node:alpine

ARG NODE_ENV

WORKDIR /server

COPY package*.json .

RUN if [ "$NODE_ENV" = "development" ]; \
     then npm install; \
     else npm install --only=production; \ 
     fi
COPY . .

EXPOSE 8000

CMD ["node","server.js"]  


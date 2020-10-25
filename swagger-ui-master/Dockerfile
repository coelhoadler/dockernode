FROM node:alpine

WORKDIR /usr/swagger-ui-master

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE ${NODE_PORT}

CMD [ "npm", "start" ]
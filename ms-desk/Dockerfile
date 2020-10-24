FROM node:alpine

WORKDIR /usr/ms-desk

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${NODE_PORT}

CMD [ "npm", "start" ]
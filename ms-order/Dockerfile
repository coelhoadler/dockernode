FROM node:alpine

WORKDIR /usr/ms-order

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${NODE_PORT}

CMD [ "npm", "start" ]
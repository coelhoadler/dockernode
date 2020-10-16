FROM node:alpine

WORKDIR /usr/ms-order

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3536

CMD [ "npm", "start" ]
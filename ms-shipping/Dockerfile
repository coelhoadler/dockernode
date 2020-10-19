FROM node:alpine

WORKDIR /usr/ms-shipping

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3535

CMD [ "npm", "start" ]
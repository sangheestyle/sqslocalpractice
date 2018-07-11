FROM node:8.11.3-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD npm run create-db && npm start
FROM node:8.11.3-alpine

WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD ["npm", "start"]
FROM node:8.11.3-alpine

WORKDIR /usr/src/scanner
COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "start"]
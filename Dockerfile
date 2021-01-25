FROM node:14.15.0-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app/

RUN npm run build

CMD ["npm", "start"]

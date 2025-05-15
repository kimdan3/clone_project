FROM node:20-alpine
LABEL author Dan Kim <dankimtest@gmail.com>


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000
CMD npm run start


FROM node:20.10.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm ci

CMD [ "npm", "run", "dev" ]

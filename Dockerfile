FROM node:20.10.0

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install --omit=dev
RUN npm run build

CMD [ "npm", "run", "start" ]
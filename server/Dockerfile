FROM node:20
LABEL authors="Filip Viduna"
WORKDIR /app
COPY /server server/
COPY /database database/
COPY /types.ts .
WORKDIR /app/server/node_modules/puppeteer
RUN npm install
WORKDIR /app/server
RUN npm install
RUN apt-get update && apt-get install -y libnss3 libasound2 libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libatk-bridge2.0-0

CMD [ "./node_modules/.bin/ts-node", "index.ts" ]
FROM node:20
LABEL authors="Filip Viduna"
WORKDIR /app
COPY /client client/
COPY /database database/
COPY /types.ts .
WORKDIR /app/client
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD serve -s build
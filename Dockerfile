FROM node:10.14.0
WORKDIR /app
COPY dist /app/dist
COPY server.js /app/
COPY package.json /app/
RUN npm install connect-history-api-fallback@1.6.0 express@4.16.4
RUN npm cache clean --force
CMD [ "npm", "start" ]
EXPOSE 3000

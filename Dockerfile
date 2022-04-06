FROM node:16-alpine
WORKDIR /var/www
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start

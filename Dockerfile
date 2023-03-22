FROM node:lts-alpine
WORKDIR /bot/
COPY ["package.json", "./"]
RUN npm install && mv node_modules ../bot
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

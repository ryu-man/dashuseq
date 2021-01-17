FROM node:14

WORKDIR /usr/src/dashu

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 9090

CMD ["node", "index.js"]
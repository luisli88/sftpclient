FROM node:15-alpine

RUN npm i -g npm

WORKDIR /home/node/filestore

COPY --chown=node:node . .
RUN rm -rf node_modules
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
FROM node:16.14.0-alpine
ENV NODE_ENV=production
USER node

RUN mkdir -p /home/node/app/node_modules && \
  chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./


RUN npm install --production

COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "index.js" ]
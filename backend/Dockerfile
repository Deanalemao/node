FROM node:24-alpine 

WORKDIR /app

ENV NODE_ENV=production 

COPY package*.json .

RUN npm ci --moit=dev

COPY --chown=node:node . .

USER node

EXPOSE 5001

CMD ["npm", "start"]
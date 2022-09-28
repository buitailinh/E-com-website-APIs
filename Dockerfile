FROM node:16.15.1-alpine

WORKDIR /usr/src/app
# COPY package*.json ./
COPY . .
RUN npm cache clean --force \
    && npm install \
    && npm run build

EXPOSE 3000

CMD ["npm","run", "start:prod"]


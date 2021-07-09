FROM node:alpine

WORKDIR /app
COPY . /app
RUN npm install

ENTRYPOINT [ "node" ]
CMD [ "index.js", "serve" ]
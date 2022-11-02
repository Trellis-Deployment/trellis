FROM --platform=linux/amd64 node:18-alpine

WORKDIR /

ADD ./startup.js /
ADD ./package.json /
RUN chmod +x startup.js
RUN npm install

ENTRYPOINT [ "node", "startup.js" ]

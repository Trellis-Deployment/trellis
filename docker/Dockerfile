FROM node:18-alpine

WORKDIR /

ADD ./startup.js /
RUN chmod +x startup.js

ENTRYPOINT [ "node", "startup.js" ]
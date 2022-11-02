FROM node:18-alpine
# FROM --platform=linux/amd64 node:18-alpine
# FROM --platform=linux/arm64 node:18-alpine

WORKDIR /

ADD ./startup.js /
RUN chmod +x startup.js

ENTRYPOINT [ "node", "startup.js" ]
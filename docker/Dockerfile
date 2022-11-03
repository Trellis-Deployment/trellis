FROM --platform=linux/amd64 node:18-alpine

WORKDIR /

ADD ./startup.js /
ADD ./package.json /
COPY ./utils /utils
RUN chmod +x startup.js
RUN npm install

ENTRYPOINT [ "node", "startup.js" ]

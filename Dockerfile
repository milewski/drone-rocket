FROM node:alpine

COPY . /opt

WORKDIR /opt

RUN npm ci && \
    npm run build && \
    npm install . -g

ENTRYPOINT [ "rocket-webhook" ]

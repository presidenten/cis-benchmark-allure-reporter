FROM node:12.13.0-alpine

RUN apk --no-cache add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn

COPY index.js /app/index.js

RUN addgroup -S user && \
    adduser -S user -G user && \
    mkdir -p /app/output && \
    chown -R user:user /app

USER user

CMD node index.js && yarn report

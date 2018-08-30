# forked from: https://github.com/lagun4ik/docker-images/blob/master/laravel-echo-server/Dockerfile
FROM node:8.11.4-alpine

USER root

RUN apk add --update --no-cache bash

RUN apk add --update --no-cache -t .build-deps python2 make gcc \
	&& yarn global add --prod --no-lockfile laravel-echo-server@1.3.9 \
	&& apk del .build-deps \
	&& yarn cache clean

USER node

WORKDIR /app

CMD ["laravel-echo-server", "start"]

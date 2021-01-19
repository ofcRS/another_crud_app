FROM node:12-alpine as frontbuild

ARG API_HOST
ARG API_PORT

ENV API_HOST=$API_HOST
ENV API_PORT=$API_PORT

WORKDIR /client
COPY ./package.json /client/package.json
COPY ./yarn.lock /client/yarn.lock

# Устанавливаем yarn
#RUN apt update && apt install -y gnupg2
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#RUN apt update && apt install -y yarn

RUN yarn install
COPY . .
RUN yarn build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontbuild /client/dist /usr/share/nginx/html
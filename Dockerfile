FROM node:12.9.0

WORKDIR /usr/app

ADD https://yarnpkg.com/latest.tar.gz .

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE ${PORT}

CMD [ "yarn", "dev" ]




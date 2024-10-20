# Dockerfile
FROM node:14

#ENV NUXT_HOST=0.0.0.0
#ENV NUXT_PORT=3000

# create destination directory
#RUN mkdir -p /usr/src/nuxt-app
#WORKDIR /usr/src/nuxt-app
#RUN mkdir app
WORKDIR /usr/src/nuxt-app
ADD . /usr/src/nuxt-app



# update and install dependency
#RUN apk update && apk upgrade
#RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app

RUN yarn install
RUN yarn build

#EXPOSE 3000
#
#CMD [ "npm", "start" ]

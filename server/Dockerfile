FROM node:14

ENV NODE_ENV=development

#preinstall app dependencies
RUN mkdir -p /src
WORKDIR /src
COPY package.json ./
VOLUME /src/node_modules 
RUN env && yarn

# Ensure we can find nodemon, etc. Expects a bind-mount of ./ to /src
ENV PATH="/src/node_modules/.bin:${PATH}"

# start in dev mode
CMD yarn start:dev
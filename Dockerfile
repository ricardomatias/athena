From node:7.7.4

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 3000:80

ENV NODE_ENV "production"

CMD [ "npm", "run" "build" ]
CMD [ "npm", "start" ]

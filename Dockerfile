FROM node:10.15.3
ENV NODE_ENV="production"

RUN mkdir /booking-service-docker-container
ADD . /booking-service-docker-container
WORKDIR /booking-service-docker-container
RUN npm install
EXPOSE 3002
CMD ["node", "server/index.js"]
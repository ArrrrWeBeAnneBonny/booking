FROM node:10.15.3
ENV NODE_ENV=production
RUN mkdir /appBooking
ADD . /appBooking
WORKDIR /appBooking
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "start"]

FROM node:14.17.0
ENV NODE_ENV=production
RUN mkdir /app-booking
ADD . /app-booking
WORKDIR /app-booking
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "run", "start"]



FROM node:16.3.0
ENV NODE_ENV=production
RUN mkdir /app-booking
ADD . /app-booking
WORKDIR /app-booking
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "start"]



FROM node:14.17.0
ENV NODE_ENV=production
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "./server/index.js"]



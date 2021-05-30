FROM node:10.15.3
ENV NODE_ENV production
RUN mkdir /app
ADD . /app
WORKDIR /app
COPY "package.json"
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "server/index.js"]

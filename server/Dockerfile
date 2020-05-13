FROM node:12-alpine

WORKDIR /server
COPY . .

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python

RUN npm install --quiet node-gyp -g
RUN npm install --quiet

RUN apk del native-deps

CMD ["node", "index.js"]
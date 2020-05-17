FROM node:12-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /server
COPY . .

RUN npm install --quiet node-gyp -g
RUN npm install --quiet

RUN apk del native-deps

CMD ["node", "index.js"]
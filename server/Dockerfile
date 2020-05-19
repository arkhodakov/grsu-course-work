FROM node:12-alpine

# ======================= #
# -- Core C++ / Python -- #
# ======================= #

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /server
COPY . .

# ======================= #
# -- Node Dep. install -- #
# ======================= #

RUN npm install --quiet node-gyp -g
RUN npm install --quiet

RUN apk del native-deps

CMD ["node", "index.js"]



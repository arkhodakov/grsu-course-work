FROM node:12-alpine

WORKDIR /web
COPY . .

# ======================= #
# -- Node Dep. install -- #
# ======================= #

RUN npm install --silent
RUN npm install -g serve

# ======================= #
# ---- Project Build ---- #
# ======================= #

RUN npm run-script build

CMD ["serve", "-p", "80", "-s", "build"]




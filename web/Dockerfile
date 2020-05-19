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

ENV REACT_APP_API_HOST=http://34.107.159.190/

RUN npm run-script build

CMD ["serve", "-p", "80", "-s", "build"]




FROM node:12-alpine

WORKDIR /cw-bug-tracker
COPY . .

# Install & Build Web Application --silent
RUN npm install --silent && npm run build
RUN npm install -g serve

CMD ["serve", "-p", "80", "-s", "build"]
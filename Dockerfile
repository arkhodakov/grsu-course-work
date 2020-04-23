FROM node:12-alpine

WORKDIR /cw-bug-tracker
COPY . .

# Install & Build Web Application
RUN cd web && npm install --silent && npm run build

# Install & Build Server
RUN cd server && npm install --silent

RUN npm install -g serve

CMD ["serve", "-p", "80", "-s", "web/build"]
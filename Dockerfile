FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /etc/ssl/certs
RUN wget https://truststore.pki.rds.amazonaws.com/ap-south-1/ap-south-1-bundle.pem -O /etc/ssl/certs/rds-combined-ca-bundle.pem

EXPOSE 5000

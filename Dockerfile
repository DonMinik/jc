FROM ubuntu:latest
MAINTAINER d.mathar@t-online.de

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm
RUN apt-get clean

RUN cd jourfix-planning-service

COPY ./package.json src/

RUN cd src && npm install

COPY . /src

WORKDIR src/

CMD ["npm", "start"]

RUN cd ../jf-planning-webapp

CMD ["npm", "start"]

FROM node:17
WORKDIR /usr/src/yaksa_auth_service
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
ARG MODE
ENV APP_MODE=${MODE}
CMD ["sh","-c","npm run ${APP_MODE}" ]

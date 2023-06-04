FROM node:18.16.0 as build

WORKDIR /app

COPY packag*.json ./

RUN npm i -F

COPY . .

RUN npm run build


# Final image build
FROM node:18.16.0

WORKDIR /app

ENV APP_ENV=local
ENV TEST_LOGS="false"
ENV PORT=3001
ENV APIKEY="bXVlc3RyYSBkZSBkYXRvcyBhIGVuY3J5cHRhcg=="
ENV SHOW_LOGS=true

ENV MONGO_DB_NAME=base_app_db
ENV MONGO_DB_HOST=mongodb
ENV MONGO_DB_PORT=27017
ENV MONGO_DB_USER=local
ENV MONGO_DB_PWD=14624982

COPY ./src/core/config/certs/*.pem ./src/core/config/certs/
COPY --from=build /app/packag*.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm","run", "execute"]
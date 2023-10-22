FROM node:18.16.0 as build

WORKDIR /app

COPY packag*.json ./
# COPY .env ./

RUN npm i -F

COPY . .

RUN npm run build

RUN npm ci --production

FROM node:18.16.0

WORKDIR /app

COPY --from=build /app/packag*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm","run", "execute"]

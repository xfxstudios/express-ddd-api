FROM node:18.16.0

WORKDIR /app

COPY packag*.json ./

RUN npm i -F

COPY . .

RUN npm run build


FROM node:18.16.0

WORKDIR /app

COPY ./packag*.json /app/packag*.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["npm","run", "execute"]

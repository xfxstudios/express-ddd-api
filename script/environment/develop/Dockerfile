FROM node:16

WORKDIR /app

COPY packag*.json ./

RUN npm i -F

COPY . .

CMD ["npm","run", "build"]

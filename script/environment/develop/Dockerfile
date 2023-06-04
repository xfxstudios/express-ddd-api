FROM node:20.2.0

WORKDIR /app

COPY packag*.json ./

RUN npm i -F

COPY . .

CMD ["npm","run", "build"]

FROM node:18.16.0

WORKDIR /app

COPY packag*.json ./

RUN npm i -F

COPY . .

CMD ["npm","run", "build"]

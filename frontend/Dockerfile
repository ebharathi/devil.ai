FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./


RUN npm install 

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 56789

CMD ["npm","start"]
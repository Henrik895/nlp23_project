FROM node:20-alpine

WORKDIR /backend

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/main"]
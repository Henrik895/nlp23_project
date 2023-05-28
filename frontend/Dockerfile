FROM node:20-alpine as build

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine as serve

COPY --from=build /frontend/dist/frontend/index.html /usr/share/nginx/html/
COPY --from=build /frontend/dist/frontend /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
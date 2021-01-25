FROM node:14.15.0-alpine as build

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/out /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
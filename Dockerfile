FROM nginx:1.15.9-alpine
WORKDIR /app
COPY dist/ /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

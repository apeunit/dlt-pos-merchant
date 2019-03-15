FROM nginx:1.15.9-alpine
WORKDIR /app
COPY dist/ /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

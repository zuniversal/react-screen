FROM nginx

ADD ./dist /usr/share/nginx/html
ADD ./deploy/nginx/default.conf /etc/nginx/conf.d/default.conf

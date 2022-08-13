FROM node
WORKDIR /app
COPY /root/screen/react-screen/ /root/screen/react-screen/
RUN npm install && npm run build

FROM nginx
COPY --from=0 /root/screen/react-screen/dist /code/www
COPY --from=0 /root/angwang/map /etc/nginx/conf.d/default.conf

FROM node as node01
WORKDIR /app
COPY . /app/
RUN npm install --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc
RUN npm install && npm run build


FROM nginx
COPY --from=node01 /app/dist /usr/share/nginx/html
COPY --from=node01 /app/deploy/nginx/default.conf /etc/nginx/conf.d/default.conf


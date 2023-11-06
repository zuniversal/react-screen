
上传文件到服务器
scp -r ./dist root@8.136.3.138:/code/react-screen/

scp -r ./dist root@8.136.3.138:/code/react-book
或者
scp -r ./dist/ root@8.136.3.138:/code/react-book/dist
scp -r ./nginx root@8.136.3.138:/code/react-book


运行容器
docker run -d -p 8855:80 -v /code/react-screen/dist:/code/www -v /code/react-screen/map:/etc/nginx/conf.d --name screenbg nginx

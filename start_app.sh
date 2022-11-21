#! /bin/bash
v='master'
version=${1:-'1.0'}
image='172.25.148.179:8008/laibin/screen'
git checkout -- .
git fetch origin >> /dev/null
nowVersion=`git branch| sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/' -e 's/\//\_/g'`
if test ! -z "$(git diff --stat $nowVersion origin/$v | grep requirements.txt)";then
    a=1
else
    a=0
fi
git checkout -b $v $v
git checkout $v
git pull origin $v
if [ $a -eq 1 ];then
    docker build . -f Dockerfile -t $image:$version --no-cache
fi
docker build . -f Dockerfile -t $image:$version --no-cache &&\
docker push $image:$version
docker rmi $(docker images -f "dangling=true" -q)

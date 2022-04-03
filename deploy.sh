#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/Theraphy-HTP
cd $REPOSITORY

echo "> 실행"
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)

git lfs pull

docker-compose up -d
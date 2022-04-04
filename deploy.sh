#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/Theraphy-HTP/backend-flask

cd $REPOSITORY
aws s3 cp s3://theraphy-htp-bucket/theraphy-htp-project/house3-1.h5 .

cd ..
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)

# git lfs pull

docker-compose up -d
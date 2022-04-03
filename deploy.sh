#!/usr/bin/env bash
# test

REPOSITORY=/home/ubuntu/Theraphy-HTP
cd $REPOSITORY

echo "> 실행"
docker kill $(docker ps -q)
docker-compose up -d
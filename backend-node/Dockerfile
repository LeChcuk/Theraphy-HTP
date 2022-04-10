# node.js 14.x 버전의 base Image
FROM node:14-alpine

# cd 명령어와 같은 것. container 내 nodejs 폴더에 진입하여 여기다가 파일들을 붙여넣겠다는 의미
# 이후에 올 RUN, COPY, ENTRYPOINT 등에 적용될 Working directory를 지정하는 것.
WORKDIR /app

RUN mkdir userUpload

# WORKDIR을 통해 진입한 path(./)에 COPY 하겠다.
# copy <src> <dest>
# src에서 파일이나 디렉토리를 복사하여 dest 경로에 있는 컨테아너의 파일 시스템에 붙여넣겠다
COPY package.json package-lock.json ./

# ci는 install 명령어와 비슷하다. ci/cd할 띠의 ci다.
# install 명령이 package.json을 참고하여 명시한 버전보다 최신 버전을 설치할 수 있는 위험이 내포된 명령어인 반면,
# ci는 package-lock.json을 참고하여 개발에 활용된 버전 그대로를 설치한다.
RUN npm ci

ENV NODE_PATH ./node_modules

COPY /module ./module
COPY server.js .

ENTRYPOINT node server.js

EXPOSE 3001



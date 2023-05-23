## 🌳 Theraphy

충남대학교 컴퓨터공학과 졸업프로젝트입니다. 

3인 구성 팀에서 팀장 역할로 전체적인 개발을 도맡았습니다.

## 소개

Theraphy는 딥러닝 Object Detection을 활용한 HTP(House-Tree-Person) 미술치료 자동화 모듈입니다.

아동이 그린 집, 나무, 사람 그림을 Input으로 입력하면 9가지 성격 지표로 수치화된 결과지를 받아볼 수 있는 웹 서비스입니다.

상담사의 상담과정을 보조하고 HTP 미술치료에 객관성과 일관성을 더할 목적으로 기획되었습니다.

*  크롤링으로 수집한 781개의 집 그림 중 창문, 지붕, 현관문 등으로 라벨링하여 5391개의 Object로 추출하였습니다.
 
*  Keras Retinanet Ojbect Detection 모델을 구축하고, 위 데이터를 학습시켰습니다.
 
*  React - Node.js - Flaks 구조의 웹 서비스를 EC2에 배포하였습니다.
 
* (2022.03) Docker Compose 도커라이징.

* (2022.03) Github Actions를 활용한 자동 배포 환경 구축.

---------

![theraphy](https://user-images.githubusercontent.com/39594520/161876854-56228929-6b26-4091-8eec-32ff70a9b2ac.gif)


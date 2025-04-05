
# 🎬 영화 검색 웹 어플리케이션

> 🔗 **배포 사이트** : [my-ticket-theta.vercel.app](https://my-ticket-theta.vercel.app/)

---

## 📌 1. 프로젝트 소개

### ✅ 프로젝트 개요

- 🎞️ **Movie Open API (TMDB)**:  
  [TMDB API 시작하기](https://developer.themoviedb.org/reference/intro/getting-started)  
- 영화 검색 / SNS 공유 / 로그인 (JWT, Next Auth, OAuth2) / 좋아요 / 해시태그 / 추천 기능 등을 구현한 토이 프로젝트입니다.

---

### 💡 기획 배경

- 강력한 **검색 기능**을 직접 구현해보고자 기획하였습니다.
- 타이핑 검색뿐 아니라, 키워드 검색 / 추천 검색을 포함해 **파워풀한 검색 경험**을 제공합니다.

---

### 🎯 프로젝트 목표

- `Next.js`, `Next Auth`, `JWT`, `OAuth2` 기반 로그인 기능 구현  
- `Spring Boot`, `JPA`, `Spring Security` 백엔드 연동  
- `React.js`의 다양한 Hook 학습 및 적용  
- **반응형 웹사이트**로 다양한 기기에서 사용 가능

---

## 🛠️ 2. 개발 환경 및 기술 스택

### 📚 프레임워크 & 라이브러리

- **Frontend**: Next.js, React.js  
- **Backend**: Spring Boot, Spring Security, JPA  
- **Database**: MySQL

---

### 🧰 언어 및 도구

- **RESTful API** 기반 개발  
- **Movie Open API (TMDB)** 활용

---

## 🚀 3. 기능 소개

---

## 📍 메인 페이지 – 영화 검색

![메인 검색](https://github.com/user-attachments/assets/ea66c330-9765-4207-89d9-81f2392f1494)  
➡️ 영화 제목을 검색할 수 있습니다.

![사이드바 접근](https://github.com/user-attachments/assets/d3507742-b32e-4404-8f84-700a503dfb77)  
➡️ 사이드바 아이콘으로 라우팅 가능합니다.

---

## 🎥 무비 페이지 – 영화 리스트

<img src="https://github.com/user-attachments/assets/7e76abc9-dcbb-4d63-8d00-1e1a0dc0909a" width="350" height="500" />  
➡️ 인기작 / 현재 상영작 / 개봉 예정작 확인 가능

<img src="https://github.com/user-attachments/assets/31e78a61-e9bb-4bc3-91b2-e2900a13d466" width="350" height="500" />  
➡️ 검색, 정렬, 페이지네이션 기능 포함

<img src="https://github.com/user-attachments/assets/2d7bdbb4-372b-4003-b762-9425b3400f90" width="350" height="500" />  
➡️ 간략한 영화 정보 (상영일, 만족도, 관객수 등) 제공

---

## 🎞️ 무비 페이지 – 영화 상세 페이지

<img src="https://github.com/user-attachments/assets/da7a6721-220a-4c15-b5d0-97df1a1f57e8" width="350" height="500" />  
➡️ 좋아요 / SNS 공유 가능

<img src="https://github.com/user-attachments/assets/215d2a7d-025f-4c15-96bd-064b324456d1" width="350" height="500" />  
➡️ 영화 정보와 상호작용 기능 제공

<img src="https://github.com/user-attachments/assets/037cb67d-da11-45c0-905b-70b841d0132a" width="350" height="500" />  
➡️ 키워드 검색 컴포넌트 포함, 영화 상세 페이지로 이동 가능

<img src="https://github.com/user-attachments/assets/906b0ff3-66ff-47b5-8551-143a87d8ddbd" width="350" height="500" />  
➡️ 주요 출연진 확인 및 키워드 검색 기능 포함

<img src="https://github.com/user-attachments/assets/f4aa32f5-6365-4149-b17b-956db64b01fd" width="350" height="500" />  
➡️ 추천 영화 컴포넌트 통해 연관 영화 탐색 가능

---

## 👥 무비 페이지 – 출연진 정보

<img src="https://github.com/user-attachments/assets/dcf3a515-1a4f-4307-adca-930171f9fc63" width="350" height="500" />  
➡️ '전체 보기' 클릭 시 전체 출연진 확인

<img src="https://github.com/user-attachments/assets/6ce16184-d51b-499e-b495-64898a8546b9" width="350" height="500" />  
➡️ 출연진 상세 정보 조회 가능

---

## 🔍 무비 페이지 – 검색 결과

<img src="https://github.com/user-attachments/assets/f45be230-ae98-43fe-84fa-198f2bbc8edc" width="350" height="500" />  
➡️ 다양한 검색창에서 입력 시 결과 페이지로 이동

<img src="https://github.com/user-attachments/assets/cb1307a8-cbbd-41b8-856e-32dbb6d14241" width="350" height="500" />  
➡️ 검색 결과 리스트 출력

---

## 🔐 로그인 / 회원가입 페이지

<img src="https://github.com/user-attachments/assets/7605c73a-fdda-483e-bccf-37b4c84e4eed" width="350" height="500" />  
➡️ Google, GitHub, Facebook, Kakao, Naver 등 OAuth2 로그인 지원

<img src="https://github.com/user-attachments/assets/c1202e37-711e-4381-b3e1-7c39214a52c9" width="350" height="500" />  
➡️ ID/비밀번호 기반 회원가입도 가능

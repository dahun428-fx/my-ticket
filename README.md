# 영화 검색 웹 어플리케이션

> 배포 사이트 : [https://my-ticket-theta.vercel.app/](https://my-ticket-theta.vercel.app/)
> 

## 1. 프로젝트 소개

### 1) 프로젝트개요

- Movie Open API ( TMDB ) ( [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started) ) : 영화 API 데이터를 수신하여 영화 검색 웹페이지를 만들어보는 토이 프로젝트
- 영화 검색 / SNS 공유 / JWT - Next Auth 로그인 / OAuth2 로그인 / 좋아요 / 해시태그 / 추천 기능 등을 구현

### 2) 기획배경

- 웹사이트의 강력한 검색 기능들을 직접 구현해보기 위해 기획하게 되었습니다. 사용자 타이핑 검색 뿐만 아니라, 키워드 검색, 추천 검색 기능들을 더하여 파워풀한 영화 검색 웹 사이트를 만들 수 있었습니다.

### 3) 프로젝트 목표

- Next.js 가 제공하는 다양한 기능 및 Next Auth / JWT / OAuth2 등 다양한 로그인 및 회원가입을 구현하여 웹 사이트 접근성과 편의성을 높이기 위해 노력하였습니다.
- 백엔드에서 JPA / Spring boot / Spring Security 를 사용하여 다양한 기술을 접목시키고 시도해보는 것에 중점을 두었습니다.
- React.js 의 다양한 Hook을 시도하고 공부하였습니다.
- 반응형 웹사이트를 목적으로 만들어, 스마트폰 등 다양한 기기에서 접근 및 사용 가능합니다.

## 2. 개발 환경 및 기술

### 1) 프레임워크 및 라이브러리

- Next.js / React.js / Spring Framework / Spring Security / Spring boot / JPA / MySQL

### 2) 언어 및 도구

- RESTFul API / Movie Open API

## 3. 기능소개

### 화면별 기능 소개

- 메인페이지 - 영화 검색

---

![image](https://github.com/user-attachments/assets/ea66c330-9765-4207-89d9-81f2392f1494)


⇒ 홈페이지에서 영화 제목을 검색할 수 있습니다.

![image 1](https://github.com/user-attachments/assets/d3507742-b32e-4404-8f84-700a503dfb77)


⇒ 사이드 바 아이콘을 클릭하여 다른 라우터에 접근 가능합니다.

- 무비페이지 - 영화 리스트

---

<img src="https://github.com/user-attachments/assets/7e76abc9-dcbb-4d63-8d00-1e1a0dc0909a" width="350" height="500" />

⇒ PopularMovie / Now Playing Movie / Upcoming Movie 탭을 클릭하여 최신 영화를 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/31e78a61-e9bb-4bc3-91b2-e2900a13d466" width="350" height="500" />

⇒ 검색 기능 / 정렬 기능을 사용할 수 있습니다. 또한 사이드에 있는 화살표 아이콘을 클릭하여 페이지네이션 기능을 사용할 수 있습니다.

<img src="https://github.com/user-attachments/assets/2d7bdbb4-372b-4003-b762-9425b3400f90" width="350" height="500" />

⇒ 영화에 대한 간략한 정보를 확인할 수 있습니다. 상영날짜 / 만족도 / 관객수 / 영화카테고리 등

- 무비페이지 - 영화 상세 페이지


<img src="https://github.com/user-attachments/assets/da7a6721-220a-4c15-b5d0-97df1a1f57e8" width="350" height="500" />

⇒ 좋아요 기능 / SNS 공유 기능을 이용할 수 있습니다.

---

<img src="https://github.com/user-attachments/assets/215d2a7d-025f-4c15-96bd-064b324456d1" width="350" height="500" />

⇒ 상세페이지 내에서 영화에 대한 정보 및 좋아요 / SNS 공유 기능을 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/037cb67d-da11-45c0-905b-70b841d0132a" width="350" height="500" />

⇒ 키워드 검색 결과 컴포넌트가 상세페이지 내에서 출력되어 리스트 형태로 사용자가 확인 할 수 있으며, 클릭시에 해당 영화 상세 페이지로 이동합니다.

<img src="https://github.com/user-attachments/assets/906b0ff3-66ff-47b5-8551-143a87d8ddbd" width="350" height="500" />

⇒ 상세페이지 내에서 주요 출연진을 확인 할 수 있으며, 키워드의 버튼 클릭시 키워드 검색 기능을 확인 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/f4aa32f5-6365-4149-b17b-956db64b01fd" width="350" height="500" />

⇒ 상세페이지 내에 추천 영화 컴포넌트를 추가하여, 연관 영화페이지 확인할 수 있으며 클릭시에 해당 영화 상세페이지로 이동합니다.

- 무비페이지 - 주요 출연진 / 상세페이지

---

<img src="https://github.com/user-attachments/assets/dcf3a515-1a4f-4307-adca-930171f9fc63" width="350" height="500" />

⇒ 상세페이지 > 주요출연진 > 전체보기 클릭시 해당 영화의 전체 출연진을 확인 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/6ce16184-d51b-499e-b495-64898a8546b9" width="350" height="500" />

⇒ 주요 출연진 링크를 클릭하여 출연진의 상세 내역을 확인 할 수 있습니다. 

- 무비페이지 - 검색결과페이지

---


<img src="https://github.com/user-attachments/assets/f45be230-ae98-43fe-84fa-198f2bbc8edc" width="350" height="500" />

⇒ 메인페이지 / 사이드바 검색창 / 무비페이지 검색창 등에서 검색 키워드 입력 후 검색을 클릭하여 검색결과페이지로 이동합니다. 해당 페이지에서는 사용자가 입력한 영화 검색 결과 리스트를 확인 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/cb1307a8-cbbd-41b8-856e-32dbb6d14241" width="350" height="500" />

- 로그인 / 회원가입 페이지

---

<img src="https://github.com/user-attachments/assets/7605c73a-fdda-483e-bccf-37b4c84e4eed" width="350" height="500" />

⇒ 사용자는 OAuth2 로 제공하는 구글, 깃허브, 페이스북, 카카오, 네이버를 통하여 회원가입 및 로그인 할 수 있습니다.

<img src="https://github.com/user-attachments/assets/c1202e37-711e-4381-b3e1-7c39214a52c9" width="350" height="500" />

⇒ 사용자는 회원가입페이지에서 아이디 / 비밀번호 / 이름을 입력하여 회원가입을 할 수 있습니다.

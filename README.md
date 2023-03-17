<img width="1089" alt="title_carpe" src="https://user-images.githubusercontent.com/67156494/225974898-e547171f-53ca-47f6-9235-587b62fa00db.png">

## [👋 프로젝트 소개 README](https://github.com/cd-carpe-diem/.github/blob/main/profile/README.md)
## [🤗 팀 소개 WIKI](https://kimpp.notion.site/CARPE-DIEM-WIKI-1647f0a74db346b3b3edddebe390cd48)

## 1️⃣ 프로젝트 구조

```bash
src
├── __test__ # 테스트 코드
├── assets # 프로젝트에서 사용할 이미지, 비디오, json파일 등 미디어 파일들을 모아두어 저장하는 곳
├── common # 상수, 공통 함수
├── components # 공통 컴포넌트 관리 (Header, Footer, Nav 등)
├── services # 자바스크립트 모듈
├── store # 리덕스
├── styles # 공통 css (e.g. App.css)
└── views # 페이지 단위의 컴포넌트 폴더로 구성
```

<br>

## 2️⃣ 프로젝트 실행 방법

```bash
>> npm i --force
```
- 구 버전 React를 사용하는 라이브러리의 의존성 문제를 해결을 위해 `--force` 옵션을 포함해서 패키지를 설치 필요

<br>

```bash
>> npm run start
```

<br>

> `📄 .env`
```bash
# Deployment environment
REACT_APP_BASIC_NODE_ENV=dev

# Server Info
REACT_APP_BASIC_SERVER_PROTOCOL=http
REACT_APP_BASIC_CLIENT_HOST=localhost:3000
REACT_APP_BASIC_SERVER_HOST=localhost
REACT_APP_BASIC_SERVER_PORT=4000

# AWS
REACT_APP_BASIC_AWS_ACCESS_KEY_ID=${secret}
REACT_APP_BASIC_AWS_SECRET_ACCESS_KEY=${secret}
REACT_APP_BASIC_AWS_CDN_NAME=${secret}
REACT_APP_BASIC_AWS_BUCKET_NAME=${secret}
REACT_APP_BASIC_AWS_REGION=${secret}

# Kakao
REACT_APP_BASIC_KAKAO=${secret}
```

- 보안 상의 이유로 AWS key 부분은 `${secret}`로 표시

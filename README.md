# 냥과함개 - 반려동물 케어 서비스(웹 기술 프로젝트)
### 온택트 시대 + 펫팸족 증가 + 실제 경험을 바탕으로 온라인으로 쉽게 반려동물을 케어하며 전문가와 상담을 받을수 있으면 좋을거 같다는 아이디어로 출발한 프로젝트  
> ![toplogo](https://user-images.githubusercontent.com/25664543/176662363-8a2d7f68-15b8-445e-b9c0-57bfc188261f.png)

## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :white_check_mark: React.js |
| :white_check_mark: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :black_square_button: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :black_square_button: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python | :white_check_mark: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |

<!-- 필수 항목 -->

## 개발 기간

- 2022.01.10 ~ 2022.02.17 

## 팀 소개
* 이소현: 팀장, 백엔드 개발(실시간 수의사 화상채팅 API), AWS DB구축, Front&Back 배포, OpenVidu서버 구축
* 김진용: 프론트엔드(메인페이지, 실시간 상담 신청, 채팅방 관리) 개발, 주 디자인 담당
* 박찬의: 프론트엔드(반려동물 정보 관리, 이달의 지출, 캘린더) 개발
* 한상우: 프론트엔드(회원가입, 로그인) 개발, Openvidu 구현, UCC 제작
* 안재현: 백엔드(회원가입, 로그인, 캘린더, 이달의지출) 개발 / 반려티콘 API 구현
* 홍종현: 백엔드(펫 관리, 채팅방 관리) 개발, 카툰화API, 카카오API 구현, DB 설계 및 구축 [GitHub](https://github.com/jonghyunH)

## 프로젝트 소개

* 프로젝트명: 반려동물 케어 서비스
* 서비스 특징: 반려동물 케어 및 상담 프로젝트
* 주요 기능
  - 회원 관리
  - 화상 미팅룸
  - 그룹 채팅
  - 반려동물 케어 서비스
  - 반려동물 꾸미기 서비스
* 주요 기술
  - WebRTC
  - WebSocket
  - JWT Authentication
  - REST API
  - Ainize API
  - Kakao API
* 참조 리소스
  * React-Bootstrap : 디자인 전반 적용
* 배포 환경
  - URL: i6b109.p.ssafy.io
  - 테스트 계정: (ID) ssafy@ssafy.com / (Password) b109


## 프로젝트 상세

# ERD  
![ERD](https://user-images.githubusercontent.com/25664543/176662465-b5188e85-8b7d-4f9d-bc18-bdf8f3ee64bc.png)

# System Architecture
![architecture](https://user-images.githubusercontent.com/25664543/176662570-689c5d48-0b72-4d82-b0c3-f49c0033c8ae.PNG)
![architecture2](https://user-images.githubusercontent.com/25664543/176662609-94df6e1f-1168-427b-9cb4-fb30a27cadf4.PNG)
### :hammer_and_wrench: 개발 환경

- **Front**:
  - HTTP Client: axios
  - Language: React, Node
- **Back**
  - WAS: Nginx 1.18
  - Web Application Framework: Spring Boot 2.4.5
  - Database: MySQL
  - Language: JAVA
- **AWS**
  - Ec2

## 결과물 Preview

- 로그인 페이지 

![로그인페이지](https://user-images.githubusercontent.com/25664543/176662659-0b562b1a-df85-4648-8264-25dd0b2bfa48.png)

- 메인 페이지

![메인페이지](https://user-images.githubusercontent.com/25664543/176662705-b617cc24-8edc-4695-a43b-554dc8c697ff.png)

- 반려동물 추가

![반려동물추가1](https://user-images.githubusercontent.com/25664543/176662753-e1085b96-b2a7-43ea-b471-df07fb36e21a.png)

- 실시간 상담

![실시간상담](https://user-images.githubusercontent.com/25664543/176662788-2d7f4294-dd01-48d2-8bad-d29230262509.png)

- 반려동물 추가

![반려동물추가1 (1)](https://user-images.githubusercontent.com/25664543/176662910-a47f2511-8d0d-4115-a2b6-a24c0b7acae2.png)

- 캘린더

![캘린더](https://user-images.githubusercontent.com/25664543/176663029-d6ccde52-9898-42d3-b82c-fe3abec7e454.png)

- 프로필 페이지

![프로필](https://user-images.githubusercontent.com/25664543/176663063-2f5356b8-b48b-4ad1-a193-f42e54737469.png)

- 이달의 지출

![이달의지출](https://user-images.githubusercontent.com/25664543/176663108-6fab1f7c-7232-407e-b46e-6fbb263ae902.png)

- 유저와의 소통
  
![유저와의소통](https://user-images.githubusercontent.com/25664543/176663123-22947e5f-a518-4d64-84cb-065340d3d13b.png)
![유저와의소통2](https://user-images.githubusercontent.com/25664543/176663131-9d3a5fb3-26c6-4175-a2d5-025fef569417.png)

- 카툰화

![카툰화](https://user-images.githubusercontent.com/25664543/176663210-c63583f5-53c5-48c3-893e-b361b2537b92.png)

- 반려티콘

![반려티콘](https://user-images.githubusercontent.com/25664543/176663226-89788ce5-4b0b-4862-a0aa-5e54c5b56af5.png)

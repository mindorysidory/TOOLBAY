# TOOLBAY - AI Tools Collective Intelligence Platform

A community-driven platform for evaluating and discovering AI tools through collective intelligence and voluntary participation.

## 🚀 Features

- **Anonymous Participation**: IP-based user identification without registration
- **Real-time Updates**: Live voting and opinion updates
- **Collective Intelligence**: Community-driven tool evaluation
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Full-Stack TypeScript**: End-to-end type safety
- **Robust Backend**: Express.js with Supabase PostgreSQL

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js + Express.js + TypeScript
- Supabase PostgreSQL database
- Socket.io for real-time features
- Winston for logging

## 프로젝트 구조

```
TOOLBAY/
├── frontend/                 # React Frontend (개발자 A)
│   ├── src/
│   │   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── hooks/           # 커스텀 훅
│   │   ├── services/        # API 호출 서비스
│   │   ├── store/           # 상태 관리
│   │   ├── types/           # TypeScript 타입 정의
│   │   └── utils/           # 유틸리티 함수
│   ├── public/
│   └── package.json
│
├── backend/                  # Node.js Backend (개발자 B)
│   ├── src/
│   │   ├── controllers/     # 컨트롤러
│   │   ├── models/          # 데이터베이스 모델
│   │   ├── routes/          # API 라우트
│   │   ├── middleware/      # 미들웨어
│   │   ├── services/        # 비즈니스 로직
│   │   ├── utils/           # 유틸리티 함수
│   │   ├── config/          # 설정 파일
│   │   └── socket/          # WebSocket 관련
│   └── package.json
│
├── database/                 # 데이터베이스 관련 (개발자 C)
│   ├── migrations/          # 데이터베이스 마이그레이션
│   ├── seeds/               # 초기 데이터
│   ├── schemas/             # 스키마 정의
│   └── scripts/             # DB 관리 스크립트
│
├── shared/                   # 공통 모듈
│   ├── types/               # 공통 TypeScript 타입
│   ├── constants/           # 상수 정의
│   └── utils/               # 공통 유틸리티
│
├── docs/                     # 문서
│   ├── api/                 # API 문서
│   ├── design/              # 디자인 시스템
│   └── development/         # 개발 가이드
│
└── docker-compose.yml        # 개발 환경 설정
```

## 팀 역할 분담

### 개발자 A - Frontend 담당
- React 컴포넌트 개발
- UI/UX 구현
- 상태 관리
- API 연동

### 개발자 B - Backend 담당
- REST API 개발
- WebSocket 서버
- 비즈니스 로직
- 인증/보안

### 개발자 C - Database 담당
- 스키마 설계
- 마이그레이션 관리
- 데이터 모델링
- 성능 최적화

## 개발 규칙

1. **브랜치 전략**: feature/frontend-*, feature/backend-*, feature/database-*
2. **코드 리뷰**: 모든 PR은 최소 1명의 리뷰 필요
3. **API 문서**: OpenAPI 3.0 사용
4. **타입 공유**: shared/types에 공통 타입 정의
5. **환경 변수**: .env.example 파일 제공
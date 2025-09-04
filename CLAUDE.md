# TOOLBAY - Claude Code 프로젝트 가이드

## 🎯 프로젝트 개요
AI 도구 집단지성 평가 플랫폼 - 실시간 협업 편집과 커뮤니티 검증 시스템

## 📋 개발 규칙 (Development Rules)

### 🔧 기술 스택 준수
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Redux Toolkit
- **Backend**: Node.js + Express + TypeScript + Supabase (PostgreSQL) + Redis + Socket.io
- **Database**: Supabase (PostgreSQL + Real-time + Auth)
- **Deployment**: Vercel (Frontend + Backend)
- **Container**: Docker + Docker Compose (개발 환경용)

### 🗂️ 폴더 구조 규칙
```
TOOLBAY/
├── frontend/     # 개발자 A 담당 - React 앱
├── backend/      # 개발자 B 담당 - API 서버
├── database/     # 개발자 C 담당 - DB 관리
└── shared/       # 공통 타입/상수 (모든 개발자 공유)
```

### 🚀 개발 실행 명령어
```bash
# Frontend 개발
cd frontend && npm run dev

# Backend 개발  
cd backend && npm run dev

# 타입체크 실행
npm run typecheck

# 린트 실행
npm run lint

# 배포 (Vercel)
vercel --prod
```

### 📊 배포 계획 (Deployment Plan)

#### Phase 1: 백엔드 개발 (진행 중)
- [x] 기본 Express 서버 구조 설정
- [ ] Supabase 연동 및 환경 설정
- [ ] API 엔드포인트 구현
- [ ] Socket.io 실시간 기능 구현

#### Phase 2: 프론트엔드 연동
- [ ] Mock 데이터 → 실제 API 연동
- [ ] Redux에서 Supabase API 호출
- [ ] 실시간 기능 프론트엔드 연결

#### Phase 3: SEO & 배포
- [ ] Vercel 배포 환경 구성
- [ ] SEO 메타태그 최적화
- [ ] Google Analytics 설정
- [ ] 도메인 연결 및 검색엔진 등록

### 📝 코딩 컨벤션

#### 1. TypeScript 필수사항
- 모든 파일은 TypeScript로 작성
- `any` 타입 사용 금지
- 공통 타입은 `shared/types/index.ts`에 정의
- 인터페이스명은 PascalCase (예: `User`, `Tool`, `Rating`)

#### 2. 네이밍 컨벤션
- **파일명**: kebab-case (예: `user-service.ts`, `tool-list.tsx`)
- **컴포넌트**: PascalCase (예: `ToolList`, `UserProfile`)
- **함수/변수**: camelCase (예: `fetchTools`, `userId`)
- **상수**: UPPER_SNAKE_CASE (예: `API_ENDPOINTS`, `RATING_WEIGHTS`)
- **CSS 클래스**: Tailwind 우선, 커스텀 클래스는 kebab-case

#### 3. 컴포넌트 작성 규칙
```tsx
// ✅ 올바른 컴포넌트 구조
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  // 상태, 훅
  // 이벤트 핸들러
  // 렌더링
  return (
    <div className="p-4 bg-white rounded-lg">
      {/* JSX 내용 */}
    </div>
  );
};
```

#### 4. API 엔드포인트 규칙
```typescript
// ✅ RESTful API 패턴 준수
GET    /api/tools           # 도구 목록 조회
GET    /api/tools/:id       # 특정 도구 조회
POST   /api/tools           # 도구 생성
PUT    /api/tools/:id       # 도구 전체 수정
PATCH  /api/tools/:id       # 도구 부분 수정
DELETE /api/tools/:id       # 도구 삭제
```

### 🔀 Git 브랜치 전략
```
main                    # 배포 브랜치
├── develop            # 개발 통합 브랜치
├── feature/frontend-* # Frontend 기능 브랜치
├── feature/backend-*  # Backend 기능 브랜치
└── feature/database-* # Database 기능 브랜치
```

### 💬 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드 설정, 패키지 등 기타 작업

예시: feat(frontend): 도구 검색 필터 컴포넌트 추가
```

### 🔒 보안 규칙
- 환경변수 사용 필수: `.env` 파일 (커밋 금지)
- API 키, 비밀번호 등 하드코딩 절대 금지
- JWT 토큰은 HttpOnly 쿠키 사용
- 사용자 입력값 검증 및 sanitization 필수

### 🎨 UI/UX 가이드라인
- **디자인 시스템**: Tailwind CSS + Airbnb 스타일
- **컬러 팔레트**: 
  - Primary: `#FF5A5F` (Airbnb Red)
  - Secondary: `#00A699` (Teal)
  - Neutral: Gray 50~900
- **반응형**: Mobile First 접근법
- **접근성**: ARIA 속성 사용, 키보드 네비게이션 지원

### 🧪 테스트 규칙
```bash
# 테스트 실행 (추후 설정 예정)
npm test                # 전체 테스트
npm run test:watch      # 파일 변경시 자동 테스트
npm run test:coverage   # 커버리지 리포트
```

### 📊 데이터베이스 규칙
- **테이블명**: snake_case (예: `ai_tools`, `user_ratings`)
- **컬럼명**: snake_case (예: `created_at`, `trust_score`)
- **관계설정**: Foreign Key 반드시 설정
- **인덱싱**: 검색용 컬럼에 적절한 인덱스 설정
- **마이그레이션**: 순차적 번호 사용 (001_create_users.sql)

### 🔄 실시간 기능 규칙
- **WebSocket 이벤트**: `WEBSOCKET_EVENTS` 상수 사용
- **룸 관리**: 도구별 전용 룸 생성
- **데이터 동기화**: Redis pub/sub 패턴 활용
- **충돌 해결**: Last Write Wins 정책

### 📦 의존성 관리
- **패키지 추가시**: 팀 논의 후 결정
- **버전 고정**: package-lock.json 커밋 필수
- **보안 취약점**: 정기적으로 `npm audit` 실행
- **불필요한 의존성**: 주기적으로 정리

### 🐛 에러 핸들링
```typescript
// ✅ 표준 에러 응답 형식
interface ApiError {
  success: false;
  error: string;
  code: number;
  details?: any;
}

// ✅ 성공 응답 형식
interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}
```

### 📝 코드 리뷰 체크리스트
- [ ] TypeScript 타입 정의가 명확한가?
- [ ] 네이밍 컨벤션을 준수했는가?
- [ ] 보안 이슈는 없는가?
- [ ] 성능상 문제는 없는가?
- [ ] 테스트 코드가 작성되었는가?
- [ ] 문서화가 필요한 부분은 없는가?

### 🚨 절대 하면 안 되는 것들
- ❌ `console.log` 프로덕션 코드에 남기기
- ❌ 하드코딩된 API URL, 키값
- ❌ 타입 정의 없이 `any` 사용
- ❌ 개인 설정 파일 (`.vscode`, `.idea`) 커밋
- ❌ `node_modules`, `dist` 폴더 커밋
- ❌ 민감한 정보 (`passwords`, `tokens`) 커밋
- ❌ 기능 구현 전 다른 개발자와 상의 없이 공통 파일 수정

### 📞 소통 규칙
- **Slack/Discord**: 일상적인 소통
- **GitHub Issues**: 버그 리포트, 기능 요청
- **GitHub PR**: 코드 리뷰 및 토론
- **주간 스탠드업**: 진행상황 공유

### 🔧 개발도구 추천
- **IDE**: VS Code + TypeScript 확장
- **Git GUI**: GitHub Desktop, SourceTree
- **API 테스팅**: Postman, Thunder Client
- **DB 관리**: pgAdmin, DBeaver

### 🔍 Claude Code 수정 요청 시 규칙

#### 코드 수정 전 필수 분석 과정
Claude가 코드를 수정할 때는 다음 단계를 **반드시** 수행해야 합니다:

1. **전체 프로젝트 구조 파악**
   ```bash
   # 프로젝트 구조 먼저 확인
   ls -la
   # 관련 폴더 구조 탐색
   find . -name "*.tsx" -o -name "*.ts" | head -20
   ```

2. **연관 파일들 사전 분석**
   - 수정 대상 컴포넌트의 부모/자식 관계 파악
   - import/export 관계 추적
   - 타입 정의 확인
   - 상태 관리 연결점 분석

3. **맥락 파악을 위한 체크리스트**
   - [ ] 해당 페이지/컴포넌트의 역할이 무엇인가?
   - [ ] 다른 컴포넌트와 어떤 데이터를 주고받는가?
   - [ ] 전역 상태(Redux)와 연결되어 있는가?
   - [ ] API 호출이 있다면 어떤 엔드포인트를 사용하는가?
   - [ ] 라우팅 구조에서 어떤 위치에 있는가?

#### 수정 요청시 Claude 가이드
**❌ 잘못된 접근:**
```
- 이미지만 보고 해당 컴포넌트만 수정
- 타입 정의 확인 없이 Props 추가
- 전체 구조 고려 없이 기능 추가
```

**✅ 올바른 접근:**
```
1. Read: 관련 컴포넌트들 모두 읽기
2. Grep: 연관 함수/타입 검색으로 전체 맥락 파악  
3. LS: 폴더 구조 확인으로 아키텍처 이해
4. 분석: 데이터 플로우와 의존성 분석
5. 수정: 전체 구조를 고려한 안전한 수정
```

#### 구체적인 분석 프로세스
```bash
# 1. 프로젝트 전체 구조 파악
ls -la
find . -name "*.tsx" -type f | grep -E "(component|page)" | head -10

# 2. 수정 대상 파일과 연관 파일들 읽기
Read ./src/components/TargetComponent.tsx
Read ./src/types/index.ts
Read ./src/store/slices/relatedSlice.ts

# 3. 관련 함수/타입 검색
Grep "TargetComponentProps" --glob="**/*.{ts,tsx}"
Grep "importedFunction" --glob="**/*.{ts,tsx}"

# 4. 라우팅 및 페이지 구조 확인
Read ./src/App.tsx
Grep "TargetComponent" --glob="**/*.{ts,tsx}"
```

#### 에러 방지를 위한 검증 단계
수정 후 다음을 반드시 확인:
- [ ] TypeScript 에러가 없는지
- [ ] Import/Export가 올바른지  
- [ ] 상위 컴포넌트에 영향이 없는지
- [ ] 전역 상태와 올바르게 연결되었는지
- [ ] 네이밍 컨벤션을 준수했는지

#### 복잡한 수정 요청시 순서
1. **이해하기**: "이 요청이 전체 앱에 미치는 영향 분석"
2. **계획하기**: "어떤 파일들을 수정해야 하는지 리스트업"  
3. **검증하기**: "기존 기능에 영향이 없는지 체크"
4. **구현하기**: "단계별로 안전하게 수정"
5. **테스트하기**: "수정된 부분 동작 확인"

---

## 📞 문제 해결
프로젝트 관련 문제가 발생하면:
1. 먼저 이 문서 확인
2. GitHub Issues에서 유사 문제 검색  
3. 팀 채널에 질문
4. 해결방법을 이 문서에 업데이트

**최종 업데이트**: 2025-08-28
**문서 관리자**: 팀 전체
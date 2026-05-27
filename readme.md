# Handam (한담) - AI 기반 일기 및 기록 서비스

AI 기술(OCR, LLM)을 활용하여 사용자의 아날로그 감성(손글씨 일기)을 디지털로 전환하고, 개인 맞춤형 운세 및 글감을 제공하는 **모바일 퍼스트 웹 앱(PWA)**입니다.

## 🚀 주요 기능 및 구현 방법론

### 1. OCR 기반 일기 요약 및 저장 시스템
*   **구현 파이프라인**:
    1.  **이미지 입력**: 모바일 환경 최적화 업로드 (Camera API 활용).
    2.  **OCR (Naver Clova)**: 텍스트 추출.
    3.  **LLM 정규화 및 요약 (Gemini)**: 오타 교정 및 사용자 설정(페르소나)에 따른 요약.
*   **데이터 저장 (Local-First)**:
    *   **추천 DB**: **SQLite (Wasm/Origin Private File System)** 또는 **IndexedDB (Dexie.js/PouchDB)**.
    *   **이유**: 일기 데이터의 무결성과 복잡한 쿼리(검색, 필터링)를 위해 관계형 구조를 지원하는 SQLite Wasm 방식을 추천합니다. 로컬 저장만으로도 앱과 같은 빠른 성능을 제공합니다.

### 2. LLM 기반 개인 맞춤형 글감 추천
*   **방법론**: 사용자의 **누적된 일기 요약 데이터**를 컨텍스트로 LLM에 전달.
*   **프로세스**: 
    1. 로컬 DB에서 최근 요약 데이터 추출.
    2. LLM(Gemini)이 사용자의 현재 관심사, 감정 상태를 분석.
    3. 분석 결과에 기반한 "오늘의 질문" 또는 "글감" 생성 및 추천.

### 3. 인증 및 보안 시스템
*   **자체 인증**: JWT(JSON Web Token) 기반의 회원가입/로그인 구현.
*   **세션 관리**: `httpOnly`, `Secure` 쿠키를 이용한 Refresh Token 관리로 자동 로그인 및 보안 강화.
*   **확장성**: 향후 OAuth 2.0(카카오, 구글) 통합이 용이하도록 Passport.js 또는 Auth.js 구조 설계.

---

## 🎨 UI/UX 전략 (Toss-style Minimalism)

*   **배치**: 토스(Toss)와 같은 **카드 기반 레이아웃**과 **여백의 미**를 강조.
*   **인터랙션**: 모바일 사용성을 고려한 바텀 시트(Bottom Sheet), 스와이프 액션 활용.
*   **색상**: 화이트/라이트 그레이 배경에 핵심 액션 포인트만 강조하는 깔끔한 톤.

---

## 🛠 기술 스택 (확정 및 제안)

*   **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion (애니메이션)
*   **Backend**: Next.js API Routes 또는 Node.js (Express)
*   **Database**: 
    *   **Local**: SQLite Wasm (추천) 또는 IndexedDB
    *   **Auth**: PostgreSQL (사용자 계정 및 최소 정보 저장용 - 필요 시)
*   **AI/OCR**: Naver Clova OCR, Google Gemini API
*   **Deployment**: Vercel (PWA 지원 설정 포함)

---

## 🔐 보안 및 성능 최적화 계획

1.  **쿠키 기반 보안**: XSS 공격 방지를 위해 액세스 토큰은 메모리에, 리프레시 토큰은 `httpOnly` 쿠키에 저장.
2.  **PWA 구현**: '홈 화면에 추가' 기능 및 오프라인 접근성 확보.
3.  **OCR 최적화**: 이미지 업로드 전 클라이언트 사이드에서 리사이징을 수행하여 데이터 비용 및 속도 개선.

---

## ⚙️ 실행 전 환경 변수

루트에 `.env` 파일을 만들고 아래 값을 채워주세요(`.env.example` 참고).

- `FIREBASE_WEB_API_KEY`: Firebase Authentication REST API 키
- `CLOVA_OCR_INVOKE_URL`, `CLOVA_OCR_SECRET`: Naver Clova OCR 호출 정보
- `GEMINI_API_KEY`: Gemini 요약 생성용 API 키
- `FORTUNE_API_URL`: 운세 API URL (`{birthday}` 치환 지원)

실행:

```bash
npm run start
```

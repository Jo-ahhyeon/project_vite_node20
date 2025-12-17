# 1️⃣ 프로젝트 소개

## 🐾 Animora — Premium Pet Hotel & Visit Brand Landing Page

> React(Vite) 기반으로 제작한 호텔·방문 서비스 웹사이트입니다. <br/>
> 데스크탑에서는 각 섹션을 풀페이지 단위로 구성하여 몰입형 브랜드 경험을 제공하고,  
> 모바일에서는 스크롤 기반 인터페이스로 전환해 접근성과 SEO 효율을 함께 고려했습니다.
> 맞춤 솔루션 신청은 CRUD 및 관리자 페이지, 카카오 알림 연동을 구현했습니다.

# 2️⃣ 배포 정보 (Live / Structure)
## 🔗 Live
- https://jah0515.mycafe24.com/animora

## 📂 Deployment Structure
- Subdirectory SPA Deployment: `/animora`
- Vite `base` / `outDir` 설정
- React Router `basename` 적용
- Apache `.htaccess`를 통한 SPA 404 fallback 처리

# 3️⃣ 기술 스택(Skills)
- React + TypeScript + Vite
- TailwindCSS + SCSS
- React Router v7
- Swiper, Axios

# 4️⃣ 핵심 기능 요약 (Core Features)
## ✨ Core Features

### 맞춤 솔루션 (CRUD)
- 사용자 신청 폼 → PHP API(JSON) → DB 저장
- 관리자 페이지에서 조회 / 수정 / 삭제
- PHP 세션 기반 관리자 인증
- 신청 시 카카오톡 ‘나에게 보내기’ 알림 연동

# 5️⃣ 문제 해결 경험 (Issues & Solutions)
## 🧩 Issues & Solutions
### 1. 서브 디렉토리 SPA 배포 시 정적 리소스 경로 문제
- base / basename / asset 경로 통합 처리
- `/animora` 기준 절대 경로 전략 적용
### 2. SPA 새로고침 시 404 오류
- Apache `.htaccess` fallback 설정으로 해결
### 3. React ↔ PHP API CORS / Preflight 이슈
- OPTIONS 요청 분리 처리
- CORS 헤더 명시적 설정

## 🧩 Component Architecture
- Route 단위 페이지(`pages`)와 UI 컴포넌트(`components`)를 분리
- Layout / Section / Common 구조로 역할 기준 컴포넌트 설계
- 재사용 가능한 UI는 `common`, `ui`로 분리하여 유지보수성 향상

## 📂 Project Structure
src/
 ├─ components/
 │   ├─ layout/        # Header / Footer / Layout
 │   ├─ sections/      # Home 섹션 단위 컴포넌트
 │   ├─ common/        # 재사용 UI 컴포넌트
 │   └─ ui/            # 버튼, 링크 등 단일 UI
 ├─ pages/             # Route 단위 페이지
 ├─ data/              # 정적 데이터 (partners, services 등)
 ├─ utils/             # 공통 유틸 함수
 └─ styles/            # 전역 스타일


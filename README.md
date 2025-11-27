# 🐾 Animora — Premium Pet Hotel & Visit Brand Landing Page

> 브랜드 경험을 시각적으로 전달하는 **프리미엄 펫 호텔&방문 서비스 랜딩 페이지**입니다.
> 데스크탑에서는 각 섹션을 풀페이지 단위로 구성하여 몰입형 브랜드 경험을 제공하고,  
> 모바일에서는 스크롤 기반 인터페이스로 전환해 접근성과 SEO 효율을 함께 고려했습니다.
> Figma 설계도와 컴포넌트 구조를 기반으로, 일관된 디자인 시스템과 반응형 레이아웃을 구현했습니다.

## 🛠 Tech Stack
- React + TypeScript + Vite
- TailwindCSS + SCSS
- React Router v7
- Swiper, Axios

## 📁 폴더 구조
<details>
<summary>📂 폴더 구조 보기</summary>
src/
├─ assets/ # 이미지, 영상, SVG 등 정적 리소스
│
├─ components/
│ ├─ layout/ # 공통 레이아웃 요소 (Header / Footer / Layout)
│ │ ├─ Hd.tsx # 상단 네비게이션 (로고, 메뉴 등)
│ │ ├─ Ft.tsx # 하단 푸터
│ │ └─ Layout.tsx # 공통 레이아웃 (Hd + Ft + Outlet)
│ │
│ ├─ sections/ # Home 페이지 주요 섹션
│ │ ├─ Hero.tsx # 메인 배너
│ │ ├─ Partnership.tsx # 파트너사 자동 롤링 + 문구 애니메이션
│ │ ├─ about/ # About 3개 카드 구성
│ │ │ ├─ About.tsx # About Section 컨테이너
│ │ │ └─ AboutCard.tsx # 개별 카드 컴포넌트
│ │ ├─ Reservation.tsx # 예약 안내
│ │ ├─ Facility.tsx # 시설 안내
│ │ ├─ Media.tsx # 영상 / 소개 섹션
│ │ ├─ Review.tsx # 후기
│ │ ├─ Service.tsx # 서비스 소개
│ │ └─ Solution.tsx # 맞춤 예약 솔루션
│ │
│ └─ ui/ # 공통 UI 컴포넌트
│ ├─ Button.tsx # 버튼 스타일
│ └─ Pagination.tsx # 페이지네이션
│
├─ pages/ # 라우트 페이지
│ ├─ Home.tsx # 메인 페이지 (Hero ~ Solution)
│ ├─ BrandStory.tsx # 브랜드 스토리 상세
│ ├─ CompanyInfo.tsx # 회사 소개
│ ├─ CSR.tsx # 사회적 책임
│ └─ Contact.tsx # 문의
│
├─ scss/ # 전역 스타일
│ └─ _variables.scss # 색상, spacing, 폰트 등 디자인 토큰
│
├─ App.tsx # 라우트 트리 정의
├─ main.tsx # BrowserRouter 진입점
└─ vite.config.ts # Vite 설정 (base / plugin / scss 설정)
</details>

## 🧭 페이지 구조
main.tsx (BrowserRouter)
   └── App.tsx (Routes)
        └── Layout/  ← Header + Footer
             ├── index → Home
             │     ├── Hero
             │     ├── Partnership
             │     ├── About
             │     │     ├── AboutCard(BrandStory)
             │     │     ├── AboutCard(CompanyInfo)
             │     │     └── AboutCard(CSR)
             │     ├── Reservation
             │     ├── Facility
             │     ├── Media
             │     ├── Review
             │     ├── Service
             │     └── Solution
             │
             ├── /brandstory   → BrandStory.tsx
             ├── /companyinfo  → CompanyInfo.tsx
             └── /csr          → CSR.tsx
// src/components/BrandStory.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Storysvg from "../assets/svg/BrandStory.svg";
import HeroVideo from "../assets/hero.mp4";
import { asset } from "@/utils/asset";

type Year = 2025 | 2024 | 2023;

interface YearItem {
  year: Year;
  title: string;
  description: string[];
  hasVideo?: boolean;
  image?: string[]; // ✅ 여러 장 가능
}

const YEAR_LIST: Year[] = [2025, 2024, 2023];
const YEAR_ITEMS: YearItem[] = [
  {
    year: 2025,
    title: "2025",
    hasVideo: true,
    description: [
      "Animora 웹 플랫폼 구축 및 브랜드 콘텐츠 확장.",
      "파트너십 기반의 협업 모델 설계 및 서비스 영역 확장.",
      "신뢰를 중심으로 한 반려동물 돌봄 브랜드로서의 방향성 강화.",
    ],
  },
  {
    year: 2024,
    title: "2024",
    description: [
      "Animora의 브랜드 아이덴티티(CI) 및 서비스 구조 설계.",
      "호텔형 돌봄 서비스와 방문 케어를 아우르는 프리미엄 서비스 모델 정립.",
      "브랜드 철학과 사용자 경험을 중심으로 한 UI/UX 기획 진행.",
    ],
    image: ["img/brandstory.jpg"], // ✅ 1장: 텍스트 1: 이미지 1 레이아웃
  },
  {
    year: 2023,
    title: "2023",
    description: [
      "반려동물 양육 인구 증가와 함께, 보호자가 안심하고 맡길 수 있는 돌봄 서비스의 필요성을 인식.",
      "프리미엄 반려동물 호텔 및 방문 돌봄 서비스 브랜드 ‘Animora’ 기획 및 컨셉 수립.",
    ],
    image: [
      "img/brandstoryimg2.jpg",
      "img/brandstoryimg3.jpg",
      "img/brandstoryimg4.jpg",
      "img/eco.jpg",
      "img/service.jpg",
      "img/brandstoryimg5.jpg",
    ],
  },
];

const BrandStory: React.FC = () => {
  const titleRef = useRef<HTMLImageElement | null>(null);
  const sectionRefs = useRef<Record<Year, HTMLDivElement | null>>({
    2025: null,
    2024: null,
    2023: null,
  });

  const [activeYear, setActiveYear] = useState<Year>(2025);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 6, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const yearByElement = new Map<Element, Year>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const year = yearByElement.get(entry.target);
          if (year) setActiveYear(year);
        });
      },
      { threshold: 0.5 }
    );

  YEAR_LIST.forEach((year) => {
      const el = sectionRefs.current[year];
      if (!el) return;
      yearByElement.set(el, year);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToYear = (year: Year) => {
  const target = sectionRefs.current[year];
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative max-w-container-xl mx-auto flex flex-col items-end px-[10px] lg:px-0">
      <h2 className="pt-3xl pb-xl w-full justify-start max-w-container-md">
        <img ref={titleRef} src={Storysvg} alt="Brand story" />
      </h2>

      <div className="w-full flex gap-10 lg:py-xl justify-between">
        <div className="hidden md:flex sticky top-[30vh] h-[180px]">
          <div className="relative h-full w-px bg-gray-200 overflow-hidden">
            <div
              className="absolute w-full bg-gray-900 transition-all duration-300"
              style={{
                height: "33%",
                top:
                  activeYear === 2025
                    ? "0%"
                    : activeYear === 2024
                    ? "33%"
                    : "66%",
              }}
            />
          </div>

          <div className="flex flex-col justify-between pl-4 py-2">
            {YEAR_LIST.map((year) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => scrollToYear(year)}
                  className={`text-lg text-left transition-all ${
                    isActive
                      ? "font-semibold text-gray-900 scale-110"
                      : "text-gray-400"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:gap-3xl max-w-container-md">
          {YEAR_ITEMS.map((item, index) => {
            const images = item.image ?? [];
            const hasImages = images.length > 0;
            const isGallery = images.length > 1;
            const mainImage = images[0];

            return (
              <article
                key={item.year}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current[item.year] = el;
                }}
                className={`scroll-mt-[140px] ${
                  index === YEAR_ITEMS.length - 1 ? "mb-[200px]" : ""
                }`}
              >
                {item.hasVideo && (
                  <div className="bg-black">
                    <video
                      className="w-full h-full object-cover opacity-70"
                      src={HeroVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                )}

                {/* ✅ 1) 이미지 없으면: 텍스트만 */}
                {!hasImages && (
                  <>
                    <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                    <ul className="mt-4 list-none space-y-3">
                      {item.description.map((text, idx) => (
                        <li
                          key={idx}
                          className="relative pl-5 text-gray-700 text-sm"
                        >
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* ✅ 2) 이미지 1장이면: 텍스트 1 : 이미지 1 */}
                {hasImages && !isGallery && (
                  <div className="mt-8 flex flex-col lg:flex-row gap-10 items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <ul className="mt-4 list-none space-y-3">
                        {item.description.map((text, idx) => (
                          <li
                            key={idx}
                            className="relative pl-5 text-gray-700 text-sm"
                          >
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1">
                      <img
                        src={asset(mainImage)}
                        alt={`${item.year} story`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* ✅ 3) 이미지 여러장이면(예: 2023): 갤러리 그리드 */}
                {hasImages && isGallery && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <ul className="mt-4 list-none space-y-3">
                      {item.description.map((text, idx) => (
                        <li
                          key={idx}
                          className="relative pl-5 text-gray-700 text-sm"
                        >
                          <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gray-400" />
                          {text}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((src, idx) => (
                        <div key={idx} className="overflow-hidden">
                          <img
                            src={asset(src)}
                            alt={`${item.year} gallery ${idx + 1}`}
                            className="w-full aspect-square object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
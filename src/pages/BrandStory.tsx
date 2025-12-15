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
  image?: string[]; // ✅ 이미지 옵션 필드 추가
}

// 년도 리스트 (여러 곳에서 재사용)
const YEAR_LIST: Year[] = [2025, 2024, 2023];

const YEAR_ITEMS: YearItem[] = [
  {
    year: 2025,
    title: "2025",
    hasVideo: true,
    description: [
      "친환경 생산 방식을 도입하여 배출량을 [퍼센트]% 줄이며, 지속 가능한 미래를 위한 기여 확대",
      "첫 번째 지속 가능한 제품 및 이니셔티브를 출시하며, 환경 보호와 사회적 책임을 강화",
      "전사적인 지속 가능성 목표를 수립하고, 이를 달성하기 위한 구체적인 로드맵 실행",
      "파트너사와 협력하여 친환경 공급망을 구축하고, 지속 가능한 생태계를 조성",
    ],
  },
  {
    year: 2024,
    title: "2024",
    description: [
      "신기술 탐구를 위한 R&D 투자 확대",
      "2025년까지 탄소중립 목표를 달성하기 위한 지속 가능성 강화",
      "글로벌 위기 속에서 원격 운영 및 자동화를 통한 혁신 실현",
      "신제품 출시로 산업의 새로운 기준을 세우다",
    ],
    image: [
      "img/brandstory.jpg",
    ],
  },
  {
    year: 2023,
    title: "2023",
    description: ["2023년 브랜드 여정 내용을 넣어주세요."],
  },
];

const BrandStory: React.FC = () => {
  const titleRef = useRef<HTMLImageElement | null>(null);

  // ✅ 각 년도 섹션 DOM을 저장할 객체형 ref (타입 확실히 지정)
  const sectionRefs = useRef<Record<Year, HTMLDivElement | null>>({
    2025: null,
    2024: null,
    2023: null,
  });

  const [activeYear, setActiveYear] = useState<Year>(2025);

  // 타이틀 GSAP 애니메이션
  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 6,
        ease: "power3.out",
      }
    );
  }, []);

  // 스크롤에 따라 현재 섹션의 년도 저장
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
      {
        threshold: 0.5, // 섹션의 50% 이상 보이면 해당 년도로 인식
      }
    );

    YEAR_LIST.forEach((year) => {
      const el = sectionRefs.current[year];
      if (!el) return;
      yearByElement.set(el, year);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 왼쪽 년도 클릭 시 해당 섹션으로 스크롤
  const scrollToYear = (year: Year) => {
    const target = sectionRefs.current[year];
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 120; // 살짝 위에 멈추게
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative max-w-container-xl mx-auto flex flex-col items-end px-[10px] lg:px-0">
      <h2 className="pt-3xl pb-[100px] w-full justify-start max-w-container-md">
        <img ref={titleRef} src={Storysvg} alt="Brand story" />
      </h2>

      <div className="w-full flex gap-10 lg:py-xl justify-between">
        {/* 왼쪽 고정 년도 타임라인 */}
        <div className="hidden md:flex sticky top-[30vh] h-[180px]">
          {/* 세로 라인 + 진한 부분 (들뜸 없이 한 줄 위에 덮는 구조) */}
          <div className="relative h-full w-px bg-gray-200 overflow-hidden">
            <div
              className="absolute w-full bg-gray-900 transition-all duration-300"
              style={{
                height: "33%", // 3개 년도라서 1/3
                top:
                  activeYear === 2025
                    ? "0%"
                    : activeYear === 2024
                    ? "33%"
                    : "66%",
              }}
            />
          </div>

          {/* 년도 텍스트 */}
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

        <div className="flex-1 flex flex-col gap-[200px] max-w-container-md">
          {YEAR_ITEMS.map((item, index) => {
            const mainImage = item.image?.[0]; // ✅ 첫 번째 이미지만 사용해서 1:1 레이아웃

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

                {mainImage ? (
                  <div className="mt-8 flex flex-col lg:flex-row gap-10 items-start">
                    {/* 텍스트 영역 */}
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
                ) : (
                  <>
                    <h3 className="mt-6 text-xl font-semibold">
                      {item.title}
                    </h3>
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

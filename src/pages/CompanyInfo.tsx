import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ReactComponent as HeaderLogo } from "../assets/svg/logo.svg";
import { ReactComponent as FooterLogo } from "../assets/svg/footerLogo.svg";
import { ReactComponent as FooterLogoMobile } from "../assets/svg/footerLogo_m.svg";
import Aboutsvg from "../assets/svg/companyInfo.svg";
import PartnerLogos from "@/components/common/PartnerLogos";

import { asset } from "@/utils/asset";

const SECTION_LABELS = [
  { id: "overview", label: "Overview" },
  { id: "promise", label: "Animora's own Promise" },
  { id: "ci", label: "CI" },
  { id: "colors", label: "Colors" },
  { id: "partner", label: "Partnership" },
];

const OVERVIEW = {
  title: "What's the ANIMORA",
  heading:
    "Animora는 단순한 위탁 서비스가 아닙니다.\n프리미엄급 시설과 전문 관리로 반려동물에게 최상의 경험을 선사합니다.",
  description: [
    "Animora는 [설립년도]년에 설립되어 다양한 산업 분야에서 신뢰받는 파트너로 자리 잡았습니다.",
    "우리는 혁신적인 아이디어와 기술력을 바탕으로 고객의 성공적인 성장을 지원하며, 지속 가능한 미래를 만들어가고 있습니다.",
    "우리의 핵심 가치는 [핵심 가치 3가지, 예: 신뢰, 창의성, 지속 가능성]으로, 이를 통해 더 나은 세상을 만들어가는 데 기여하고자 합니다.",
  ],
  imagePc: "img/companyimg.jpg",
  imageMo: "img/companyimg_m.jpg",
};

const PROMISES = [
  {
    title: "투명성 (확인 가능한 운영)",
    description:
      "항상 보여드리겠습니다.\n혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.",
  },
  {
    title: "안전성 (전문 인력과 시스템)",
    description:
      "전문 교육을 받은 관리 인력이 상주하며,\n반려동물의 상태를 수시로 점검합니다.",
  },
  {
    title: "맞춤 케어 (개체별 관리)",
    description:
      "아이마다 다른 성향과 컨디션을 고려한 케어 플랜으로\n최적의 환경을 제공합니다.",
  },
  {
    title: "소통 (실시간 피드백)",
    description:
      "사진, 영상, 리포트를 통해 보호자와 지속적으로 소통하며\n안심할 수 있는 서비스를 제공합니다.",
  },
  {
    title: "지속 가능성 (환경을 생각하는 운영)",
    description:
      "친환경 자재와 운영 방식을 도입하여\n지속 가능한 반려동물 문화를 만들어갑니다.",
  },
];

const CI_CONTENT = {
  heading: "우리의 비전과 가치를 담아낸 디자인, 아이덴티티를 확인하세요.",
  description: [
    "[기업명]의 CI는 우리의 철학과 가치를 시각적으로 표현한 결과물입니다. 로고는 곡선 형태를 통해 유연성과 창의성을 상징하며,",
    "컬러는 신뢰와 지속 가능성을 나타냅니다. 주 컬러인 파란색은 안정성과 신뢰를, 초록색은 자연과 지속 가능성을 상징합니다.",
    "또한, 모던한 산세리프 폰트를 사용하여 젊고 트렌디한 이미지를 강조했습니다.",
    "이 모든 요소는 [기업명]이 지향하는 비전과 정체성을 담고 있으며, 고객과의 소통과 신뢰를 위한 중요한 역할을 합니다.",
  ],
};

const CORPORATE_COLORS = [
  { label: "Main color", hex: "#3C4A3E" },
  { label: "Sub color", hex: "#E9E5DA" },
  { label: "Accent color", hex: "#F5F1EB" },
];

const Partner = {
  heading: "함께 성장하는 신뢰의 파트너",
  description: [
    "Animora는 [설립년도]년에 설립되어 다양한 산업 분야에서 신뢰받는 파트너로 자리 잡았습니다.",
  ],
};

export default function CompanyInfo() {
  const titleRef = useRef<HTMLImageElement | null>(null);
  const [activeLabel, setActiveLabel] = useState("Overview");
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const activeLabelRef = useRef(activeLabel);

  // state → ref 동기화
  useEffect(() => {
    activeLabelRef.current = activeLabel;
  }, [activeLabel]);

  // 👉 스크롤 기준으로 섹션 감지
  useEffect(() => {
     if (window.innerWidth < 1080) return;
    const sections = SECTION_LABELS.map((s) =>
      document.getElementById(s.id)
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const handleScroll = () => {
      const viewportY = window.innerHeight * 0.45; // 중앙보다 살짝 위쪽 지점

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        const isInRange = rect.top <= viewportY && rect.bottom >= viewportY;

        if (isInRange) {
          const found = SECTION_LABELS.find((s) => s.id === sec.id);
          if (found && found.label !== activeLabelRef.current) {
            setActiveLabel(found.label);
          }
          break;
        }
      }
    };

    // 처음 로드 시에도 한 번 계산
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 라벨 교체 애니메이션 (조금 느리게)
  useEffect(() => {
    if (window.innerWidth < 1080) return;
    if (!labelRef.current) return;
    gsap.fromTo(
      labelRef.current,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

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
  }, [activeLabel]);

  return (
    <section className="relavive max-w-container-xl mx-auto flex flex-col items-end">
      <h2 className="pt-3xl pb-[100px] w-full justify-start max-w-container-md px-[10px] lg:px-0">
        <img ref={titleRef} src={Aboutsvg} alt="What's the ANIMORA" />
      </h2>
      <div className="w-full flex justify-between lg:py-xl">
        <aside className="hidden lg:block w-40">
          <div className="sticky top-80">
            <p
              ref={labelRef}
              className="text-lg font-semibold text-gray-800"
            >
              {activeLabel}
            </p>
          </div>
        </aside>

        
        <div className="flex-1 flex flex-col items-start max-w-container-md">
          
          {/* 🟢 Overview 섹션 */}
          <section
            id="overview"
            className="w-full overview flex flex-col lg:gap-[60px] mb-xl px-[10px] lg:px-0 gap-md"
          >
            <p className="text-xl font-semibold mb-4 lg:hidden">
              Overview
            </p>
            <h2 className="text-xl font-bold whitespace-pre-line">
              {OVERVIEW.heading}
            </h2>
            <p className="text-sm leading-relaxed pb-8 lg:pb-0">
              {OVERVIEW.description.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <div className="bg-black">
              <picture>
                <source srcSet={asset(OVERVIEW.imagePc)} media="(min-width: 1080px)" />
                <img
                  src={asset(OVERVIEW.imageMo)}
                  alt="Animora 회사 전경"
                  className="w-full h-auto object-cover opacity-80"
                />
              </picture>
            </div>
          </section>

          {/* 🟠 Promise 섹션 */}
          <section
            id="promise"
            className="w-full promise flex flex-col lg:gap-[120px] py-xl px-[10px] lg:px-0 gap-md"
          >
            <p className="text-xl font-bold mb-4 lg:hidden">
              Animora’s own Promise
            </p>
            <h2 className="text-xl font-bold">
              Animora는 프리미엄 반려동물 케어를 약속하는 브랜드입니다.
            </h2>
            <div className="flex flex-col gap-md border-l-4 lg:ps-[60px] ps-md md:ps-lg">
              {PROMISES.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 lg:gap-0">
                  <p className="text-lg text-main-primary font-bold">
                    {item.title}
                  </p>
                  <p className="text-sm whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 중간 큰 이미지 */}
          <div className="hidden md:block rounded-t-50 overflow-hidden my-xl">
            <img src={asset("img/companyimg2.jpg")} alt="Animora 시설 이미지" />
          </div>
          <div className="md:hidden w-full h-auto object-cover px-[10px] my-xl flex justify-center">
            <img src={asset("img/companyimg2_m.jpg")} alt="Animora 시설 이미지" />
          </div>

          {/* 🔵 CI 섹션 */}
          <section
            id="ci"
            className="w-full ci flex flex-col lg:gap-[60px] py-xl px-[10px] lg:px-0 gap-md"
          >
            <p className="text-xl font-bold mb-4 lg:hidden">
              CI
            </p>
            <h2 className="text-xl font-bold">{CI_CONTENT.heading}</h2>
            <p className="text-sm leading-relaxed pb-8 lg:pb-0">
              {CI_CONTENT.description.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <div className="flex gap-md flex-col lg:flex-row">
              <div className="text-black border-2 border-black px-4 py-4 flex justify-center">
                <HeaderLogo className="max-w-[320px] h-auto" />
              </div>
              <div className="text-black border-2 border-black px-4 py-4 flex justify-center items-center">
                <FooterLogo className="hidden lg:block w-full h-auto" />
                <FooterLogoMobile className="block lg:hidden max-w-[320px] h-auto" />
              </div>
            </div>
          </section>

          {/* 🟣 Colors 섹션 */}
          <section
            id="colors"
            className="w-full flex flex-col lg:gap-[60px] py-xl px-[10px] lg:px-0 gap-md"
          >
            <h2 className="text-xl font-bold">Corporate Colors</h2>
            <div className="flex gap-6 flex-wrap flex-col lg:flex-row">
              {CORPORATE_COLORS.map((color, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: color.hex }}
                  className="text-white flex flex-col flex-1 items-center justify-center p-16 min-w-xxl rounded"
                >
                  <p className="text-sm">{color.label}</p>
                  <p className="text-sm">{color.hex}</p>
                </div>
              ))}
            </div>
          </section>
          <section
            id="partner"
            className="w-full overview flex flex-col lg:gap-[60px] py-xl px-[10px] lg:px-0 gap-md"
          >
            <h2 className="text-xl font-bold whitespace-pre-line">
              {Partner.heading}
            </h2>

            <p className="text-sm leading-relaxed">
              {Partner.description.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            {/* ✅ 공통 파트너 로고 컴포넌트 */}
            <PartnerLogos variant="grid" />
          </section>

              
        </div>
      </div>
    </section>
  );
}

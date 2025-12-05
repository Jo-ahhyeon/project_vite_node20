import { useEffect, useRef } from "react";
import AboutCard from "./AboutCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const cards = [
    {
      titleEn: "Brand story",
      titleKo: "브랜드 스토리",
      img: "/img/brandstoryimg.jpg",
      link: "/brandstory",
    },
    {
      titleEn: "About Animora",
      titleKo: "애니모라 소개",
      img: "/img/companyInfo.jpg",
      link: "/companyinfo",
    },
    {
      titleEn: "Corporate Social Responsibility",
      titleKo: "사회적 책임",
      img: "/img/csr.jpg",
      link: "/csr",
    },
  ];

  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
  if (typeof window === "undefined" || window.innerWidth < 1080) return;

  const ctx = gsap.context(() => {
    const targets = cardsRef.current.filter(Boolean);
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 60 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.35,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // 중요!!! 이미지 로드 후 refresh
  const handleLoad = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", handleLoad);

  return () => {
    window.removeEventListener("load", handleLoad);
    ctx.revert();
  };
}, []);

  return (
    <div id="about-section" className="w-full h-full">
      <div className="container1650 mx-auto grid grid-cols-1 md:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <AboutCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

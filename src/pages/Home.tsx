import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Hero from "../components/sections/Hero";
import Partnership from "../components/sections/Partnership";
import About from "../components/sections/about/About";
import Reservation from "../components/sections/Reservation";
import Facility from "../components/sections/Facility";
import Media from "../components/sections/Media";
import Review from "../components/sections/Review";
import Service from "../components/sections/Service";
import Solution from "../components/sections/Solution";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Home() {
  useEffect(() => {
    if (window.innerWidth < 1080) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".panel")
    );

    if (!sections.length) return;

    // 현재 스크롤 위치 기준으로 가장 가까운 섹션 인덱스 찾기
    const getCurrentIndexFromScroll = () => {
      const scrollY = window.scrollY;
      let closestIndex = 0;
      let minDiff = Infinity;

      sections.forEach((sec, idx) => {
        const diff = Math.abs(sec.offsetTop - scrollY);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      });

      return closestIndex;
    };

    let currentIndex = getCurrentIndexFromScroll();
    let isAnimating = false;
    const duration = 0.7; // GSAP 애니메이션 시간 (초)
    const wheelThreshold = 20; // 너무 작은 휠 스크롤은 무시

    const goToSection = (index: number) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, index));

      if (clamped === currentIndex) return;
      if (isAnimating) return;

      isAnimating = true;
      currentIndex = clamped;

      const targetTop = sections[clamped].offsetTop;

      // ✅ GSAP ScrollToPlugin 사용
      gsap.to(window, {
        duration, // 초 단위
        scrollTo: { y: targetTop, autoKill: false },
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      // 1080 미만일 때는 그냥 두기
      if (window.innerWidth < 1080) return;

      // 풀페이지 모드에서는 기본 스크롤 막기
      e.preventDefault();

      if (isAnimating) return;

      // 너무 미세한 스크롤은 무시
      if (e.deltaY > wheelThreshold && currentIndex < sections.length - 1) {
        goToSection(currentIndex + 1);
      } else if (
        e.deltaY < -wheelThreshold &&
        currentIndex > 0
      ) {
        goToSection(currentIndex - 1);
      }
    };

    const onResize = () => {
      if (window.innerWidth < 1080) {
        // 모바일 사이즈 내려가면 휠 이벤트 제거
        window.removeEventListener("wheel", onWheel as any);
      } else {
        // 다시 1080 이상이 되면 현재 스크롤 기준으로 인덱스 재계산
        currentIndex = getCurrentIndexFromScroll();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <section id="hero" className="panel" data-bg="dark">
        <Hero />
      </section>
      <section id="partnership" className="panel" data-bg="light">
        <Partnership />
      </section>
      <section id="about" className="panel" data-bg="dark">
        <About />
      </section>
      <section id="reservation" className="panel" data-bg="light">
        <Reservation />
      </section>
      <section id="facility" className="panel" data-bg="light">
        <Facility />
      </section>
      <section id="media" className="panel" data-bg="dark">
        <Media />
      </section>
      <section id="review" className="panel" data-bg="light">
        <Review />
      </section>
      <section id="service" className="panel" data-bg="dark">
        <Service />
      </section>
      <section id="solution" className="panel" data-bg="dark">
        <Solution />
      </section>
    </>
  );
}

export default Home;

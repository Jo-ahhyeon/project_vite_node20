import { useRef, useEffect } from "react";
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
    const elements = cardsRef.current;

    gsap.set(elements, { opacity: 0, y: 60 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 1,   // ← 딴 딴 딴 간격
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "restart none none reset", 
      },
    });
  }, []);

  return (
    <section id="about" className="w-full h-full">
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
    </section>
  );
};

export default About;

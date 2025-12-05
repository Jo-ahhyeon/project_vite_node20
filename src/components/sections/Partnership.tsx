import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Partnership() {
  const textRef = useRef<HTMLParagraphElement>(null);

  const partners = [
    "/img/partnership1.png",
    "/img/partnership2.png",
    "/img/partnership3.png",
    "/img/partnership4.png",
    "/img/partnership5.png",
    "/img/partnership6.png",
    "/img/partnership7.png",
  ];

  const sentences = [
    "다양한 기업들과",
    "안전하게 믿을 수 있는",
    "특별한 경험",
  ];

  useGSAP(() => {
  const sentenceEl = textRef.current;
  if (!sentenceEl) return;

  let index = 0;

  const showSentence = () => {
    sentenceEl.textContent = sentences[index];

    gsap.fromTo(
      sentenceEl,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.to(sentenceEl, {
      opacity: 0,
      x: -30,
      delay: 1.5,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        index = (index + 1) % sentences.length;
        showSentence();
      },
    });
  };

  showSentence();
}, []);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-[url('/img/partnership.jpg')] bg-cover bg-center bg-no-repeat py-20 gap-xl min-h-screen lg:h-screen">

      <div className="hidden lg:block w-full overflow-hidden">
        <div className="partner-track">
          {[...partners, ...partners].map((logo, i) => (
            <img key={i} src={logo} className="h-18 object-contain" />
          ))}
        </div>
      </div>

      <div className="lg:hidden grid grid-cols-2 gap-xl p-8 lg:px-2">
        {partners.map((logo, i) => (
          <img key={i} src={logo} className="lg:h-12 mx-auto object-contain" />
        ))}
      </div>

      {/* 🔥 텍스트 애니메이션 */}
      <div className="text-center text-black mt-6">
        <h2 className="text-title font-light">함께 만들어가는 신뢰와 가치</h2>

        <div className="relative h-[100px] overflow-hidden mt-3">
          <p ref={textRef} className="text-title font-semibold whitespace-nowrap"></p>
        </div>
      </div>
    </section>
  );
}

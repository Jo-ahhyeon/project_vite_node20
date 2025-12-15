import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PartnerLogos from "@/components/common/PartnerLogos";

export default function Partnership() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const sentences = useMemo(
    () => ["다양한 기업들과", "안전하게 믿을 수 있는", "특별한 경험"],
    []
  );

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      let index = 0;
      el.textContent = sentences[index];

      const tl = gsap.timeline({ repeat: -1 });

      tl.add(() => {
        el.textContent = sentences[index];
      })
        .fromTo(
          el,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        )
        .to(el, { opacity: 1, x: 0, duration: 1.2 })
        .to(el, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            index = (index + 1) % sentences.length;
          },
        });

      return () => tl.kill();
    },
    { scope: sectionRef, dependencies: [sentences] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Partnership"
      className="w-full overflow-x-hidden flex flex-col items-center justify-center partnership_bg h-screen bg-cover bg-center bg-no-repeat py-20 gap-xl"
    >
      <div className="block lg:hidden">
        <PartnerLogos variant="grid" />
      </div>
      <div className="hidden lg:block">
        <PartnerLogos variant="scroll" />
      </div>

      {/* 텍스트 */}
      <header className="text-center text-black lg:mt-6">
        <h2 className="text-title font-light">함께 만들어가는 신뢰와 가치</h2>

        <div className="relative h-[100px] overflow-hidden mt-3">
          <p
            ref={textRef}
            className="text-title font-semibold whitespace-nowrap"
          />
        </div>
      </header>
    </section>
  );
}

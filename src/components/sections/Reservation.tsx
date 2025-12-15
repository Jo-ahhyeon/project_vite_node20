import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
useGSAP(() => {
  const line1 = document.querySelector("#underline-path-1") as SVGPathElement;
  const line2 = document.querySelector("#underline-path-2") as SVGPathElement;

  if (!line1 || !line2) return;

  const len1 = line1.getTotalLength();
  const len2 = line2.getTotalLength();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#underline-target",
      start: "top bottom",
      toggleActions: "restart none restart none",
      once: false,
    },
  });

  tl.fromTo(
    line1,
    { strokeDasharray: len1, strokeDashoffset: len1, opacity: 0 },
    { strokeDashoffset: 0, opacity: 1, duration: 1.0, ease: "power2.out" }
  );

  tl.fromTo(
    line2,
    { strokeDasharray: len2, strokeDashoffset: len2, opacity: 0 },
    { strokeDashoffset: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
    "-=0.5"
  );
});

  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden gap-[100px] lg:gap-[150px] h-screen bg-white">
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="rolling-text whitespace-nowrap animate-rolling-slow">
          <span className="mx-10 opacity-10 tracking-tight leading-none font-bold text-[60px] sm:text-[120px] lg:text-[250px]">
            Animore Hotels Premium pet care & visit service
          </span>
          <span className="mx-10 opacity-10 tracking-tight leading-none font-bold text-[60px] sm:text-[120px] lg:text-[250px]">
            Animore Hotels Premium pet care & visit service
          </span>
        </div>
      </div>
      <h2 className="text-title font-bold leading-snug relative z-10 text-center px-4 break-keep">
        보호자는 안심하고, 반려동물은 행복하게 <br />
        <span id="underline-target" className="relative inline-block">
          그 이상의 가치

          <svg
            id="underline-svg"
            className="absolute left-0 -bottom-2 w-full h-[30px] sm:h-[45px] lg:h-[60px]"
            viewBox="0 0 400 60"
            fill="none"
          >
            <path
              id="underline-path-1"
              d="M5 20 C80 10, 220 10, 395 25"
              stroke="#313F3680"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              id="underline-path-2"
              d="M5 40 C120 30, 260 35, 395 40"
              stroke="#313F3680"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        를 제공합니다.
      </h2>
      <div className="mt-3">
        <Button
          variant="primary" size="lg" >
          예약하기
        </Button>
      </div>
      
    </div>
  );
}
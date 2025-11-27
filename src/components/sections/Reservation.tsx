import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  useGSAP(() => {
    const underlinePath = document.querySelector("#underline-path");

    if (!underlinePath) return;

    gsap.fromTo(
      underlinePath,
      { strokeDashoffset: 400, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#underline-target",
          start: "top 85%",
          once: false, // 다시 올라왔다 내려오면 재생
        },
      }
    );
  });

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden gap-xl py-20">

      {/* 🔥 배경 롤링 텍스트 */}
      <div className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden">
        <div className="rolling-text absolute top-1/3 left-0 -translate-y-1/2 whitespace-nowrap animate-rolling-slow">
          <span className="mx-10 opacity-10 tracking-tight text-[250px] font-bold">
            Animore Hotels Premium pet care & visit service
          </span>
          <span className="mx-10 opacity-10 tracking-tight text-[250px] font-bold">
            Animore Hotels Premium pet care & visit service
          </span>
        </div>
      </div>

      {/* 🔥 메인 문구 */}
      <h2 className="text-title font-bold leading-snug relative z-10 text-center">
        보호자는 안심하고, 반려동물은 행복하게 <br />

        {/* underline-target */}
        <span id="underline-target" className="relative inline-block">
          그 이상의 가치

          {/* 🔥 부드러운 펜 드로잉 밑줄 */}
          <svg
            id="underline-svg"
            className="absolute left-0 -bottom-3 w-full h-[25px]"
            viewBox="0 0 300 40"
            fill="none"
          >
            <path
              id="underline-path"
              d="M5 20 C80 45, 150 -5, 290 20"
              stroke="#1e40af"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="400"
            />
          </svg>
        </span>

        를 제공합니다.
      </h2>

      {/* 🔥 버튼 */}
      <Link
        to="/reservation"
        className="relative z-10 inline-block mt-10 px-10 py-4 bg-[#313F36] text-white rounded-full text-button font-medium hover:bg-[#2A3830] transition"
      >
        예약하기
      </Link>
    </section>
  );
}

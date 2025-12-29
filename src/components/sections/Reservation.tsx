import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import ReservationModal from "@/pages/ReservationModal";
import SuccessModal from "@/components/common/SuccessModal";


gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    

  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";

  return () => {
    // 원복 + 원래 위치로 복귀
    const top = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    const restoreY = top ? Math.abs(parseInt(top, 10)) : 0;
    window.scrollTo(0, restoreY);
  };
}, [open]);

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
    <>
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

        <div className="mt-3 relative z-10">
          <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
            예약하기
          </Button>
        </div>
      </div>

      <ReservationModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (data) => {
          try {
            const API = import.meta.env.DEV
              ? "/api"
              : import.meta.env.VITE_API_BASE;

            const res = await fetch(`${API}/reservation_save.php`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

             const text = await res.text();
              console.log("status:", res.status);
              console.log("raw response:", text);
              console.log("raw length:", text.length);
              console.log("raw response:", JSON.stringify(text));

      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
      }
      if (!res.ok || !json?.success) {
        alert(json?.message || `저장 실패 (status ${res.status})`);
        return;
      }

      setOpen(false);
      setSuccessOpen(true);

    } catch (err) {
      console.error(err);
      alert("네트워크/서버 오류");
    }
        }}
      />
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="예약이 접수되었습니다!"
        desc={
          <>
            예약해주셔서 감사합니다. 방문일에 뵙겠습니다.
            <br />
            <span className="font-semibold">고객센터 1111-2222</span>
          </>
        }
      />
    </>
  );
}

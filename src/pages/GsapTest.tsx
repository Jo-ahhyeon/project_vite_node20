import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GsapTest() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      boxRef.current,
      { x: 0, opacity: 0 },
      { x: 150, opacity: 1, duration: 1.5, ease: "power3.out" }
    );
  });

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-200">
      <div
        ref={boxRef}
        className="w-[120px] h-[120px] bg-blue-500 rounded-xl"
      />
    </div>
  );
}

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../ui/Button";

// 반드시 필요!!! (Swiper CSS)
import "swiper/css";
import "swiper/css/pagination";

export default function Solution() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/solution_bg.jpg')" }}>
        <div className="absolute inset-0 bg-main-primary opacity-40"></div>
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="relative w-full h-full"
        allowTouchMove={false}>
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center min-h-screen gap-10 text-white">
            <h2 className="text-title font-bold leading-snug">
              맞춤형 예약 솔루션을 <br /> 상담 받아보세요!
            </h2>

            <p className="text-lg font-medium">
              Q. 보호자분의 반려동물은 어떤 성격인가요?
            </p>
            <div className="flex flex-wrap gap-6 mt-6 justify-center">
              <Button
                variant="outline"
                size="xl"
                onClick={() => swiperRef.current.slideNext()}
              >
                활발해요
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => swiperRef.current.slideNext()}
              >
                낯가려요
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => swiperRef.current.slideNext()}
              >
                순해요
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* 🔥 두 번째 슬라이드 — placeholder */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center min-h-screen gap-10 text-white">
            <h2 className="text-title font-bold leading-snug">
              맞춤형 예약 솔루션을 <br /> 상담 받아보세요!
            </h2>
            <p className="text-lg font-medium">
              Q. 추가로 알려주실 특이사항이 있나요?
            </p>
            <div className="flex flex-wrap gap-6 mt-6">
              <Button
                variant="outline"
                size="xl"
                onClick={() => swiperRef.current.slideNext()}
              >
                활발해요
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* 🔥 세 번째 슬라이드 — placeholder */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h2 className="text-title font-bold">세번째 페이지</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import heroVideo from "../../assets/hero.mp4";
import heroimg from "../../../public/img/heroimg.jpg";

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-[5]"></div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        className="w-full h-full"
      >
        {/* 🔥 슬라이드 1 — 비디오 */}
        <SwiperSlide>
          <video
            className="w-full h-full object-cover opacity-90"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroimg}
          />
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-title z-10">
            Animora
          </h2>
        </SwiperSlide>

        {/* 🔥 슬라이드 2 — 이미지 */}
        <SwiperSlide>
          <img
            src={heroimg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-70"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

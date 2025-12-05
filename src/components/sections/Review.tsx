import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { useRef, useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import PaginationComponent from "../ui/Pagination";


const reviews = [
  { id: 1, text: " 소중한 제 아이를 맡기는 게 걱정이더라구요. 호텔에 전화해서 제 아이 성격이랑 이것저것 설명드렸더니 상담사분께서 맞춤 서비스를 알려주셔서 덕분에 맘놓고 맡길 수 있었습니다.", name: "조**님", stars: 5, avatar: "/img/reviewAvatar.png" },
  { id: 2, text: " 소중한 제 아이를 맡기는 게 걱정이더라구요. 호텔에 전화해서 제 아이 성격이랑 이것저것 설명드렸더니 상담사분께서 맞춤 서비스를 알려주셔서 덕분에 맘놓고 맡길 수 있었습니다.", name: "박**님", stars: 5, avatar: "/img/reviewAvatar.png" },
  { id: 3, text: " 소중한 제 아이를 맡기는 게 걱정이더라구요. 호텔에 전화해서 제 아이 성격이랑 이것저것 설명드렸더니 상담사분께서 맞춤 서비스를 알려주셔서 덕분에 맘놓고 맡길 수 있었습니다.", name: "김**님", stars: 4, avatar: "/img/reviewAvatar.png" },
  { id: 4, text: " 소중한 제 아이를 맡기는 게 걱정이더라구요. 호텔에 전화해서 제 아이 성격이랑 이것저것 설명드렸더니 상담사분께서 맞춤 서비스를 알려주셔서 덕분에 맘놓고 맡길 수 있었습니다.", name: "이**님", stars: 3, avatar: "/img/reviewAvatar.png" },
  { id: 5, text: " 소중한 제 아이를 맡기는 게 걱정이더라구요. 호텔에 전화해서 제 아이 성격이랑 이것저것 설명드렸더니 상담사분께서 맞춤 서비스를 알려주셔서 덕분에 맘놓고 맡길 수 있었습니다.", name: "최**님", stars: 2, avatar: "/img/reviewAvatar.png" },
];

export default function Review() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalPages = reviews.length;
  const currentPage = (activeIndex % reviews.length) + 1;

  return (
    <section className="flex flex-col justify-center py-20 bg-white min-h-screen lg:h-screen">
      <div className="text-center mb-12">
        <h2 className="text-sub font-bold">
          고객들의 신뢰를 얻어낸 <br /> 다양한 사례를 소개합니다.
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay, EffectCoverflow]}
          centeredSlides={true}
          loop={true}
          effect="coverflow"
          spaceBetween={40}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={false} // ✨ Swiper 기본 페이지네이션 OFF
          breakpoints={{
            0: {
              slidesPerView: 1,
              autoplay: false,
            },
            420: {
              slidesPerView: 1.6,
              autoplay: false,
            },
            1080: {
              slidesPerView: 3,
              autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              },
            },
          }}
          className="review-swiper pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id} className="p-2 self-start">
              <div className="flex flex-col items-center">

                <div className="w-16 h-16 rounded-full block lg:hidden z-20 lg:-mb-8">
                  <img src={review.avatar} alt="" className="w-full h-full object-cover" />
                </div>

                <div
                  className={`relative text-center px-6 lg:p-8 rounded-30 transition-all duration-300 bg-transparent
                  ${
                    index === activeIndex
                      ? "lg:bg-main-primary lg:text-white lg:opacity-100 lg:scale-100 lg:text-start"
                      : "lg:bg-transparent lg:text-black/20 lg:opacity-40 lg:scale-90 lg:text-start"
                  }`}
                >
                  <span
                    className={`absolute top-0 lg:top-6 left-7 text-[55px] font-serif pointer-events-none
                      text-[#00000040]
                      ${index === activeIndex ? "lg:text-[70px] lg:text-white/10" : "lg:text-black/10"}
                      !text-black/60`}
                  >
                    “
                  </span>

                  <p
                    className={`mt-4 mx-6 lg:mx-0 lg:mt-12 mb-4 text-sm leading-relaxed text-[#00000060]
                      ${index === activeIndex ? "lg:text-white" : "lg:text-black/20"}`}
                  >
                    {review.text}
                  </p>

                  <div className="w-full flex justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg text-main-primary
                          ${i < review.stars ? (index === activeIndex ? "lg:text-white" : "lg:text-black/10") : "lg:text-black/10"}
                          `}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div
                    className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0
                      border-x-[15px] border-x-transparent border-t-[15px]
                      ${index === activeIndex ? "lg:border-t-main-primary" : "lg:border-t-transparent"}
                      border-t-transparent`}
                  />
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <img src={review.avatar} className="w-16 h-16 rounded-full hidden lg:block" />
                  <p className="text-sm font-semibold text-[#00000060]">{review.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-4">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => swiperRef.current?.slideToLoop(page - 1)}
          />
        </div>
      </div>
    </section>
  );
}
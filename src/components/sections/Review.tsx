import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { useRef, useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { REVIEWS } from "@/data/reviews";

import PaginationComponent from "../ui/Pagination";
import ReviewCard from "@/components/common/ReviewCard";


const reviews = REVIEWS;

export default function Review() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalPages = reviews.length;
  const currentPage = (activeIndex % reviews.length) + 1;

  return (
    <div className="flex flex-col justify-center py-20 bg-white min-h-screen lg:h-screen">
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
              <ReviewCard review={review} isActive={index === activeIndex} />
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
    </div>
  );
}
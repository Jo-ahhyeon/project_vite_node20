import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// 🔥 커스텀 페이지네이션
import PaginationComponent from "../ui/Pagination";

type Facility = {
  id: number;
  img: string;
  title: string;
};

const facilities: Facility[] = [
  { id: 1, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 2, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 3, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 4, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 5, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 6, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 7, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 8, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 9, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
  { id: 10, img: "/img/facility1.jpg", title: "한눈에 보는 호텔 시설 안내" },
];

const groupByFour = facilities.reduce<Facility[][]>((acc, _, i) => {
  if (i % 4 === 0) acc.push(facilities.slice(i, i + 4));
  return acc;
}, []);

export default function Facility() {
  // 데스크탑 Swiper
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 모바일 Swiper
  const mobileSwiperRef = useRef<SwiperCore | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileTotalSlides] = useState(groupByFour.length);

  // ⭐ 데스크탑 페이지네이션 계산
  const desktopTotalPages = Math.ceil(facilities.length / 4);
  const desktopCurrentPage = Math.floor(activeIndex / 4) + 1;

  return (
    <section className="flex flex-col justify-center items-center py-20 bg-white min-h-screen lg:h-screen">
      <h2 className="text-sub font-bold mb-12">한눈에 보는 호텔 시설 안내</h2>

      <div className="w-full max-w-container-xl mx-auto">

        {/* === 모바일 Swiper === */}
        <div className="md:hidden px-4">
          <Swiper
            onSwiper={(swiper) => {
              mobileSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setMobileActiveIndex(swiper.activeIndex)}
            modules={[]}
            pagination={false}
          >
            {groupByFour.map((group, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-2 gap-4">
                  {group.map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.img}
                        className="w-full h-[150px] object-cover"
                        alt={item.title}
                      />
                      <p className="text-center font-light text-sm mt-2 text-black">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🔥 모바일 페이지네이션 */}
          <PaginationComponent
            currentPage={mobileActiveIndex + 1}
            totalPages={mobileTotalSlides}
            onPageChange={(page) => mobileSwiperRef.current?.slideTo(page - 1)}
          />
        </div>

        {/* === 데스크탑 Swiper === */}
        <div className="hidden md:block">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Pagination, Autoplay]}
            slidesPerView={4}
            spaceBetween={20}
            pagination={false}
            breakpoints={{
              0: { autoplay: false },
              1080: {
                autoplay: {
                  delay: 1500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },
              },
            }}
          >
            {facilities.map((item) => (
              <SwiperSlide key={item.id}>
                <div>
                  <img
                    src={item.img}
                    className="w-full aspect-square object-cover"
                    alt={item.title}
                  />
                  <p className="text-center text-sm mt-4 text-black">
                    {item.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🔥 데스크탑 페이지네이션 (내가 직접 추가해서 완성!) */}
          <PaginationComponent
            currentPage={desktopCurrentPage}
            totalPages={desktopTotalPages}
            onPageChange={(page) =>
              swiperRef.current?.slideTo((page - 1) * 4)
            }
          />
        </div>

      </div>
    </section>
  );
}

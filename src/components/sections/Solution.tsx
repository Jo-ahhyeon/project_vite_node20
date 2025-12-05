import { useState, useRef, FormEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";

// JSON 데이터
import solution from "../../data/solution.json";

// 커스텀
import PaginationComponent from "../ui/Pagination";
import Button from "../ui/Button";

import "swiper/css";
import FullpageFt from "../layout/FullpageFt";

// 타입 정의
interface FormData {
  question1Answer: string;
  question2Text: string;
  name: string;
  contact: string;
  petName: string;
}

export default function Solution() {
  const [formData, setFormData,] = useState<FormData>({
    question1Answer: "",
    question2Text: "",
    name: "",
    contact: "",
    petName: "",
  });

  const swiperRef = useRef<SwiperCore | null>(null);
  const [currentPage, setActiveIndex] = useState(1);

  // JSON 기반 슬라이드 수
  const totalSlides = solution.slides.length;

  // 핸들러
 
  const handleQuestion1Answer = (answer: string) => {
    setFormData((prev) => ({ ...prev, question1Answer: answer }));
    swiperRef.current?.slideNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.petName) {
      alert("이름, 연락처, 반려동물 이름을 모두 입력해주세요.");
      return;
    }

    console.log("📦 최종 제출 데이터(formData):", JSON.stringify(formData, null, 2));
    console.table(formData); // 표 형태로 보기 좋게 출력


    alert("전송 완료");
    setFormData({
  question1Answer: "",
  question2Text: "",
  name: "",
  contact: "",
  petName: "",
});

// 🔥 첫 페이지로 이동
swiperRef.current?.slideTo(0);

// 🔥 페이지 번호도 1로 리셋
setActiveIndex(1);
  };

  // Slide 렌더링 함수
 
  const renderSlide = (slide: any) => {
    switch (slide.type) {
      case "select":
        return (
          <div className="flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <h3 className="text-lg font-medium text-white px-4 text-center max-w-container-sm lg:text-start w-full">
              Q. {slide.question}
            </h3>

            <div className="flex flex-col lg:flex-row w-full max-w-container-sm gap-4">
              {slide.options.map((opt: string) => (
                <Button
                  key={opt}
                  variant="outline"
                  size="lg"
                  className="w-full text-white"
                  onClick={() => handleQuestion1Answer(opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        );

      case "text":
        return (
          <div className="flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <h3 className="text-lg font-medium text-white px-4 text-center lg:text-start w-full">
              Q. {slide.question}
            </h3>

            <div className="flex flex-col lg:flex-row w-full max-w-container-md gap-4">
              <input
                name={slide.answerKey}
                value={formData[slide.answerKey as keyof FormData]}
                onChange={handleInputChange}
                placeholder={slide.placeholder}
                className="flex-grow bg-[#FFFFFF40] text-sm rounded-30 p-4 lg:p-6 w-full text-[14px] touch-manipulation"
              />

              <Button
                type="button"
                variant="primary"
                size="lg"
                className="p-6 whitespace-nowrap text-button w-full lg:w-auto"
                onClick={() => swiperRef.current?.slideNext()}
              >
                다음으로
              </Button>
            </div>
          </div>
        );

      case "form":
        return (
          <div className="flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <h3 className="text-lg font-medium text-white px-4 w-full text-center lg:text-start">
              {slide.question}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col lg:flex-row w-full max-w-container-md gap-4"
            >
              <div className="flex flex-col lg:flex-row w-full gap-4">
                {slide.fields.map((field: any) => (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    className="bg-[#FFFFFF40] p-6 rounded-50 text-sm w-full text-[14px] touch-manipulation"
                  />
                ))}
              </div>

              <Button type="submit" variant="primary" size="lg" className="p-6 whitespace-nowrap text-button">
                맞춤 예약 솔루션 받기
              </Button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative w-full min-h-screen h-full text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/solution_bg.jpg')" }}>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h2 className="text-title font-semibold text-white leading-snug text-center mb-4">
          맞춤형 예약 솔루션을 <br /> 상담 받아보세요!
        </h2>

        <div className="flex flex-col items-center justify-center w-full max-w-container-md">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(s) => setActiveIndex(s.activeIndex + 1)}  // ← 핵심
            slidesPerView={1}
            allowTouchMove={false}
            autoHeight={true}
            pagination={false}
            className="w-full"
          >
            {solution.slides.map((slide) => (
              <SwiperSlide key={slide.id}>{renderSlide(slide)}</SwiperSlide>
            ))}
          </Swiper>

          {/* 🔥 JSON 기반 커스텀 페이지네이션 */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalSlides}
            onPageChange={(page) => {
              if (page > currentPage) return;
              swiperRef.current?.slideTo(page - 1);}}
          />
        </div>
      </div>
      <div className="w-full absolute bottom-0">
        <FullpageFt/>
      </div>
      
    </section>
  );
}

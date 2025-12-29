import { useState, useRef, FormEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";

import { asset } from "@/utils/asset";

import solution from "../../data/solution.json";

import PaginationComponent from "../ui/Pagination";
import Button from "../ui/Button";

import "swiper/css";
import FullpageFt from "../layout/FullpageFt";
import SuccessModal from "@/components/common/SuccessModal";

// 타입 정의
interface FormData {
  question1Answer: string;
  question2Text: string;
  name: string;
  contact: string;
  petName: string;
}

export default function Solution() {
  const API_BASE = import.meta.env.VITE_API_BASE as string;

  const [formData, setFormData] = useState<FormData>({
    question1Answer: "",
    question2Text: "",
    name: "",
    contact: "",
    petName: "",
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length < 4) return numbers;
  if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const stripHyphen = (value: string) => value.replace(/-/g, "");
  const contactNumberOnly = stripHyphen(formData.contact);
  const isContactValid = contactNumberOnly.length === 11;

  const canSubmit =
    formData.name.trim() &&
    formData.petName.trim() &&
    isContactValid;

  const swiperRef = useRef<SwiperCore | null>(null);
  const [currentPage, setActiveIndex] = useState(1);
  const [contactTouched, setContactTouched] = useState(false);

  const totalSlides = solution.slides.length;

  const handleQuestion1Answer = (answer: string) => {
    setFormData((prev) => ({ ...prev, question1Answer: answer }));
    swiperRef.current?.slideNext();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === "contact") {
    const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, contact: formatted }));
      setContactTouched(true);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.petName) {
      alert("이름, 반려동물 이름을 모두 입력해주세요.");
      return;
    }

    if (!isContactValid) {
      setContactTouched(true);
      return;
    }

    const submitData = {
      ...formData,
      contact: stripHyphen(formData.contact),
    };

    try {
      const response = await fetch(`${API_BASE}/solution_save.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData), // ✅ submitData 전송
        credentials: "include",
      });

      const text = await response.text();
      console.log("📩 raw:", text);

      let result: { success?: boolean; message?: string } | null = null;
      try {
        result = JSON.parse(text);
      } catch {
        alert("서버가 JSON이 아닌 응답을 보냈어. 콘솔 raw 확인!");
        return;
      }

      if (!response.ok || !result?.success) {
        alert(result?.message || "서버 저장 중 오류가 발생했습니다.");
        return;
      }
      
      setSuccessOpen(true);

      // alert("전송 완료! 상담 요청이 접수되었습니다. 😊");

      setFormData({
        question1Answer: "",
        question2Text: "",
        name: "",
        contact: "",
        petName: "",
      });

      setContactTouched(false);

      swiperRef.current?.slideTo(0);
      setActiveIndex(1);
    } catch (error) {
      console.error("❌ 서버 통신 오류:", error);
      alert("서버와 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

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
                {slide.fields.map((field: any) => {
                  const isContact = field.name === "contact";
                  const showError = isContact && contactTouched && !isContactValid;

            return (
              <div key={field.name} className="w-full">
                <input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleInputChange}
                  onBlur={() => isContact && setContactTouched(true)}
                  inputMode={isContact ? "numeric" : undefined}
                  maxLength={isContact ? 13 : undefined} // ✅ 추가
                  className={`
                    bg-[#FFFFFF40] p-6 rounded-50 text-sm w-full text-[14px] touch-manipulation
                    border
                    ${showError ? "border-red-500" : "border-transparent"}
                  `}
                />
              </div>
            );
          })}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!canSubmit}
          className={`
            p-6 whitespace-nowrap text-button
            ${!canSubmit ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
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
    <div className="relative w-full min-h-screen lg:h-screen h-full text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${asset("img/solution_bg.jpg")}')`  }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <h2 className="text-title font-semibold text-white leading-snug text-center mb-4">
          맞춤형 예약 솔루션을 <br /> 상담 받아보세요!
        </h2>

        <div className="flex flex-col items-center justify-center w-full max-w-container-md">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(s) => setActiveIndex(s.activeIndex + 1)}
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
              swiperRef.current?.slideTo(page - 1);
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <FullpageFt />
      </div>
      <SuccessModal
      open={successOpen}
      onClose={() => setSuccessOpen(false)}
      title="맞춤 솔루션이 접수되었습니다!"
      desc={
        <>
          입력해주신 정보를 바탕으로
          <br />
          최적의 케어 솔루션을 안내드릴게요.
        </>
      }
    />
    </div>
  );
}

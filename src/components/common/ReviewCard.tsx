import StarRating from "@/components/ui/StarRating";
import { asset } from "@/utils/asset";

type ReviewItem = {
  id: number;
  text: string;
  name: string;
  stars: number;
  avatar: string;
};

export default function ReviewCard({
  review,
  isActive,
}: {
  review: ReviewItem;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* 모바일 아바타(위) */}
      <div className="w-16 h-16 rounded-full block lg:hidden z-20 lg:-mb-8">
        <img src={asset(review.avatar)} alt="" className="w-full h-full object-cover" />
      </div>

      {/* 말풍선 카드 */}
      <div
        className={`relative text-center px-6 lg:p-8 rounded-30 transition-all duration-300 bg-transparent
          ${
            isActive
              ? "lg:bg-main-primary lg:text-white lg:opacity-100 lg:scale-100 lg:text-start"
              : "lg:bg-transparent lg:text-black/20 lg:opacity-40 lg:scale-90 lg:text-start"
          }`}
      >
        <span
          className={`absolute top-0 lg:top-6 left-7 text-[55px] font-serif pointer-events-none
            text-[#00000040]
            ${isActive ? "lg:text-[70px] lg:text-white/10" : "lg:text-black/10"}
            !text-black/60`}
        >
          “
        </span>

        <p
          className={`mt-4 mx-6 lg:mx-0 lg:mt-12 mb-4 text-sm leading-relaxed text-[#00000060]
            ${isActive ? "lg:text-white" : "lg:text-black/20"}`}
        >
          {review.text}
        </p>

        <StarRating value={review.stars} active={isActive} />

        {/* 말풍선 꼬리 */}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0
            border-x-[15px] border-x-transparent border-t-[15px]
            ${isActive ? "lg:border-t-main-primary" : "lg:border-t-transparent"}
            border-t-transparent`}
        />
      </div>

      {/* 하단 프로필 */}
      <div className="mt-4 flex flex-col items-center">
        <img
          src={asset(review.avatar)}
          className="w-16 h-16 rounded-full hidden lg:block"
          alt=""
        />
        <p className="text-sm font-semibold text-[#00000060]">{review.name}</p>
      </div>
    </div>
  );
}

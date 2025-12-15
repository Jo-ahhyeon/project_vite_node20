type StarRatingProps = {
  value: number;          // 실제 별점 (0~5)
  max?: number;           // 기본 5
  active?: boolean;       // 현재 활성 카드인지 (스타 색상 바뀌는 용도)
};

export default function StarRating({ value, max = 5, active = false }: StarRatingProps) {
  return (
    <div className="w-full flex justify-center">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;

        // 너가 쓰던 룰 그대로 유지:
        // - 활성 카드면 filled 별은 lg에서 흰색
        // - 비활성 카드면 filled도 lg에서 흐리게
        // - empty는 lg에서 흐리게
        const cls = filled
          ? active
            ? "lg:text-white"
            : "lg:text-black/10"
          : "lg:text-black/10";

        return (
          <span key={i} className={`text-lg text-main-primary ${cls}`}>
            ★
          </span>
        );
      })}
    </div>
  );
}

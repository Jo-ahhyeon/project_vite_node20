import PromoCard from "@/components/common/ServiceCard";
import { PROMO_CARDS } from "@/data/services";

export default function Service() {
  const faq = PROMO_CARDS.find((c) => c.variant === "tall")!;
  const wideCards = PROMO_CARDS.filter((c) => c.variant === "wide");

  return (
    <div className="flex flex-col lg:flex-row w-full lg:h-screen">
      {/* 왼쪽 FAQ */}
      <div className="flex-1">
        <PromoCard item={faq} />
      </div>

      {/* 오른쪽 2개 */}
      <div className="flex flex-col flex-1 min-h-screen lg:h-auto">
        {wideCards.map((card) => (
          <PromoCard key={card.id} item={card} />
        ))}
      </div>
    </div>
  );
}

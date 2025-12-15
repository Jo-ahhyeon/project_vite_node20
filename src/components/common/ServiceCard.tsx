import { Link } from "react-router-dom";
import Button from "../ui/Button";
import type { PromoCardItem } from "@/data/services";

import { asset } from "@/utils/asset";

export default function PromoCard({ item }: { item: PromoCardItem }) {
  const isTall = item.variant === "tall";

  return (
    <Link
      to={item.href}
      className={`
        relative overflow-hidden block
        ${isTall
          ? "flex flex-col justify-center items-center text-center bg-main-primary text-white min-h-screen lg:min-h-full"
          : "flex items-center lg:items-start flex-1"}
      `}
    >
      {/* tall (FAQ 카드) */}
      {isTall && (
        <>
          <div
            className="w-[275px] h-auto lg:w-[400px] lg:h-[450px] overflow-hidden"
            style={{ borderRadius: "50% / 200px 200px 0 0" }}
          >
            <img src={`${asset(item.image)}`} alt={item.title} className="w-full h-full object-cover" />
          </div>

          <h3 className="text-sub font-semibold mt-5">{item.title}</h3>

          <p className="text-sm whitespace-pre-line text-center">
            {item.desc}
          </p>

          <Button variant="outline" size="md" className="mt-5">
            {item.cta}
          </Button>
        </>
      )}

      {/* wide (우측 이미지 카드들) */}
      {!isTall && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${asset(item.image)}')` }}
          >
            <div className="absolute inset-0 bg-black opacity-40" />
          </div>

          <div className="relative flex flex-col justify-center items-start text-white p-xl h-full gap-5">
            <h3 className="text-sub font-semibold">{item.title}</h3>

            <p className="text-sm whitespace-pre-line">
              {item.desc}
            </p>

            <Button variant="outline" size="md">
              {item.cta}
            </Button>
          </div>
        </>
      )}
    </Link>
  );
}

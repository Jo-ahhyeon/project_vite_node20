export type PromoCardItem = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  variant?: "tall" | "wide";
};

export const PROMO_CARDS: PromoCardItem[] = [
  {
    id: "faq",
    title: "FAQ",
    desc: "고객님들이 자주 문의하는 질문과 답변을 한곳에 모았습니다.\n빠르고 명확한 해결책을 확인하세요.",
    cta: "자세히 보기",
    href: "/faq",
    image: "img/faq.jpg",
    variant: "tall",
  },
  {
    id: "shop",
    title: "애니모라 쇼핑몰",
    desc: "우리 아이가 먹는 사료, 간식 선택하기 힘드시죠?\n애니모라 쇼핑몰로 오세요.",
    cta: "쇼핑몰 바로가기",
    href: "/shop",
    image: "img/eco.jpg",
    variant: "wide",
  },
  {
    id: "service",
    title: "호텔 & 방문 서비스",
    desc: "쾌적하고 안전한 공간, 맞춤형 놀이와 돌봄…\n최고의 케어를 경험할 수 있습니다.",
    cta: "서비스 소개 바로가기",
    href: "/service",
    image: "img/service.jpg",
    variant: "wide",
  },
];

// src/components/ui/Pagination.tsx
import React from "react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number; // 부모가 전달. 0-based 또는 1-based 모두 허용
  totalPages: number;
  onPageChange: (page: number) => void; // page는 1-based로 반환됨
  allowForward?: boolean; // true: 앞으로 이동 허용 (기본). false: 앞으로 이동 차단
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  allowForward = true,
}) => {
  if (!totalPages || totalPages <= 1) return null;

  // 안전 장치: 부모가 0-based를 보냈을 수도 있으니 1..totalPages 범위로 정규화
  let active = Number.isFinite(currentPage) ? Number(currentPage) : 1;
  // 만약 0 기반이면(예: 0..n-1) 감지해서 +1 처리
  if (active >= 0 && active < 1) active = 1; // 비정상 소수/음수 보호
  // 허용 범위로 clamp
  if (active < 1) active = 1;
  if (active > totalPages) active = totalPages;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-2 lg:gap-1 lg:pt-[50px] pt-[25px]"
      aria-label="pagination"
      data-current={active}
      data-total={totalPages}
    >
      {pages.map((page) => {
        const isActive = page === active;
        const disabledForward = !allowForward && page > active;

        return (
          <button
            key={page}
            onClick={() => {
              if (isActive) return; // 현재 페이지 클릭 무시
              if (disabledForward) return; // 앞으로 이동 금지
              onPageChange(page);
            }}
            aria-current={isActive ? "page" : undefined}
            aria-label={`페이지 ${page} ${isActive ? "현재" : ""}`}
            className={clsx(
              // 기본: 모바일(작은 원), lg: 데스크탑(긴 네모)
              "w-1.5 h-1.5 rounded-full transition-all duration-300 lg:w-10 lg:h-1 lg:rounded-none",
              // 기본/비활성 배경
              {
                // 활성 상태
                "bg-[#3C4A3E] lg:bg-[#3C4A3E80]": isActive,
                // 비활성(일반)
                "bg-gray-100 hover:bg-gray-200": !isActive && !disabledForward,
                // 비활성(앞으로 이동 금지) - 눌러도 동작 안함(회색)
                "bg-gray-200 cursor-not-allowed opacity-60": disabledForward,
              }
            )}
            style={{ border: "none", padding: 0 }}
          />
        );
      })}
    </nav>
  );
};

export default Pagination;

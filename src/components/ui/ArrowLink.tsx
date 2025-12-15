import { Link } from "react-router-dom";
import Arrow from "@/assets/svg/arrow-right.svg";

interface ArrowLinkProps {
  to: string;
  className?: string;
  ariaLabel?: string;
}

export default function ArrowLink({
  to,
  className = "",
  ariaLabel = "바로가기",
}: ArrowLinkProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center
        transition
        ${className}
      `}
    >
      <img src={Arrow} alt="" />
    </Link>
  );
}

import { PARTNERS } from "@/data/partners";
import { asset } from "@/utils/asset";

interface PartnerLogosProps {
  variant?: "scroll" | "grid";
}

export default function PartnerLogos({ variant = "scroll" }: PartnerLogosProps) {
  return (
    <>
      {/* desktop: scroll */}
      {variant === "scroll" && (
        <div className="hidden lg:block w-full overflow-hidden">
          <div className="partner-track">
            {[...PARTNERS, ...PARTNERS].map((logo, i) => (
              <img
                key={`${logo}-${i}`}
                src={`${asset(logo)}`}
                alt={`partner-logo-${i + 1}`}
                className="h-18 object-contain"
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* grid: mobile 2 cols / desktop 2 rows */}
      {variant === "grid" && (
        <div
          className="
            grid
            grid-cols-2
            gap-xl
            p-8

            lg:grid-cols-none
            lg:grid-rows-2
            lg:grid-flow-col
          "
        >
          {PARTNERS.map((logo, i) => (
            <img
              key={logo}
              src={`${asset(logo)}`}
              alt={`partner-logo-${i + 1}`}
              className="mx-auto object-contain w-[70%] lg:w-[80%]"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/svg/logo.svg";
import globalbtn from "../../assets/svg/globalbtn.svg";

interface NaviItem {
  title: string;
  link: string;
}

interface HdProps {
  cls: string;
}

const Hd: React.FC<HdProps> = ({ cls }) => {
  const [navidata, setNavi] = useState<NaviItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isLightBg, setIsLightBg] = useState(false);

  // ⭐ 모바일 여부
  const [isMobile, setIsMobile] = useState(false);

  // ⭐ 모바일에서 헤더 show/hide
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const handleScrollNavigation = (id: string) => {
    const cleanId = id.replace("/", "").trim().toLowerCase();
    let target = document.getElementById(cleanId);

    if (!target) {
      setTimeout(() => {
        target = document.getElementById(cleanId);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  /** -----------------------------
   * 0) 화면 크기 체크
   * ----------------------------- */
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 1080);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  /** -----------------------------
   * ⭐ 모바일에서 스크롤 시 헤더 숨김/표시
   * ----------------------------- */
  useEffect(() => {
    if (!isMobile) return; // 데스크탑에서는 작동 안 함

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll) {
        // 아래로 스크롤 → 헤더 숨김
        setShowHeader(false);
      } else {
        // 위로 스크롤 → 헤더 표시
        setShowHeader(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScroll]);

  /** -----------------------------
   * ① 네비게이션 로드
   * ----------------------------- */
  useEffect(() => {
    const fetchNaviData = async () => {
      try {
        const response = await axios.get("/db/navi.xml", {
          headers: { "Content-Type": "application/xml" },
        });

        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, "application/xml");
        const items = Array.from(xml.getElementsByTagName("item"));

        const parsed = items.map((item) => ({
          title: item.getElementsByTagName("title")[0]?.textContent || "",
          link: item.getElementsByTagName("link")[0]?.textContent || "",
        }));

        setNavi(parsed);
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNaviData();
  }, []);

  /** -----------------------------
   * ② 데스크탑 섹션 밝기 감지
   * ----------------------------- */
  useEffect(() => {
    if (isMobile) return;

    const sections = document.querySelectorAll("section[data-bg]");

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let minDistance = Infinity;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const rect = entry.boundingClientRect;
          const centerY = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = Math.abs(centerY - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            best = entry.target;
          }
        });

        if (best) {
          const bg = (best as HTMLElement).getAttribute("data-bg");
          setIsLightBg(bg === "light");
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMobile]);

  /** -----------------------------
   * 최종 헤더 스타일 계산
   * ----------------------------- */

  const headerBgClass = isMobile ? "bg-[#00000030]" : "";

  const textColorClass = isMobile
    ? "text-white"
    : isLightBg
    ? "text-black/70"
    : "text-white";

  const logoFilter = isMobile
    ? "invert(1)"
    : isLightBg
    ? "invert(0)"
    : "invert(1)";

  return (
    <header
      className={`${cls} ${headerBgClass} transition-all duration-300 flex-col lg:flex-row
        ${isMobile ? (showHeader ? "translate-y-0" : "-translate-y-full") : ""}`}
    >
      {/* 로고 */}
      <Link to="/" className="hd-logo">
        <img src={logo} alt="로고" style={{ filter: logoFilter }} />
      </Link>

      {/* 네비게이션 (데스크탑) */}
      <nav className="hd-nav py-sm hidden lg:block">
        <ul
          className={`hd-nav-list flex gap-6 md:gap-8 lg:gap-10 transition-colors duration-300 text-sm ${textColorClass}`}
        >
          {loading ? (
            <li>Loading...</li>
          ) : (
            navidata.map((item, idx) => (
              <li key={idx}>
                {item.link === "contact" ? (
                  <Link to="/contact" className="font-medium hover:opacity-60">
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={`#${item.link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollNavigation(item.link);
                    }}
                    className="font-medium hover:opacity-60"
                  >
                    {item.title}
                  </a>
                )}
              </li>
            ))
          )}
        </ul>
      </nav>

      {/* 네비게이션 (모바일) */}
      <nav className="hd-nav py-sm block lg:hidden">
        <ul
          className={`hd-nav-list gap-6 transition-colors duration-300 text-sm w-full flex justify-between ${textColorClass}`}
        >
          {loading ? (
            <li>Loading...</li>
          ) : (
            navidata.map((item, idx) => (
              <li key={idx}>
                {item.link === "contact" ? (
                  <Link to="/contact" className="font-medium hover:opacity-60">
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={`#${item.link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollNavigation(item.link);
                    }}
                    className="font-medium hover:opacity-60"
                  >
                    {item.title}
                  </a>
                )}
              </li>
            ))
          )}
        </ul>
      </nav>

      {/* 글로벌 버튼 */}
      <div className="hd-global lg:block hidden">
        <button
          type="button"
          className={`global-btn flex gap-2 font-bold transition-colors ${textColorClass}`}
          aria-label="언어 선택"
        >
          <img src={globalbtn} alt="글로벌" style={{ filter: logoFilter }} />
          KOR
        </button>
      </div>
    </header>
  );
};

export default Hd;

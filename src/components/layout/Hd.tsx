import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.svg";
import globalbtn from "../../assets/globalbtn.svg";

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

  /** 🌟 밝은 배경 감지 상태 */
  const [isLightBg, setIsLightBg] = useState(false);

  /** -----------------------------
   *  ① 네비게이션 데이터 로드
   * ----------------------------- */
  useEffect(() => {
    const fetchNaviData = async () => {
      try {
        const response = await axios.get("/promotion/db/navi.xml", {
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
   *  ② 부드러운 스크롤 이동
   * ----------------------------- */
  const handleScroll = (id: string) => {
    const cleanId = id.replace("/", "").trim().toLowerCase();

    requestAnimationFrame(() => {
      let target = document.getElementById(cleanId);

      if (!target) {
        setTimeout(() => {
          target = document.getElementById(cleanId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  };
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bgType = entry.target.getAttribute("data-bg");

            // data-bg="light" 일 때만 네비 색상 변경
            setIsLightBg(bgType === "light");
          }
        });
      },
      { threshold: 0.6 } // 60% 보일 때 적용
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`${cls} transition-colors duration-300`}>
      {/* 로고 */}
      <div className="hd-logo">
        <img src={logo} alt="로고" />
      </div>

      {/* 햄버거 버튼 */}
      <button className="hd-hamburger lg:hidden" aria-label="menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLightBg ? "black" : "white"}   // 🔥 밝은 배경이면 버튼 색상도 변경
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* 네비게이션 */}
      <nav className="hd-nav py-sm hidden lg:block">
        <ul
          className={`hd-nav-list flex gap-6 md:gap-8 lg:gap-10 
            transition-colors duration-300
            ${
              isLightBg
                ? "text-black/60" // 🔥 밝은 배경에서 어두운 글자
                : "text-white"     // 기본 흰색
            }
          `}
        >
          {loading ? (
            <li>Loading...</li>
          ) : (
            navidata.map((item, idx) => (
              <li key={idx}>
                {item.link === "contact" ? (
                  <Link
                    to="/contact"
                    className="font-medium hover:font-bold"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={`#${item.link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(item.link);
                    }}
                    className="font-medium hover:font-bold"
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
      <div className="hd-global">
        <button
          type="button"
          className={`global-btn flex gap-2 font-bold transition-colors
          ${isLightBg ? "text-black/70" : "text-white"}`}
          aria-label="언어 선택"
        >
          <img src={globalbtn} alt="글로벌" />
          KOR
        </button>
      </div>
    </header>
  );
};

export default Hd;

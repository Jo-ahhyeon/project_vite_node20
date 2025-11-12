import React, {useEffect, useState} from "react";
import axios from "axios";
import logo from '../../assets/logo.svg'
import globalbtn from '../../assets/globalbtn.svg'

interface NaviItem { //오브젝트 형태
  title: string; // key: value;
  link: string;
}

interface HdProps {
  cls : string;
}

const Hd: React.FC<HdProps> = ({ cls }) => {
  const [navidata, setNavi] = useState<NaviItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNaviData = async () => {
      try {
        const response = await axios.get('/promotion/db/navi.xml', {
          headers: { 'Content-Type': 'application/xml' }, // post는 {} 안에 값이 필수, get은 없어도 됨
        });

        const parser = new DOMParser(); // 생성자
        const xml = parser.parseFromString(response.data, 'application/xml');
        const items = Array.from(xml.getElementsByTagName('item'));

        const parsed = items.map((item) => ({
          title: item.getElementsByTagName('title')[0]?.textContent || '',
          link: item.getElementsByTagName('link')[0]?.textContent || '',
        }));

        setNavi(parsed); // setNavi가 navidata를 업데이트 하면서 리렌더링이 발생

      } catch (error) {
        console.error('Error fetching navigation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNaviData();
  }, []); // 1회 진행하겠다.

  return (
    <header className={cls}>
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
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* 네비게이션 */}
      <nav className="hd-nav py-sm">
        <ul className="hd-nav-list text-white flex gap-6 md:gap-8 lg:gap-10">
            { loading ?
              <li>Loading...</li> :
                navidata.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  className="text-white font-medium hover:font-bold transition-colors">
                  {item.title}
                </a>
              </li>
            ))}
        </ul>
      </nav>

        {/* 글로벌 버튼 */}
        <div className="hd-global">
          <button type="button" className="global-btn text-white flex gap-2 font-bold" aria-label="언어 선택">
            <img src={globalbtn} alt="글로벌" />
            KOR
          </button>
        </div>
    </header>
  );
};

export default Hd;

import footerlogo from "../../assets/svg/footerLogo.svg";
import footerlogo_m from "../../assets/svg/footerLogo_m.svg"
import instargram from "../../assets/svg/ico-instargram.svg";
import youtube from "../../assets/svg/ico-youtube.svg";
import blog from "../../assets/svg/ico-blog.svg";
import facebook from "../../assets/svg/ico-facebook.svg";
import Button from "../ui/Button";

export default function Ft() {

  return (
    <footer className={`p-8 lg:py-16 text-white w-full h-auto justify-between bg-main-primary flex flex-col items-center`}>
      {/* 데스크탑 */}
      <div className="hidden lg:flex items-center gap-sm w-full max-w-container-xl">
        <div className="flex flex-col justify-start w-full gap-md">
          <div className="text-white">
            <img src={footerlogo} alt="로고" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex text-sm gap-4">
            <a href="#" className="block hover:underline text-gray-300 font-bold">개인정보 처리 방침</a>
            <a href="#" className="block hover:underline text-gray-300">이용약관</a>
            <a href="#" className="block hover:underline text-gray-300">취소 및 환불 규정</a>
            <a href="#" className="block hover:underline text-gray-300">쿠키 설정</a>
            <a href="#" className="block hover:underline text-gray-300">오시는 길</a>
          </div>
          <div className="flex text-sm gap-4">
            <p className="text-gray-300">이메일 <a href="mailto:animora@annimora.co.kr" className="hover:underline">animora@annimora.co.kr</a></p>
            <span>|</span>
            <p className="text-gray-300">주소 경기도 여주구 지배구 가나다80번길 9(주)애니모라</p>
            <span>|</span>
            <p className="text-gray-300">대표자명 조아현 </p>
            <span>|</span> 
            <p className="text-gray-300">사업자번호: 123-45-67891</p>
          </div>
          <div className={`mt-12 pt-6 text-sm`}>
          <p>Copyright © 2025 ANIMORA HOTELS & VISIT CO. All rights reserved.</p>
          </div>
          </div>
          
          
        </div>
        <div className="flex flex-col justify-end gap-3">
          <div className="flex space-x-4 text-end gap-1">
            <a href="#" aria-label="Facebook" className={`transition-colors`}>
              <i className="fab fa-facebook-f"><img src={facebook} alt="로고" /></i>
            </a>
            <a href="#" aria-label="Instagram" className={`transition-colors`}>
              <i className="fab fa-instagram"><img src={instargram} alt="로고" /></i>
            </a>
            <a href="#" aria-label="YouTube" className={`transition-colors`}>
              <i className="fab fa-youtube"><img src={youtube} alt="로고" /></i>
            </a>
            <a href="#" aria-label="Blog" className={`transition-colors`}>
              <i className="fas fa-blog"><img src={blog} alt="로고" /></i>
            </a>
          </div>
          <div className="text-sm text-end">
            <a href="/CompanyInfo" className="font-semibold mb-3 text-lg text-white">Animora</a>
            <a href="#" className="block hover:underline text-gray-300">서비스 & 케어</a>
            <a href="#" className="block hover:underline text-gray-300">예약하기</a>
            <a href="#" className="block hover:underline text-gray-300">공지 사항</a>
            <p className="text-md font-bold">고객센터 1588-0000</p>
          </div>
          <Button variant="square" size="sm">
              사회 공헌 활동
            </Button>
        </div>
      </div>
      {/* 모바일 */}
      <div className="flex lg:hidden items-center gap-sm w-full max-w-container-xl">
        <div className="flex flex-col justify-center w-full gap-md">
          <div className="hd-logo w-full flex justify-center">
            <img src={footerlogo_m} alt="로고"/>
          </div>
          <div className="flex space-x-4 justify-center gap-1">
            <a href="#" aria-label="Facebook" className={`transition-colors`}>
              <i className="fab fa-facebook-f"><img className="w-7 h-7" src={facebook} alt="로고" /></i>
            </a>
            <a href="#" aria-label="Instagram" className={`transition-colors`}>
              <i className="fab fa-instagram"><img className="w-7 h-7" src={instargram} alt="로고" /></i>
            </a>
            <a href="#" aria-label="YouTube" className={`transition-colors`}>
              <i className="fab fa-youtube"><img className="w-7 h-7" src={youtube} alt="로고" /></i>
            </a>
            <a href="#" aria-label="Blog" className={`transition-colors`}>
              <i className="fas fa-blog"><img className="w-7 h-7" src={blog} alt="로고" /></i>
            </a>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 ">
          <div className="flex text-sm text-end font-bold gap-3">
            <a href="/CompanyInfo" className="text-white">Animora</a>
            <a href="#" className="block hover:underline text-gray-300">서비스 & 케어</a>
            <a href="#" className="block hover:underline text-gray-300">예약하기</a>
            <a href="#" className="block hover:underline text-gray-300">공지사항</a>
          </div>
          <Button variant="square" size="sm" className="w-full">
              사회 공헌 활동
          </Button>
        </div>

          <div className="flex flex-col h-full gap-4">
            <p className="text-md font-bold">고객센터 1588-0000</p>
            <div className="flex flex-col text-sm">
              <p className="text-gray-300">이메일 <a href="mailto:animora@annimora.co.kr" className="hover:underline">animora@annimora.co.kr</a></p>
              <p className="text-gray-300">주소 경기도 여주구 지배구 가나다80번길 9(주)애니모라</p>
              <p className="text-gray-300">대표자명 조아현 | 사업자번호: 123-45-67891 </p>
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex gap-3">
                <a href="#" className="block hover:underline text-gray-300 font-bold">개인정보 처리 방침</a>
                <a href="#" className="block hover:underline text-gray-300">이용약관</a>
              </div>
              <div className="flex gap-3">
                <a href="#" className="block hover:underline text-gray-300">취소 및 환불 규정</a>
                <a href="#" className="block hover:underline text-gray-300">쿠키 설정</a>
                <a href="#" className="block hover:underline text-gray-300">오시는 길</a>
              </div>
              
            </div>
            <div className={`text-[12px]`}>
            <p>Copyright © 2025 ANIMORA HOTELS & VISIT CO. All rights reserved.</p>
            </div>

          </div>
          
          
        </div>
        
      </div>
    </footer>
  );
}
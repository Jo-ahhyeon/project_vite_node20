import logo from "../assets/svg/logo.svg";
import footerlogo from "../assets/svg/footerLogo.svg";


export default function CompanyInfo() {
  return (
    <section className="relative max-w-container-xl mx-auto w-full flex flex-col items-end justify-center">
      <div className="absolute left-0 top-0"><h3 className="text-lg">Over View</h3></div>
      <div className="max-w-container-md flex flex-col w-full justify-center items-start">
        <div><h2 className="text-title text-main-primary font-medium lg:py-[150px]">What's the ANIMORA</h2></div>
       
        <div className="overview flex flex-col lg:gap-[60px] lg:py-[100px]">
          <h3 className="text-[40px] font-bold">
            Animora는 단순한 위탁 서비스가 아닙니다.
            <br />
            프리미엄급 시설과 전문 관리로 반려동물에게 최상의 경험을 선사합니다.
          </h3>
          <p className="text-sm" >Animora는 [설립년도]년에 설립되어 다양한 산업 분야에서 신뢰받는 파트너로 자리 잡았습니다. <br/>
            우리는 혁신적인 아이디어와 기술력을 바탕으로 고객의 성공적인 성장을 지원하며, 지속 가능한 미래를 만들어가고 있습니다.<br/>
            우리의 핵심 가치는 [핵심 가치 3가지, 예: 신뢰, 창의성, 지속 가능성]으로, 이를 통해 더 나은 세상을 만들어가는 데 기여하고자 합니다.
          </p>
          <div className="">
            <img src="/img/companyimg.jpg" alt="" />
          </div>
        </div>
        <div className="promise flex flex-col lg:gap-[120px] lg:py-[100px]">
          <h3 className="text-[40px] font-bold">
            Animora는 프리미엄 반려동물 케어를 약속하는 브랜드입니다.
          </h3>
          <div className="flex flex-col gap-8 border-l-4 lg:ps-[60px]">
            <div>
              <p className="text-lg text-main-primary font-bold">투명성 (확인 가능한 운영)</p>
              <p className="text-sm">항상 보여드리겠습니다.<br/>
                혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.</p>
            </div>
            <div>
              <p className="text-lg text-main-primary font-bold">투명성 (확인 가능한 운영)</p>
              <p className="text-sm">항상 보여드리겠습니다.<br/>
                혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.</p>
            </div>
            <div>
              <p className="text-lg text-main-primary font-bold">투명성 (확인 가능한 운영)</p>
              <p className="text-sm">항상 보여드리겠습니다.<br/>
                혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.</p>
            </div>
            <div>
              <p className="text-lg text-main-primary font-bold">투명성 (확인 가능한 운영)</p>
              <p className="text-sm">항상 보여드리겠습니다.<br/>
                혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.</p>
            </div>
            <div>
              <p className="text-lg text-main-primary font-bold">투명성 (확인 가능한 운영)</p>
              <p className="text-sm">항상 보여드리겠습니다.<br/>
                혹시나 하는 불안이 들지 않도록 직접 확인 가능한 운영으로 신뢰를 드리겠습니다.</p>
            </div>
            
          </div>
        </div>
      </div>
      <div className="rounded-t-50 overflow-hidden">
        <img src="/img/companyimg2.jpg" alt="" />
      </div>
      <div className="max-w-container-md flex flex-col w-full justify-center items-start">
        <div className="ci flex flex-col lg:gap-[100px] lg:py-[100px]">
          <div className="flex flex-col lg:gap-[60px]" >
            <h3 className="text-[40px] font-bold">
              우리의 비전과 가치를 담아낸 디자인,아이덴티티를 확인하세요.
            </h3>
              <p className="text-sm" >[기업명]의 CI는 우리의 철학과 가치를 시각적으로 표현한 결과물입니다. 로고는 곡선 형태를 통해 유연성과 창의성을 상징하며,
              컬러는 신뢰와 지속 가능성을 나타냅니다. 주 컬러인 파란색은 안정성과 신뢰를, 초록색은 자연과 지속 가능성을 상징합니다.
              또한, 모던한 산세리프 폰트를 사용하여 젊고 트렌디한 이미지를 강조했습니다.
              이 모든 요소는 [기업명]이 지향하는 비전과 정체성을 담고 있으며, 고객과의 소통과 신뢰를 위한 중요한 역할을 합니다.
            </p>
            <div className="flex gap-8">
              <div className="text-black border-2 border-black px-[50px] py-[50px]">
                <img src={logo} alt="로고" />
              </div>
              <div className="text-black border-2 border-black px-[50px] py-[50px]">
                <img src={footerlogo} alt="로고" />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:gap-[120px]">
            <h3 className="text-[40px] font-bold">
              Corporate Colors
            </h3>
            <div className="flex gap-6">
              <div className="bg-main-primary text-white flex flex-col justify-center p-16">
                <p className="text-sm">Main color</p>
                <p className="text-sm">#3C4A3E</p>
              </div>
              <div className="bg-main-primary text-white flex flex-col justify-center p-16">
                <p className="text-sm">Main color</p>
                <p className="text-sm">#3C4A3E</p>
              </div>
              <div className="bg-main-primary text-white flex flex-col justify-center p-16">
                <p className="text-sm">Main color</p>
                <p className="text-sm">#3C4A3E</p>
              </div>
            </div>
          
        </div>
        
        </div>
      </div>
      
    </section>
  )
}

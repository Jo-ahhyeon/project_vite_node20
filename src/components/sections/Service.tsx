import Button from "../ui/Button";

export default function Service() {
  return (
    <section className='flex flex-col lg:flex-row  w-full min-h-[600px]'>
      <div className='flex flex-col flex-1 bg-main-primary text-white justify-center items-center text-center gap-5 min-h-screen'>
        <div className='w-[275px] h-auto lg:w-[400px] lg:h-[450px] overflow-hidden' style={{borderRadius: '50% / 200px 200px 0 0' }}>
          <img src='/img/FAQ.jpg' alt='FAQ 목록 이미지' className='w-full h-full object-cover' />
        </div>
        <h3 className='text-sub font-semibold'>FAQ</h3>
        <div>
          <p className='text-sm'>고객님들이 자주 문의하는 질문과 답변을 한곳에 모았습니다.</p>
          <p className='text-sm'>빠르고 명확한 해결책을 확인하세요.</p>
        </div>
        <Button
            variant="outline"
            size="md"
            className="">
              자세히 보기
            </Button>
      </div>
      <div className='flex flex-col flex-1 min-h-screen'>
      
        <div className='flex-1 relative overflow-hidden flex items-center lg:items-start'>
          <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('/img/eco.jpg')" }}>
            <div className='absolute inset-0 bg-black opacity-30'></div>
          </div>
          <div className='relative flex flex-col justify-center items-start text-white p-xl h-full gap-5'>
            <h3 className='text-sub font-semibold'>애니모라 쇼핑몰</h3>
            <div>
              <p className='text-sm'>우리 아이가 먹는 사료, 간식 선택하기 힘드시죠?</p>
              <p className='text-sm'>애니모라 쇼핑몰에 방문하세요.</p>
            </div>
            <Button
            variant="outline"
            size="md"
            className="">
              쇼핑몰 바로가기
            </Button>
          </div>
        </div>
        <div className='flex-1 relative overflow-hidden flex items-center lg:items-start'>
          {/* 배경 이미지 컨테이너 */}
          <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('/img/service.jpg')" }}>
            {/* 이미지가 너무 밝아 텍스트 가독성이 떨어질 경우를 대비한 어두운 오버레이 */}
            <div className='absolute inset-0 bg-black opacity-40'></div> 
          </div>

          {/* 텍스트 컨텐츠 */}
          <div className='relative flex flex-col justify-center items-start text-white p-xl h-full gap-5'>
            <h3 className='text-sub font-semibold'>호텔 & 방문 서비스</h3>
            <div>
              <p className='text-sm'>쾌적하고 안전한 공간, 맞춤형 놀이와 훈련, 전문가의 케어.</p>
              <p className='text-sm'>어디서든 최고의 케어를 경험할 수 있습니다.</p>
            </div>
            <Button
            variant="outline"
            size="md"
            className="">
              서비스 소개 바로가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
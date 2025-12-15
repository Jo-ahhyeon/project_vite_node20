import { Link } from "react-router-dom";


export default function FullpageFt() {
  return (
    <footer className="flex lg:px-8 text-white pb-2">
      <div className="hidden lg:flex justify-between w-full">
        <div className="text-sm">
          <p>Copyright © 2025 ANIMORA HOTELS & VISIT CO. All rights reserved.</p>
        </div>
        <div className="flex gap-8 text-sm">
          <Link to="#" className="block hover:underline">오시는 길</Link>
          <Link to="#" className="block hover:underline">고객센터</Link>
        </div>
      </div>
       

      <div className="flex lg:hidden flex-col w-full items-center">
        <div className="flex gap-2 text-[12px]">
          <Link to="#" className="block hover:underline">오시는 길</Link>
          <Link to="#" className="block hover:underline">고객센터</Link>
        </div>
        <div className="flex text-[12px]">
          <p>Copyright © 2025 ANIMORA HOTELS & VISIT CO. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  )
}

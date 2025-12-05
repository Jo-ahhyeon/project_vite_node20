import { Link } from "react-router-dom";


export default function FullpageFt() {
  return (
    <div className="flex justify-between px-8 text-white pb-2">
       <div className="text-sm">
        <p>Copyright © 2025 ANIMORA HOTELS & VISIT CO. All rights reserved.</p>
      </div>
      <div className="flex gap-8 text-sm">
        <Link to="#" className="block hover:underline">오시는 길</Link>
        <Link to="#" className="block hover:underline">고객센터</Link>
      </div>
    
    </div>
   
  )
}

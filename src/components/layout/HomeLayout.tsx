import { Outlet } from "react-router-dom";
import Hd from './Hd';
import FullpageFt from './FullpageFt';

export default function HomeLayout() {
  return (
    <>
      <Hd cls="fixed top-0 start-0 w-full flex items-center justify-between  bg-light z-50
      py-3  lg:py-4 px-sm  md:px-md  lg:[padding-inline:clamp(1rem,4vw,80px)]  xl:px-xl"/>
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <Outlet />
      </div>
      <FullpageFt />
    </>
  );
}

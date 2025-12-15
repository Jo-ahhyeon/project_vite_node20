import { Outlet } from "react-router-dom";
import FullpageHd from './FullpageHd';
import FullpageFt from './FullpageFt';

export default function HomeLayout() {
  return (
    <>
      <FullpageHd cls="fixed top-0 start-0 w-full flex items-center justify-between  bg-light z-50
      py-3  lg:py-4 px-sm  md:px-md  lg:[padding-inline:clamp(1rem,4vw,80px)]  xl:px-xl"/>
      <div className="">
        <Outlet />
      </div>
      <FullpageFt />
    </>
  );
}

import React from 'react';
import { Outlet } from "react-router-dom";
import Hd from './Hd';
import Ft from './Ft';

interface LayoutProps {
    // children: React.ReactNode;
    id? : string;
}

const Layout: React.FC<LayoutProps> = ({ id }) => {
  return (
    <div className='layout-container' id={id}>
        <Hd cls="fixed top-0 start-0 w-full flex items-center justify-between  bg-light  z-50
      py-2 md:py-3  lg:py-4 px-sm  md:px-md  lg:[padding-inline:clamp(1rem,4vw,80px)]  xl:px-xl"/>
        <main>
            <Outlet />
        </main>
        <Ft />
    </div>
  );
};

export default Layout;
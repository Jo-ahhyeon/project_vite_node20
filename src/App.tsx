import { Routes, Route } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import BrandStory from "./pages/BrandStory";
import CompanyInfo from "./pages/CompanyInfo";
import CSR from "./pages/CSR";

export default function App() {
  return (
    <Routes>
      {/* HOME — 풀페이지 스크롤 */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 일반 스크롤 페이지 */}
      <Route element={<Layout />}>
        <Route path="/brandstory" element={<BrandStory />} />
        <Route path="/companyinfo" element={<CompanyInfo />} />
        <Route path="/csr" element={<CSR />} />
      </Route>
    </Routes>
  );
}


 
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import BrandStory from "./pages/BrandStory";
import CompanyInfo from "./pages/CompanyInfo";
import CSR from "./pages/CSR";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="brandstory" element={<BrandStory />} />
        <Route path="companyinfo" element={<CompanyInfo />} />
        <Route path="csr" element={<CSR />} />
      </Route>
    </Routes>
  );
}
export default App;


 
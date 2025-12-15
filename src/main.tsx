import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

import './index.css';
import App from './App.tsx';

const BASENAME = import.meta.env.PROD ? "/animora" : "/";

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
    <ScrollToTop />
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
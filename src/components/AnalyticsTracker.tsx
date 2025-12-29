import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    wcs?: () => void;
    wcs_do?: () => void;
  }
}

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.wcs_do) {
      window.wcs_do();
    }
  }, [location.pathname]);

  return null;
}

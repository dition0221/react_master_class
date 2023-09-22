// 웹페이지의 width를 추적하는 Hook

import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return width;
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

export default useWindowDimensions;

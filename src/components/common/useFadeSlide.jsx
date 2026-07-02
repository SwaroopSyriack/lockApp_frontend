import { useState, useEffect } from "react";

export function useFadeSlide({ delay = 0, y = 20, duration = 500 } = {}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : `translateY(${y}px)`,
    transition: `all ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  };
}
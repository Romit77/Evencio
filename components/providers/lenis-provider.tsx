"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    console.log("Lenis initialized:", lenis);

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      console.log("Lenis destroyed");
    };
  }, []);

  return <>{children}</>;
};

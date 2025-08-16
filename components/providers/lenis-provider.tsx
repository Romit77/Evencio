"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

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

    lenis.on("scroll", (e: any) => {
      console.log("Lenis scroll:", e.scroll);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      console.log("Lenis destroyed");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

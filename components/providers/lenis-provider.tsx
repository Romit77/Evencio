"use client";

import { useEffect, useRef } from "react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");

        document.documentElement.classList.add("lenis");

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          wrapper: window,
          content: document.documentElement,
          wheelMultiplier: 1,
          gestureOrientation: "vertical",
          lerp: 0.1,
        });

        lenisRef.current = lenis;

        console.log("Lenis initialized successfully:", lenis);

        const raf = (time: number) => {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
            rafRef.current = requestAnimationFrame(raf);
          }
        };

        rafRef.current = requestAnimationFrame(raf);

        setTimeout(() => {
          console.log("Testing Lenis scroll...");
          lenis.scrollTo(100, { duration: 1 });
        }, 1000);
      } catch (error) {
        console.error("Failed to initialize Lenis:", error);
      }
    };

    initLenis();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove("lenis");
      console.log("Lenis destroyed");
    };
  }, []);

  return <>{children}</>;
};

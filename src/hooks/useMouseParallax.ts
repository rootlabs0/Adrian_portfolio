"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * Returns normalised mouse position [-1, 1] relative to the viewport centre.
 * Uses requestAnimationFrame throttle for 60fps performance.
 */
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 → 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setPos({ x, y });
  }, []);

  useEffect(() => {
    let raf: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => handleMove(e));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [handleMove]);

  return pos;
}

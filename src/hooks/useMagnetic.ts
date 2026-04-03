"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

const SPRING = { damping: 15, stiffness: 250, mass: 0.4 };

/**
 * Magnetic hover - element subtly follows the cursor within its bounds.
 * Returns { ref, x, y, handlers } to attach to the element.
 */
export function useMagnetic(strength = 0.35): {
  ref: React.RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
  };
} {
  const ref = useRef<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    },
    [rawX, rawY, strength],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, handlers: { onMouseMove, onMouseLeave } };
}

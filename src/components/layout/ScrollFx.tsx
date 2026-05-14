"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Site-wide GSAP scroll effects.
 *
 *   data-fade-out      → fades + drifts up as the element exits the viewport.
 *   data-fade-out-slow → same, but kicks in earlier and is more pronounced.
 *   data-gsap-rise     → gentle rise + fade-in when the element enters view.
 *
 * All effects respect prefers-reduced-motion.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── Enter (rise + fade-in) ── */
      gsap.utils.toArray<HTMLElement>("[data-gsap-rise]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── Fade-out as section leaves ── */
      gsap.utils.toArray<HTMLElement>("[data-fade-out]").forEach((el) => {
        gsap.to(el, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 15%",
            end: "bottom -10%",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-fade-out-slow]").forEach((el) => {
        gsap.to(el, {
          opacity: 0,
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 35%",
            end: "bottom 0%",
            scrub: true,
          },
        });
      });
    });

    /* Recompute after layout settles + on resize */
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 250);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

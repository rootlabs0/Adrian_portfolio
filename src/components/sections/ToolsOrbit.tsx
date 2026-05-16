"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { getImagePath } from "@/lib/image-path";

const TOOLS = [
  { name: "GitHub",   src: "/logos/logo1.webp" },
  { name: "Claude",   src: "/logos/logo2.webp" },
  { name: "Affinity", src: "/logos/logo3.webp" },
  { name: "Figma",    src: "/logos/logo4.webp" },
  { name: "Firebase", src: "/logos/logo5.webp" },
  { name: "Supabase", src: "/logos/logo6.webp" },
];

const COUNT = TOOLS.length;
// Orbit radius in px
const RADIUS = 200;

export default function ToolsOrbit() {
  const trackRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef   = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.querySelectorAll<HTMLDivElement>("[data-orbit-item]"));

    const tick = () => {
      if (!pausedRef.current) {
        angleRef.current += 0.004; // radians per frame
      }
      items.forEach((el, i) => {
        const theta = angleRef.current + (i / COUNT) * Math.PI * 2;
        const x = Math.cos(theta) * RADIUS;
        const z = Math.sin(theta) * RADIUS;
        // Slight vertical tilt (15°)
        const tilt = 0.26; // ~15deg in radians
        const y = Math.sin(theta) * RADIUS * Math.sin(tilt);
        // Scale & opacity based on z depth
        const depth = (z + RADIUS) / (RADIUS * 2); // 0 (back) → 1 (front)
        const scale = 0.55 + depth * 0.55;
        const opacity = 0.3 + depth * 0.7;
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        el.style.opacity   = String(opacity);
        el.style.zIndex    = String(Math.round(depth * 100));
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-6 text-center">
          <p className="mb-3 font-mono text-[0.75rem] tracking-[0.3em] uppercase text-foreground/40">
            The Stack
          </p>
          <h2 className="font-extrabold leading-[0.9] tracking-tighter text-[clamp(2.8rem,7vw,5.5rem)] text-white">
            Software I Use
          </h2>
        </div>

        {/* Orbit stage */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ width: "100%", height: "min(60vh, 520px)" }}
        >
          {/* Subtle elliptical guide ring */}
          <div
            className="pointer-events-none absolute rounded-[50%] border border-white/5"
            style={{
              width:  RADIUS * 2 + 80,
              height: (RADIUS * 2 + 80) * 0.28,
              transform: "translateY(0px)",
            }}
          />

          {/* Items track — centred, perspective gives 3D depth */}
          <div
            ref={trackRef}
            className="relative"
            style={{
              width: 0,
              height: 0,
              perspective: 900,
              transformStyle: "preserve-3d",
            }}
          >
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                data-orbit-item
                className="absolute flex flex-col items-center gap-2"
                style={{
                  width: 90,
                  height: 90,
                  marginLeft: -45,
                  marginTop: -45,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl bg-white/8 backdrop-blur-sm"
                  style={{
                    width: 72,
                    height: 72,
                    boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Image
                    src={getImagePath(tool.src)}
                    alt={tool.name}
                    width={44}
                    height={44}
                    className="rounded-lg object-contain"
                    style={{ width: 44, height: 44 }}
                  />
                </div>
                <span
                  className="font-mono text-[0.6rem] tracking-widest uppercase text-foreground/50"
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

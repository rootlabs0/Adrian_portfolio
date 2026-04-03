"use client";

import { motion } from "motion/react";
import PillButton from "@/components/ui/PillButton";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import Image from "next/image";
import { useMemo } from "react";

/* ── Catmull-Rom → cubic Bézier closed-path generator ── */
function blobPath(
  cx: number,
  cy: number,
  baseR: number,
  amp: number,
  bumps: number,
  segs: number,
) {
  const pts: [number, number][] = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    const r = baseR + amp * Math.cos(bumps * a);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const n = pts.length;
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(
      p1[1] +
      (p2[1] - p0[1]) / 6
    ).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(
      p2[1] -
      (p3[1] - p1[1]) / 6
    ).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

export default function Hero() {
  const mouse = useMouseParallax();
  const circle = useMemo(() => blobPath(190, 190, 170, 0, 0, 64), []);
  const wavy = useMemo(() => blobPath(190, 190, 170, 8, 12, 64), []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 pt-24 pb-12 lg:grid lg:min-h-screen lg:grid-cols-5 lg:items-center lg:gap-12 lg:pt-0 lg:pb-0">
        {/* ── Left column: text ── */}
        <div className="w-full text-center lg:col-span-3 lg:text-left mb-8 lg:mb-0">
          {/* Name with parallax */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-tighter"
          >
            <motion.span
              className="block lg:-ml-2"
              style={{ x: mouse.x * 5, y: mouse.y * 3 }}
            >
              Adrian
            </motion.span>
            <motion.span
              className="block text-accent font-display italic ml-6 sm:ml-12"
              style={{ x: mouse.x * -7, y: mouse.y * -4 }}
            >
              Edwards
            </motion.span>
          </motion.h1>

          {/* CTAs - hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 hidden lg:flex justify-start gap-4"
          >
            <PillButton href="#projects" variant="gradient">
              See my work
            </PillButton>
            <PillButton href="#contact" variant="ghost">
              Say hello
            </PillButton>
          </motion.div>
        </div>

        {/* ── Right column: avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:col-span-2"
        >
          {/* Morphing blob - animates between circle and wavy scallop */}
          <svg
            className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-[55%] w-[280px] h-[280px] lg:w-[340px] lg:h-[340px]"
            viewBox="0 0 380 380"
          >
            <motion.path
              d={circle}
              animate={{ d: [circle, wavy, circle] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              fill="var(--accent)"
            />
          </svg>

          {/* Avatar */}
          <Image
            src="/Adrian_avatar.png"
            alt="Adrian Edwards"
            width={320}
            height={320}
            priority
            className="relative z-10 w-56 h-56 lg:w-80 lg:h-80 object-cover"
          />
        </motion.div>

          {/* CTAs - visible on mobile only, below avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 lg:hidden"
        >
          <PillButton href="#projects" variant="gradient">
            See my work
          </PillButton>
          <PillButton href="#contact" variant="ghost">
            Say hello
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}

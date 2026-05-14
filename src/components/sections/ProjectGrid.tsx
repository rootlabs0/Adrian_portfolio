"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import PillButton from "@/components/ui/PillButton";
import Image from "next/image";
import RLBusinessCard from "@/components/ui/RLBusinessCard";
import { ContainerScroll } from "@/components/ui/ContainerScrollAnimation";

/* Deterministic pseudo-random */
function seeded(seed: number): number {
  const n = Math.sin(seed * 127.1) * 43758.5453;
  return n - Math.floor(n);
}

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          data-fade-out
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/30"
        >
          Selected Work
        </motion.p>

        {/* ═══════════════════════════════════════════
            01 — ROOT LABS
            3D business card with wallet scroll-out
            and hover tilt effect.
            ═══════════════════════════════════════════ */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <RLBusinessCard />
        </motion.article>

        {/* ═══════════════════════════════════════════
            THE GOAL — standalone motto section
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="my-36 py-20 flex flex-col items-center text-center"
        >
          <p className="font-mono text-sm tracking-wide text-foreground/60">
            the goal:
          </p>
          <p className="mt-4 whitespace-nowrap text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.1] tracking-tight">
            <span className="text-foreground/15">&ldquo;</span>
            <span className="text-foreground">build </span>
            <CoolStretch />
            <span className="text-foreground"> sh*t</span>
            <span className="text-foreground/15">&rdquo;</span>
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            02 — TEAMSTER
            Monitor-arm showcase with scroll animation.
            ═══════════════════════════════════════════ */}
        <TeamsterSection />

        {/* ═══════════════════════════════════════════
            03 — SQUARESHARE
            Digital artifact collections platform.
            Black/white minimal design with cube pattern.
            ═══════════════════════════════════════════ */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 relative"
        >
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Visual - Isometric cube pattern */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <SquareSharePattern />
            </motion.div>

            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 h-10 w-10 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="1" y="1" width="8" height="8" rx="1.5" fill="#000" />
                      <rect x="13" y="1" width="8" height="8" rx="1.5" fill="#000" opacity="0.4" />
                      <rect x="1" y="13" width="8" height="8" rx="1.5" fill="#000" opacity="0.4" />
                      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#000" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      SquareShare
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/25">
                      Founder &middot; Product Dev &middot; Designer
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base leading-[1.8] text-foreground/50"
              >
                A digital album for your most valued artifacts. Drag, drop,
                and arrange objects into customizable grid collections -
                public or private. Minimal by design so the objects speak
                for themselves. Nested collections, messaging, and a
                built-in storefront are on the roadmap.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-5 flex items-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-foreground/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  In Development
                </span>
              </motion.div>
            </div>
          </div>
        </motion.article>


      </div>
    </section>
  );
}

/* ─── TeamsterX section — layered image cards, text left ─── */
function TeamsterSection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-32 relative"
    >
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

        {/* Text — left */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0 h-10 w-10 overflow-hidden rounded-lg">
                <Image
                  src="/favicon-circle.webp"
                  alt="TeamsterX"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  TeamsterX
                </h3>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/25">
                  Lead Product Developer
                </p>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base leading-[1.8] text-foreground/50"
          >
            Scaling human effort through better systems. I lead product
            development on Teamster, a collaborative platform for internal
            communication and organization. Real-time task boards, role-based
            access, clear information architecture. Built for teams that need
            clarity in execution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-6"
          >
            <PillButton href="https://app.teamsterx.com" variant="gradient">
              Visit TeamsterX
            </PillButton>
          </motion.div>
        </div>

        {/* Visual — right, layered image cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-square max-w-[460px] mx-auto rounded-2xl overflow-visible">
            {/* Back frame */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-10 overflow-hidden"
              style={{
                top: "44%",
                right: "2%",
                width: "75%",
                aspectRatio: "16 / 10",
                boxShadow: "0 18px 30px -8px rgba(0,0,0,0.35)",
                borderRadius: "16px",
              }}
            >
              <Image
                src="/teamster2.webp"
                alt="TeamsterX dashboard"
                fill
                sizes="240px"
                className="object-cover object-right-bottom"
              />
            </motion.div>

            {/* Floating UI component — coded card */}
            <motion.div
              initial={{ opacity: 0, y: 12, rotate: 12 }}
              whileInView={{ opacity: 1, y: 0, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="absolute z-30 cursor-pointer select-none"
              style={{
                top: "0%",
                right: "-6%",
                width: "32%",
                transformOrigin: "center",
                boxShadow: "0 16px 32px -8px rgba(0,0,0,0.55)",
                borderRadius: "16px",
                background: "#ffffff",
                padding: "10px",
              }}
            >
              {/* Top row: icon + menu */}
              <div className="flex items-start justify-between mb-2">
                <div style={{ background: "#e8f0fe", borderRadius: "8px", padding: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#4285f4"/>
                    <path d="M14 2v6h6" fill="#a8c7fa"/>
                    <path d="M8 13h8M8 17h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="1.5" fill="#5f6368"/>
                  <circle cx="12" cy="12" r="1.5" fill="#5f6368"/>
                  <circle cx="12" cy="19" r="1.5" fill="#5f6368"/>
                </svg>
              </div>
              {/* Title */}
              <p style={{ fontWeight: 700, fontSize: "12px", color: "#202124", marginBottom: "4px", lineHeight: 1.3 }}>
                Products
              </p>
              {/* Body */}
              <p style={{ fontSize: "9px", color: "#5f6368", lineHeight: 1.4, marginBottom: "8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                This document outlines the Root Labs portfolio. Projects are classified as eithe
              </p>
              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#5f6368" strokeWidth="2"/>
                  <path d="M12 7v5l3 3" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: "9px", color: "#5f6368" }}>Feb 14</span>
              </div>
            </motion.div>

            {/* Front frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-20 overflow-hidden"
              style={{
                top: "12%",
                left: "10%",
                width: "70%",
                aspectRatio: "16 / 12",
                boxShadow: "0 24px 40px -10px rgba(0,0,0,0.45)",
                borderRadius: "16px",
              }}
            >
              <Image
                src="/teamster.webp"
                alt="TeamsterX dashboard"
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* ─── SquareShare isometric cube pattern ─── */
/* (ShieldCircleArt removed — replaced by hero image) */

/* ─── SquareShare visual: image frames + "+ New Artifact" tag + hopping pixels ─── */
// Grid is centered in the container square, width 82%.
// Height = width * (ROWS/COLS). These match the inline styles below.
const SQ_COLS = 40;
const SQ_ROWS = 32;
const SQ_TOTAL = SQ_COLS * SQ_ROWS;
const SQ_GRID_WIDTH = 0.82;
const SQ_GRID_HEIGHT = SQ_GRID_WIDTH * (SQ_ROWS / SQ_COLS);
const SQ_GRID_LEFT = (1 - SQ_GRID_WIDTH) / 2;
const SQ_GRID_TOP = (1 - SQ_GRID_HEIGHT) / 2;

/** Normalized (0–1) container position of slot center */
function slotCenter(slot: number) {
  const col = slot % SQ_COLS;
  const row = Math.floor(slot / SQ_COLS);
  return {
    x: SQ_GRID_LEFT + ((col + 0.5) / SQ_COLS) * SQ_GRID_WIDTH,
    y: SQ_GRID_TOP + ((row + 0.5) / SQ_ROWS) * SQ_GRID_HEIGHT,
  };
}

/** Pick a slot from `candidates` weighted toward cursor (cx, cy in 0–1 container coords) */
function pickWeighted(candidates: number[], cx: number, cy: number): number {
  const weights = candidates.map((slot) => {
    const { x, y } = slotCenter(slot);
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    return 1 / (dist + 0.01); // larger radius of effect
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

function SquareSharePattern() {
  const INITIAL = [5, 14, 22, 33, 41, 57, 68, 79, 91, 103, 115, 127, 139, 152, 164, 176, 189, 201, 214, 227, 239, 251, 265, 278, 290, 303, 316, 329, 341, 355, 368, 380, 393, 407, 420, 433, 446, 458, 472, 485, 499, 512, 525, 538, 551, 565, 578, 591, 604, 618, 631, 645, 658, 671, 685, 698, 712, 726, 739, 753, 767, 780, 794, 808, 821, 835, 849, 862, 876, 890, 904, 917, 931, 945, 959, 973, 987, 1001, 1015, 1029, 1043, 1057, 1071, 1085, 1099, 1113, 1127, 1141, 1155, 1169, 1183, 1197, 1211, 1225, 1239, 1253, 1267, 1281, 1295, 1309, 1323, 1337, 1351, 1365, 1379, 1393, 1407, 1421, 1435, 1449, 1463, 1477, 1491, 1505, 1519, 1533, 1547, 1561, 1575, 1589, 1603, 1617, 1631, 1645, 1659, 1673, 1687, 1701, 1715, 1729, 1743, 1757, 1771, 1785, 1799, 1813, 1827, 1841, 1855, 1869, 1883, 1897, 1911, 1925, 1939, 1953, 1967, 1981, 1995, 2009, 2023, 2037, 2051, 2065, 2079, 2093, 2107, 2121, 2135, 2149, 2163, 2177, 2191, 2205, 2219, 2233, 2247, 2261, 2275];
  const [pixels, setPixels] = useState<number[]>(INITIAL);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorPos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  // Jump 5 random pixels toward cursor (on container hover)
  const hopAll = useCallback(() => {
    const { x: cx, y: cy } = cursorPos.current;
    setPixels((prev) => {
      const empty = Array.from({ length: SQ_TOTAL }, (_, i) => i).filter(
        (i) => !prev.includes(i)
      );
      if (empty.length === 0) return prev;
      // Pick 5 random pixels to move
      const indicesToMove = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * prev.length)
      );
      const next = [...prev];
      for (const idx of indicesToMove) {
        const toSlot = pickWeighted(empty, cx, cy);
        next[idx] = toSlot;
        empty.splice(empty.indexOf(toSlot), 1);
      }
      return next;
    });
  }, []);

  // Jump ONE pixel, weighted toward its current position
  const hopOne = useCallback((pixelIdx: number) => {
    setPixels((prev) => {
      const currentSlot = prev[pixelIdx];
      const { x: px, y: py } = slotCenter(currentSlot);
      const empty = Array.from({ length: SQ_TOTAL }, (_, i) => i).filter(
        (i) => !prev.includes(i)
      );
      if (empty.length === 0) return prev;
      const toSlot = pickWeighted(empty, px, py);
      const next = [...prev];
      next[pixelIdx] = toSlot;
      return next;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[460px] mx-auto rounded-2xl overflow-hidden"
      style={{ background: "transparent" }}
      onMouseEnter={hopAll}
      onMouseMove={handleMouseMove}
    >
      {/* ── "+ New Artifact" floating tag ── */}
      <motion.div
        initial={{ opacity: 0, y: -12, rotate: -12 }}
        whileInView={{ opacity: 1, y: 0, rotate: -12 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ rotate: -8, scale: 1.05 }}
        className="absolute top-[6%] left-[28%] z-30 cursor-pointer select-none"
        style={{ transformOrigin: "center" }}
      >
        <div
          className="text-black px-3.5 py-1.5 text-[13px] font-medium tracking-tight"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          }}
        >
          + New Artifact
        </div>
      </motion.div>

      {/* ── Background frame (squareshare2, behind & right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 0 }}
        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10 overflow-hidden"
        style={{
          top: "44%",
          right: "2%",
          width: "60%",
          aspectRatio: "16 / 10",
          boxShadow: "0 18px 30px -8px rgba(0,0,0,0.18)",
        }}
      >
        <Image
          src="/squareshare2.webp"
          alt="SquareShare screenshot 2"
          fill
          sizes="200px"
          className="object-cover"
        />
      </motion.div>

      {/* ── Main frame (squareshare1, front-center) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-20 overflow-hidden"
        style={{
          top: "12%",
          left: "10%",
          width: "70%",
          aspectRatio: "16 / 10",
          boxShadow: "0 24px 40px -10px rgba(0,0,0,0.22)",
        }}
      >
        <Image
          src="/squareshare1.webp"
          alt="SquareShare screenshot 1"
          fill
          sizes="240px"
          className="object-cover"
        />
      </motion.div>

      {/* ── Hopping pixels grid (centered, behind elements) ── */}
      <div
        className="absolute z-0"
        style={{
          top: `${SQ_GRID_TOP * 100}%`,
          left: `${SQ_GRID_LEFT * 100}%`,
          width: `${SQ_GRID_WIDTH * 100}%`,
          aspectRatio: `${SQ_COLS} / ${SQ_ROWS}`,
          display: "grid",
          gridTemplateColumns: `repeat(${SQ_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${SQ_ROWS}, 1fr)`,
        }}
      >
        {pixels.map((slot, pixelIdx) => {
          const col = slot % SQ_COLS;
          const row = Math.floor(slot / SQ_COLS);
          return (
            <div
              key={slot}
              onMouseEnter={() => hopOne(pixelIdx)}
              style={{
                gridColumnStart: col + 1,
                gridRowStart: row + 1,
                background: "#a1c5ff",
                opacity: 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── "cool" rubber-band stretch animation ─── */
function CoolStretch() {
  const [oCount, setOCount] = useState(2);
  const [deform, setDeform] = useState({ sx: 1, sy: 1 });
  const started = useRef(false);
  const animating = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const playAnimation = useCallback((delay = 0) => {
    if (animating.current) return;
    animating.current = true;
    setTimeout(() => {
      const totalDuration = 1200;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / totalDuration, 1);

        const bell = Math.sin(t * Math.PI);
        const count = Math.round(2 + bell * 4);
        setOCount(count);

        const sx = 1 + 0.45 * bell + Math.sin(t * Math.PI * 5) * 0.1 * (1 - t);
        const sy = 1 - 0.2 * bell;
        setDeform({ sx, sy });

        if (t < 1) requestAnimationFrame(animate);
        else { setOCount(2); setDeform({ sx: 1, sy: 1 }); animating.current = false; }
      };
      requestAnimationFrame(animate);
    }, delay);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          playAnimation(1400);
        }
      },
      { threshold: 0.7 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playAnimation]);

  return (
    <span ref={ref} className="text-accent font-display italic cursor-pointer" onMouseEnter={() => playAnimation()}>
      c
      {Array.from({ length: oCount }).map((_, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: `scaleX(${deform.sx}) scaleY(${deform.sy})`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          o
        </span>
      ))}
      l
    </span>
  );
}

/* ─── Reusable type-in animation ─── */
function TypeIn({
  text,
  speed = 55,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const id = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(id);
              setTimeout(() => setDone(true), 600);
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!done && (
        <span className="animate-pulse" style={{ opacity: displayed.length ? 1 : 0 }}>|</span>
      )}
    </span>
  );
}

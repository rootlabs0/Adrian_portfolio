"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/* ── logos for the 16y bubble carousel ── */
const projectBubbles = [
  { src: "/Rootlabs-logo-xbg.webp", alt: "Root Labs", imgSize: 52, bg: "bg-white" },
  { src: "/favicon-circle.webp", alt: "TeamsterX", imgSize: 52, bg: "bg-white" },
  { src: "/HackME-logo.webp", alt: "HackME", imgSize: 36, bg: "bg-[#1a1a1a]" },
  { src: "/Lomnice.webp", alt: "Lomnice", imgSize: 28, bg: "bg-white" },
  { src: null, alt: "?", imgSize: 0, bg: "bg-white" },
];

export default function AboutMe() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.5", "end 0.5"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative py-32 overflow-x-hidden">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl"
        >
          Adrian<span className="text-accent">.</span>
        </motion.h2>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-2xl"
        >
          <p className="text-lg leading-[1.75] text-foreground/55">
            Whether it&apos;s a product lab, a cybersecurity platform, or
            a collaborative tool, I operate on the same principle: clarity
            in design, speed in execution, quality in output. Root Labs is
            where that philosophy lives.
          </p>
          <p className="mt-5 text-lg leading-[1.75] text-foreground/55">
            Physical engineering is a complementary discipline. My core
            focus is building end-to-end digital products that solve real
            problems for real users. Move fast, build things that work.
          </p>
        </motion.div>

        {/* ── Centered Vertical Timeline ── */}
        <div ref={timelineRef} className="relative mx-auto mt-28 max-w-4xl">
          {/*
            The first row has pt-0 → its dot is at the very top.
            The last row has pb-0  → its dot is at the very bottom.
            We position the track line from the first dot center to the last dot center.
            Dot is h-8 (2rem) → center = 1rem from its top edge.
            First dot top = 0 (pt-0) + centering via items-center → dot center ≈ row midpoint.
            But since we removed padding on first/last, the dot IS the edge.
            So we just match the line to the dot centers exactly.
          */}

          {/* The track + fill are inside a wrapper that spans the full timeline height
              but we clip them via the dot positions using a simple approach:
              the line spans the full height of the container, and the dots (z-10)
              visually cap both ends. */}

          {/* Track (dim) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-foreground/10" />
          {/* Fill (accent, scroll-driven) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] rounded-full bg-accent origin-top"
            style={{ height: fillHeight }}
          />

          {/* ── 13y ── */}
          <TimelineRow index={0} first>
            <div className="text-right max-sm:text-left">
              <span className="font-mono text-sm sm:text-base tracking-widest uppercase" style={{ color: 'rgba(237,237,237,0.65)' }}>
                13y
              </span>
              <p className="mt-1 text-2xl sm:text-4xl font-bold leading-snug text-foreground/85">
                First <span className="text-accent font-bold">website</span>
              </p>
              <p className="mt-2 text-sm sm:text-base max-w-xs text-right max-sm:text-left max-sm:ml-0 max-sm:max-w-none ml-auto" style={{ color: 'rgba(237,237,237,0.7)' }}>
                HTML, CSS and a dream. My first real project - a static site
                built from scratch.
              </p>
            </div>
            <div className="text-left">
              <p className="text-2xl sm:text-4xl font-semibold text-foreground/12">(It sucked)</p>
            </div>
          </TimelineRow>

          {/* ── 14y ── */}
          <TimelineRow index={1}>
            <div className="flex justify-end max-sm:justify-start">
              <Image
                src="/Pliers-icon.png"
                alt="Pliers"
                width={480}
                height={480}
                className="object-contain w-24 sm:w-60 lg:w-[480px]"
              />
            </div>
            <div className="text-left">
              <span className="font-mono text-sm sm:text-base tracking-widest uppercase" style={{ color: 'rgba(237,237,237,0.65)' }}>
                14y
              </span>
              <p className="mt-1 text-2xl sm:text-4xl font-bold leading-snug text-foreground/85">
                Built my first{" "}
                <span className="text-accent font-bold">drone</span>
              </p>
              <p className="mt-2 text-sm sm:text-base max-w-xs" style={{ color: 'rgba(237,237,237,0.7)' }}>
                Soldering, wiring, crashing - repeat. Hand-built FPV quad
                from raw components.
              </p>
            </div>
          </TimelineRow>

          {/* ── 15y ── */}
          <TimelineRow index={2}>
            <div className="text-right max-sm:text-left">
              <span className="font-mono text-sm sm:text-base tracking-widest uppercase" style={{ color: 'rgba(237,237,237,0.65)' }}>
                15y
              </span>
              <p className="mt-1 text-2xl sm:text-4xl font-bold leading-snug text-foreground/85">
                Founded{" "}
                <span className="text-accent font-bold">Root Labs</span>
              </p>
              <p className="mt-2 text-sm sm:text-base max-w-xs text-right max-sm:text-left max-sm:ml-0 max-sm:max-w-none ml-auto" style={{ color: 'rgba(237,237,237,0.7)' }}>
                A product studio focused on building tools that solve real
                problems - fast.
              </p>
            </div>
            <div className="flex justify-start items-center">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
                  <Image
                    src="/rootlabs-favicon.webp"
                    alt="Root Labs"
                    width={48}
                    height={48}
                    className="object-contain w-8 sm:w-11"
                  />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-foreground/85 leading-tight">Root Labs</p>
                  <p className="text-xs sm:text-sm font-mono tracking-wide" style={{ color: 'rgba(237,237,237,0.45)' }}>est. 2025</p>
                </div>
              </div>
            </div>
          </TimelineRow>

          {/* ── 16y ── */}
          <TimelineRow index={3} last>
            {/* Bubble carousel */}
            <div className="flex justify-end max-sm:justify-start">
              <BubbleCarousel />
            </div>
            <div className="text-left">
              <span className="font-mono text-sm sm:text-base tracking-widest uppercase" style={{ color: 'rgba(237,237,237,0.65)' }}>
                16y
              </span>
              <p className="mt-1 text-2xl sm:text-4xl font-bold leading-snug text-foreground/85">
                <span className="text-accent font-bold">9+ Projects</span>{" "}
                completed
              </p>
            </div>
          </TimelineRow>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* BubbleCarousel - flat horizontal, center-scaled             */
/* ─────────────────────────────────────────────────────────── */
function BubbleCarousel() {
  const count = projectBubbles.length;
  const [offset, setOffset] = useState(0);
  const containerW = 288; // sm:w-72 = 288px
  const half = containerW / 2;

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const speed = 0.03;
    const step = (ts: number) => {
      if (start === null) start = ts;
      setOffset((ts - start) * speed);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gap = 64;
  const totalWidth = count * gap;

  return (
    <div className="relative flex items-center justify-center h-24 w-56 sm:h-28 sm:w-72 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-base to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-base to-transparent pointer-events-none" />
      {projectBubbles.map((b, i) => {
        const rawX = (i * gap - offset % totalWidth + totalWidth) % totalWidth;
        const x = rawX - totalWidth / 2 + gap / 2;
        // Distance from center (0 = center, 1 = edge)
        const dist = Math.min(Math.abs(x) / half, 1);
        const scale = 1 - dist * 0.45; // 1.0 center → 0.55 edge
        const opacity = 1 - dist * 0.6; // 1.0 center → 0.4 edge

        return (
          <div
            key={b.alt}
            className={`absolute rounded-full ${b.bg} flex items-center justify-center overflow-hidden shadow-md`}
            style={{
              width: 56,
              height: 56,
              left: "50%",
              transform: `translateX(${x - 28}px) scale(${scale})`,
              opacity,
            }}
          >
            {b.src ? (
              <Image
                src={b.src}
                alt={b.alt}
                width={b.imgSize}
                height={b.imgSize}
                className="object-contain"
              />
            ) : (
              <span className="text-xs font-bold text-foreground/30">?</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* TimelineRow                                                 */
/* ─────────────────────────────────────────────────────────── */
function TimelineRow({
  children,
  index,
  first,
  last,
}: {
  children: [React.ReactNode, React.ReactNode];
  index: number;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative z-[1] grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-10 ${first ? "pt-0" : "pt-20 sm:pt-40"} ${last ? "pb-0" : "pb-20 sm:pb-40"}`}
    >
      {/* Left */}
      <div className="relative z-[1] pr-2 sm:pr-4">{children[0]}</div>

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.12 + index * 0.1, ease: "backOut" }}
        className="relative z-10 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-accent"
      />

      {/* Right */}
      <div className="relative z-[1] pl-2 sm:pl-4">{children[1]}</div>
    </motion.div>
  );
}

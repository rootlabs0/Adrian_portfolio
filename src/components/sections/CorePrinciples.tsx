"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────────────────────
   Each block has a fixed final resting position (bottom + left
   as % of the stage, plus a small rotation). GSAP animates
   them from y: -900 → y: 0 with a stagger and bounce ease so
   they appear to fall and pile up. overflow:hidden on the stage
   keeps them invisible until they enter from the top.
   ────────────────────────────────────────────────────────────*/

type Block = {
  label:  string;
  color:  string;
  bottom: string;   // distance from stage floor
  left:   string;   // horizontal offset (slight variation for pile feel)
  rotate: number;   // degrees
};

/* Blocks are ordered bottom → top. The stagger naturally makes the
   bottom block land first, then each one falls on top of it. */
const BLOCKS: Block[] = [
  { label: "Quality",    color: "#6fa3f5", bottom: "2%",  left: "10%", rotate: 0 },
  { label: "Impact",     color: "#8ab8ff", bottom: "15%", left: "17%", rotate: 0 },
  { label: "Creativity", color: "#a1c5ff", bottom: "28%", left: "8%",  rotate: 0 },
  { label: "Uniqueness", color: "#bcd4ff", bottom: "41%", left: "16%", rotate: 0 },
  { label: "Idea",       color: "#c8daff", bottom: "54%", left: "12%", rotate: 0 },
];

/* Scatter targets per block when the pile is hovered.
   Each block flies in a unique direction — defying gravity.
   Values are relative to the block's resting position (y:0 / rotation:0). */
const SCATTER = [
  { x:  45, y: -70,  rotation:  8  }, // Quality    — drifts up-right
  { x: -65, y: -120, rotation: -12 }, // Impact     — shoots up-left
  { x:  75, y: -90,  rotation:  16 }, // Creativity — flies up-right, tips
  { x: -30, y: -155, rotation: -10 }, // Uniqueness — launches straight up-left
  { x:  55, y: -190, rotation:  12 }, // Idea       — escapes to the top
];

const PARTICLE_COUNT = 50;

export default function CorePrinciples() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const blockRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef     = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60, opacity: 0, duration: 1.1, ease: "power3.out",
      });

      /* Body */
      gsap.from(bodyRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: "power2.out",
      });

      /* Blocks — set to far above, then animate in with bounce */
      BLOCKS.forEach((b, i) => {
        const el = blockRefs.current[i];
        if (!el) return;

        /* Place each block at its final rotation, far above the stage */
        gsap.set(el, { y: -1000, rotation: b.rotate });

        /* Fall to resting position, staggered so bottom block lands first */
        gsap.to(el, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          y: 0,
          duration: 0.7,
          ease: "power2.in",
          delay: i * 0.18,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Cursor-reactive: blocks track & repel from mouse in real-time ── */
  useEffect(() => {
    const container = stageRef.current;
    if (!container) return;

    /* quickTo setters live in mutable arrays so we can recreate them on
       each mouseenter — necessary because overwriting a quickTo tween
       kills its internal reference, breaking subsequent hovers. */
    type QT = ReturnType<typeof gsap.quickTo>;
    let qtX:   (QT | null)[] = [];
    let qtY:   (QT | null)[] = [];
    let qtRot: (QT | null)[] = [];

    const buildSetters = () => {
      qtX   = blockRefs.current.map(el =>
        el ? gsap.quickTo(el, "x",        { duration: 0.45, ease: "power2.out" }) : null
      );
      qtY   = blockRefs.current.map(el =>
        el ? gsap.quickTo(el, "y",        { duration: 0.45, ease: "power2.out" }) : null
      );
      qtRot = blockRefs.current.map(el =>
        el ? gsap.quickTo(el, "rotation", { duration: 0.55, ease: "power2.out" }) : null
      );
    };

    /* ── Particles ── */
    let pIdx = 0;
    let lastSpawn = 0;

    /* Burst N particles exploding outward from (cx, cy) in stage coords */
    const spawnBurst = (cx: number, cy: number, count = 4) => {
      for (let b = 0; b < count; b++) {
        const el = particleRefs.current[pIdx % PARTICLE_COUNT];
        pIdx++;
        if (!el) continue;

        const angle  = Math.random() * Math.PI * 2;
        const dist   = 60 + Math.random() * 90;
        const dx     = Math.cos(angle) * dist;
        /* bias downward slightly to simulate gravity arc */
        const dy     = Math.sin(angle) * dist + dist * 0.25;
        const size   = 3 + Math.random() * 6;
        const color  = BLOCKS[Math.floor(Math.random() * BLOCKS.length)].color;
        const dur    = 0.38 + Math.random() * 0.32;

        el.style.left       = `${cx}px`;
        el.style.top        = `${cy}px`;
        el.style.width      = `${size}px`;
        el.style.height     = `${size}px`;
        el.style.background = color;
        el.style.boxShadow  = `0 0 ${Math.round(size * 2.5)}px ${color}cc`;

        gsap.killTweensOf(el);
        const tl = gsap.timeline();
        tl.set(el, { x: 0, y: 0, opacity: 0, scale: 1 });
        tl.to(el, { x: dx, y: dy, scale: 0.4, duration: dur, ease: "power3.out" }, 0);
        tl.to(el, { opacity: 0.95, duration: dur * 0.12, ease: "none" }, 0);
        tl.to(el, { opacity: 0,    duration: dur * 0.7,  ease: "power2.in" }, dur * 0.3);
      }
    };

    const onEnter = (e: MouseEvent) => {
      blockRefs.current.forEach(el => el && gsap.killTweensOf(el, "x,y,rotation"));
      
      /* Initial explosive burst: animate blocks to full SCATTER positions */
      BLOCKS.forEach((_, i) => {
        const el = blockRefs.current[i];
        if (!el) return;
        gsap.to(el, {
          x:        SCATTER[i].x,
          y:        SCATTER[i].y,
          rotation: SCATTER[i].rotation,
          duration: 0.75,
          ease:     "power3.out",
        });
      });
      
      const rect = container.getBoundingClientRect();
      spawnBurst(e.clientX - rect.left, e.clientY - rect.top, 10);
    };

    const onMove = (e: MouseEvent) => {
      /* Spawn particles on mousemove, no cursor tracking of blocks */
      const now = performance.now();
      if (now - lastSpawn > 33) {
        lastSpawn = now;
        const rect = container.getBoundingClientRect();
        spawnBurst(e.clientX - rect.left, e.clientY - rect.top, 4);
      }
    };

    const onLeave = () => {
      /* In-flight particles complete their own fade — no forced kill */
      BLOCKS.forEach((_, i) => {
        const el = blockRefs.current[i];
        if (!el) return;
        gsap.killTweensOf(el, "x,y,rotation");
        gsap.to(el, {
          x: 0, y: 0, rotation: 0,
          duration: 0.6 + i * 0.05,
          ease: "power3.out",
          delay: i * 0.03,
        });
      });
    };

    container.addEventListener("mouseenter", onEnter as EventListener);
    container.addEventListener("mousemove",  onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mouseenter", onEnter as EventListener);
      container.removeEventListener("mousemove",  onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="relative overflow-hidden py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10">

        {/* ── Left: heading + body ── */}
        <div className="relative lg:col-span-6 lg:pt-8">
          <h2
            ref={headingRef}
            aria-label="Core Principles"
            className="select-none font-extrabold leading-[0.85] tracking-tighter text-[clamp(4rem,12vw,9.5rem)]"
            style={{ color: "rgba(237,237,237,0.15)" }}
          >
            <span className="block">Core</span>
            <span className="block">Principles</span>
          </h2>

          <p
            ref={bodyRef}
            className="mt-10 max-w-md text-base leading-[1.85] text-foreground/70"
          >
            I believe in creating work that stands out. Every project needs quality execution, creative vision, and a unique perspective to make an impact. These are the core ideas that guide every decision I make.
          </p>
        </div>

        {/* ── Right: block pile ── */}
        <div className="lg:col-span-6">
          <div
            ref={stageRef}
            className="relative w-full overflow-hidden cursor-pointer"
            style={{
              height: "min(70vh, 560px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 88%, transparent 100%), " +
                "linear-gradient(to bottom, transparent 0%, black 6%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 88%, transparent 100%), " +
                "linear-gradient(to bottom, transparent 0%, black 6%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            {/* Particle pool — pre-rendered, reused across hover interactions */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <div
                key={`p${i}`}
                ref={el => { particleRefs.current[i] = el; }}
                className="absolute rounded-full pointer-events-none"
                style={{ opacity: 0, width: 4, height: 4 }}
              />
            ))}

            {BLOCKS.map((b, i) => (
              <div
                key={b.label}
                ref={(el) => { blockRefs.current[i] = el; }}
                className="absolute flex select-none items-center justify-center text-[clamp(0.75rem,1.1vw,0.95rem)] font-semibold tracking-tight will-change-transform"
                style={{
                  bottom:     b.bottom,
                  left:       b.left,
                  width:      "68%",
                  height:     "13%",
                  background: b.color,
                  color:      "#0d1a2e",
                  boxShadow:
                    "0 8px 24px -10px rgba(0,0,0,0.6), inset 0 -2px 0 rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.30)",
                }}
              >
                {b.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

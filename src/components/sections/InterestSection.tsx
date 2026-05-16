"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import FlowFieldBackground from "@/components/ui/FlowFieldBackground";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { getImagePath } from "@/lib/image-path";

/* ──── Data ──── */
const items = [
  {
    label: "Creative Design",
    tag: "Visual · Interface",
    note: "Visual storytelling, interface craft, and turning abstract ideas into tangible experiences.",
    icon: "/Creativity-icon.webp",
    iconClass: "",
  },
  {
    label: "Electronics & Hardware",
    tag: "Engineering · Prototyping",
    note: "Building circuits, soldering ESCs, prototyping boards, and making ideas physical. Every wire soldered is a lesson.",
    icon: "/led-icon.webp",
    iconClass: "",
  },
  {
    label: "Fitness",
    tag: "Discipline · Growth",
    note: "Discipline, consistency, and pushing limits. The same mindset that drives engineering.",
    icon: "/gym-icon.webp",
    iconClass: "",
  },
  {
    label: "Nature & Hiking",
    tag: "Exploration · Perspective",
    note: "Getting outdoors, exploring trails, and finding perspective away from screens.",
    icon: "/Nature-icon.webp",
    iconClass: "scale-125",
  },
];

// ── Arc config ────────────────────────────────────────────────────────────────
//
//  The section is 650 px tall and overflow:hidden.
//  The arc CENTRE is placed at  left:50%  bottom:-120px
//  → that means y = 650 + 120 = 770 px from the container top.
//
//  RADIUS = 340 px   STEP = 72°
//
//  offset  angle   x (px from arc-centre)   y-in-container (px from top)
//   0      90°      0                        770 − 340 = 430   ← visible
//  ±1     18/162°  ±323                      770 − 105 = 665   ← near bottom edge
//  ±2    −54/234°  ±200                      770 + 195 = 965   ← below fold, opacity 0
//
// ─────────────────────────────────────────────────────────────────────────────
const RADIUS = 340; // px
const STEP = 72;    // degrees between adjacent slots

function getTransform(itemIdx: number, currentIdx: number) {
  const n = items.length;
  // shortest-path offset in [-n/2 … n/2]
  let offset = ((itemIdx - currentIdx) % n + n) % n;
  if (offset > n / 2) offset -= n;

  const rad = ((90 - offset * STEP) * Math.PI) / 180;

  // x/y are CSS-transform translations relative to the arc-centre div
  const x = RADIUS * Math.cos(rad);   // positive = right
  const y = -(RADIUS * Math.sin(rad)); // positive = DOWN in CSS → negative = up

  const isCenter  = offset === 0;
  const isVisible = Math.abs(offset) <= 1;

  return {
    x,
    y,
    scale:   isCenter ? 1 : 0.72,
    opacity: isVisible ? 1 : 0,
    zIndex:  isCenter ? 20 : 10,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function InterestSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInFocus, setIsInFocus] = useState(false);
  const currentIndexRef = useRef(0);
  const sectionRef    = useRef<HTMLElement>(null);
  const cooldown      = useRef(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Detect when section is sufficiently visible in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Section is in focus when at least 40% is visible (less aggressive than 60%)
        setIsInFocus(entry.intersectionRatio >= 0.4);
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const advance = (dir: 1 | -1) => {
    if (cooldown.current) return;
    cooldown.current = true;
    setCurrentIndex(prev => (prev + dir + items.length) % items.length);
    if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    // Set cooldown with a max safety timeout to prevent getting stuck
    cooldownTimer.current = setTimeout(() => { 
      cooldown.current = false; 
    }, 500);
  };

  // Use a native (non-passive) listener so e.preventDefault() actually works
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !isInFocus) return;

    let touchStart = 0;
    let touchEnd = 0;

    const onWheel = (e: WheelEvent) => {
      // Only prevent default and advance if focused
      e.preventDefault();
      e.stopPropagation();
      advance(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].screenX;
      const difference = touchStart - touchEnd;
      const threshold = 50;

      if (Math.abs(difference) > threshold) {
        if (difference > 0) {
          // Swiped left → advance forward
          advance(1);
        } else {
          // Swiped right → advance backward
          advance(-1);
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isInFocus]);

  return (
    <section
      ref={sectionRef}
      id="interests"
      className="relative w-full overflow-hidden"
      style={{ height: "650px" }}
    >
      {/* ── Background ── */}
      <FlowFieldBackground color="#818cf8" trailOpacity={0.08} particleCount={400} speed={0.6} />

      {/* ── Fade overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-0" />

      {/* ── Title ── */}
      <div className="absolute top-14 inset-x-0 text-center z-30 pointer-events-none">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          Skills &amp; Interests
        </h2>
      </div>

      {/* ── SVG arc guide line ──
          ViewBox matches a typical 800 px-wide container (section is full-width).
          Arc centre in viewBox coords: (400, 770).  Radius: 340.

          Left slot  (offset −1, angle 162°):
            x = 400 + 340·cos(162°) ≈  77
            y = 770 − 340·sin(162°) ≈ 665   (note: minus because SVG y grows down
                                              but sin(162°)>0 means the point is ABOVE centre)
          Right slot (offset +1, angle 18°):
            x = 400 + 340·cos(18°) ≈ 723,  y ≈ 665

          sweep-flag=1 (clockwise in SVG) draws the UPPER arc. ✓
      ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 650"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: 5 }}
      >
        <path
          d="M 77 665 A 340 340 0 0 1 723 665"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
        />
      </svg>

      {/* ── Arc pivot ──
          Positioned at the mathematical arc centre.
          Cards are children whose CSS-transform x/y values move them to
          the correct point on the circle. The inner static div centres
          each card around that point without interfering with Framer Motion.
      ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-120px",
          width: 0,
          height: 0,
          zIndex: 10,
        }}
      >
        {items.map((item, i) => {
          const tf = getTransform(i, currentIndex);
          const isCenter = i === currentIndex;

          return (
            // Outer motion.div: moves the card's centre-point to (tf.x, tf.y)
            // relative to the arc pivot. x/y are pure translations — transform-
            // origin has no effect on them.
            <motion.div
              key={i}
              initial={false}
              animate={{ x: tf.x, y: tf.y }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", left: 0, top: 0, zIndex: tf.zIndex }}
            >
              {/*
                Static centering wrapper.
                This is NOT a motion element, so Framer Motion never touches its
                transform. translate(-50%, -50%) centres the card around the point
                (tf.x, tf.y) from the arc pivot.
              */}
              <div style={{ transform: "translate(-50%, -50%)" }}>
                {/* Inner motion.div: handles scale + fade from the card's own centre */}
                <motion.div
                  initial={false}
                  animate={{ scale: tf.scale, opacity: tf.opacity }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isCenter ? (
                    <LiquidGlassCard className="rounded-3xl p-8 w-72">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-canvas flex items-center justify-center mb-6">
                          <Image
                            src={getImagePath(item.icon)}
                            alt={item.label}
                            width={40}
                            height={40}
                            className={`object-contain w-10 h-10 ${item.iconClass}`}
                          />
                        </div>
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2 text-center">
                          {item.tag}
                        </p>
                        <h3 className="text-2xl font-bold tracking-tight mb-4 text-center">
                          {item.label}
                        </h3>
                        <p className="text-sm leading-[1.85] text-foreground/50 text-center">
                          {item.note}
                        </p>
                      </div>
                    </LiquidGlassCard>
                  ) : (
                    <LiquidGlassCard className="rounded-2xl p-5 w-52">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-canvas flex items-center justify-center mb-3">
                          <Image
                            src={getImagePath(item.icon)}
                            alt={item.label}
                            width={32}
                            height={32}
                            className={`object-contain w-8 h-8 ${item.iconClass}`}
                          />
                        </div>
                        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-foreground/30 mb-1 text-center">
                          {item.tag}
                        </p>
                        <h4 className="text-base font-bold tracking-tight text-center">
                          {item.label}
                        </h4>
                      </div>
                    </LiquidGlassCard>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

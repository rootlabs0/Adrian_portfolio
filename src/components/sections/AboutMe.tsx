"use client";

import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const Hyperspeed = dynamic(() => import("@/components/ui/Hyperspeed"), { ssr: false });

const SLIDES = [
  {
    age: "13",
    heading: "First website",
    body: "HTML, CSS, and a dream. A static site I hand-built from scratch, my first real shipped project.",
  },
  {
    age: "14",
    heading: "Built my first drone",
    body: "Soldered, wired, and crashed an FPV quad. Hardware became as natural as code.",
  },
  {
    age: "15",
    heading: "Founded Root Labs",
    body: "A product studio shipping tools that solve real problems. Designed, built, and sold.",
  },
  {
    age: "16",
    heading: "9+ projects shipped",
    body: "Web, hardware, infra. Each one harder than the last. Still going.",
  },
];

const HEIGHT_VH = 1200;

// Shared layout constants — used by both Slide animations and snap logic
const INTRO_SLOT = 1 / (SLIDES.length + 1); // 0.20
const SLIDE_SPACING = 0.22; // progress gap between slide starts
const SLIDE_WINDOW = 0.25;  // must be < SLIDE_SPACING / 0.67 so readable zones never overlap
const SLIDE_FADE = 0.05;    // fade in/out duration

export default function AboutMe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Use "end center" to extend tracking window - progress reaches 1 when section bottom is at viewport center
  // This gives slides more scroll room to animate to full visibility
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end center"],
  });

  // Snap to the most-readable progress point for each text element
  // Calculate dynamically to account for end clamping (especially on last slide)
  const snapPoints = useMemo(() => {
    const points = [];
    
    // Intro title readable zone
    const introReadableStart = INTRO_SLOT * 0.15;
    const introReadableEnd = INTRO_SLOT * 0.82;
    points.push((introReadableStart + introReadableEnd) / 2);
    
    // Slides readable zones
    SLIDES.forEach((_, i) => {
      const start = INTRO_SLOT + i * SLIDE_SPACING;
      const end = Math.min(1, start + SLIDE_WINDOW);
      const readableStart = start + SLIDE_WINDOW * 0.15;
      const readableEnd = end - SLIDE_WINDOW * 0.18;
      points.push((readableStart + readableEnd) / 2);
    });
    
    return points;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let timer: ReturnType<typeof setTimeout>;
    let isSnapping = false;
    let lastScrollY = window.scrollY;
    let scrollDir = 1; // 1 = forward, -1 = backward

    const handleScroll = () => {
      const newY = window.scrollY;
      if (newY !== lastScrollY) scrollDir = newY > lastScrollY ? 1 : -1;
      lastScrollY = newY;

      if (isSnapping) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
        // Matches offset ["start start", "end center"]
        const scrollRange = wrapper.offsetHeight - window.innerHeight / 2;
        const cur = (window.scrollY - wrapperTop) / scrollRange;
        if (cur < 0 || cur > 1) return;

        // Only consider snap points in the direction we were scrolling
        // A small 0.03 overlap lets us snap to the point we just barely passed
        const candidates = scrollDir >= 0
          ? snapPoints.filter(p => p >= cur - 0.03)
          : snapPoints.filter(p => p <= cur + 0.03);
        if (candidates.length === 0) return;

        const nearest = candidates.reduce((a, b) =>
          Math.abs(b - cur) < Math.abs(a - cur) ? b : a
        );
        if (Math.abs(nearest - cur) < 0.02) return; // already close enough

        isSnapping = true;
        window.scrollTo({ top: wrapperTop + nearest * scrollRange, behavior: "smooth" });
        setTimeout(() => { isSnapping = false; }, 1200);
      }, 300); // longer debounce = waits for user to truly stop
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [snapPoints]);

  const hyperspeedOptions = useMemo(
    () => ({
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 4,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xa1c5ff, 0x6f8cc4, 0xffffff],
        rightCars: [0xffffff, 0xcccccc, 0xa1c5ff],
        sticks: 0xa1c5ff,
      },
    }),
    []
  );

  return (
    <section id="about" ref={wrapperRef} style={{ position: "relative", height: `${HEIGHT_VH}vh` }}>
      {/* Sticky viewport — pins while user scrolls through slide range */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Hyperspeed canvas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>

        {/* Dim overlay for text legibility */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Section intro title */}
        <IntroTitle progress={scrollYProgress} />

        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <Slide key={slide.age} index={i} total={SLIDES.length} progress={scrollYProgress} slide={slide} />
        ))}

        {/* Progress dots */}
        <ProgressDots progress={scrollYProgress} total={SLIDES.length} />
      </div>
    </section>
  );
}

function IntroTitle({ progress }: { progress: MotionValue<number> }) {
  // Visible 0 → ~0.18 of total scroll, fades out before slide 1 starts at 0.20
  // Same nonlinear easing as slides: slow in readable zone, fast exit
  const scale = useTransform(
    progress,
    [0, INTRO_SLOT * 0.15, INTRO_SLOT * 0.82, INTRO_SLOT],
    [0.25, 0.85, 1.5, 8]
  );
  const opacity = useTransform(progress, [0, SLIDE_FADE, INTRO_SLOT - SLIDE_FADE, INTRO_SLOT], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{
        opacity,
        scale,
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        pointerEvents: "none",
        padding: "0 1.5rem",
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono, ui-monospace)",
          fontSize: "0.85rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--accent, #a1c5ff)",
          marginBottom: "1.25rem",
        }}
      >
        Sixteen years
      </p>
      <h2
        style={{
          color: "#fff",
          fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        The journey<br />so far
      </h2>

    </motion.div>
  );
}

function Slide({
  index,
  total,
  progress,
  slide,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  slide: (typeof SLIDES)[number];
}) {
  const start = INTRO_SLOT + index * SLIDE_SPACING;
  const end = Math.min(1, start + SLIDE_WINDOW);

  // Nonlinear scale: fast approach, SLOW readable zone, fast exit past camera
  const scale = useTransform(
    progress,
    [
      start,
      start + SLIDE_WINDOW * 0.15, // approach ends — text now readable
      end   - SLIDE_WINDOW * 0.18, // readable zone ends — exit begins
      end,
    ],
    [0.25, 0.85, 1.5, 8]
  );

  const opacity = useTransform(
    progress,
    [start, start + SLIDE_FADE, end - SLIDE_FADE, end],
    [0, 1, 1, 0]
  );
  const isLeft = index % 2 === 0;

  return (
    // Outer div: handles positioning/centering only
    <div
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "left" : "right"]: "clamp(1.5rem, 6vw, 5rem)",
        transform: "translateY(-50%)",
        zIndex: 2,
        maxWidth: "min(40vw, 480px)",
        textAlign: isLeft ? "left" : "right",
        pointerEvents: "none",
      }}
    >
      {/* Inner motion div: scale + blur + opacity — simulates driving past */}
      <motion.div
        style={{
          opacity,
          scale,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono, ui-monospace)",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent, #a1c5ff)",
            marginBottom: "0.75rem",
          }}
        >
          Age {slide.age}
        </div>
        <h3
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {slide.heading}
        </h3>
        <p
          style={{
            marginTop: "1rem",
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
            lineHeight: 1.55,
          }}
        >
          {slide.body}
        </p>
      </motion.div>
    </div>
  );
}

function ProgressDots({ progress, total }: { progress: MotionValue<number>; total: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        display: "flex",
        gap: "0.6rem",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function Dot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const slot = 1 / (total + 1);
  const start = slot * (index + 1);
  const end = start + slot;
  const p0 = Math.max(0, start - slot * 0.5);
  const p3 = Math.min(1, end + slot * 0.3);
  const opacity = useTransform(progress, [p0, start, end, p3], [0.25, 1, 1, 0.25]);
  const scale = useTransform(progress, [p0, start, end, p3], [1, 1.4, 1.4, 1]);
  return (
    <motion.span
      style={{
        opacity,
        scale,
        width: "6px",
        height: "6px",
        borderRadius: "9999px",
        background: "var(--accent, #a1c5ff)",
        display: "block",
      }}
    />
  );
}

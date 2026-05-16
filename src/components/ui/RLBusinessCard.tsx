"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { getImagePath } from "@/lib/image-path";
import PillButton from "@/components/ui/PillButton";

/* ═══════════════════════════════════════════════════
   Purple wave background (bottom of card)
   ═══════════════════════════════════════════════════ */
function PurpleWaves() {
  return (
    <svg
      viewBox="0 0 900 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pw-fade0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(138,61,230,0)" />
          <stop offset="40%" stopColor="rgba(138,61,230,0.04)" />
          <stop offset="100%" stopColor="rgba(138,61,230,0.06)" />
        </linearGradient>
        <linearGradient id="pw-fade1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(138,61,230,0)" />
          <stop offset="35%" stopColor="rgba(138,61,230,0.06)" />
          <stop offset="100%" stopColor="rgba(138,61,230,0.10)" />
        </linearGradient>
      </defs>
      <path
        d="M-50 260 C150 170,350 230,500 180 C650 130,780 210,950 150 L950 500 L-50 500Z"
        fill="url(#pw-fade0)"
      />
      <path
        d="M-50 290 C130 200,320 260,490 210 C660 160,770 240,950 180 L950 500 L-50 500Z"
        fill="url(#pw-fade1)"
      />
      {[
        { d: "M-50 310 C100 230,280 300,460 245 C640 190,760 275,950 215 L950 500 L-50 500Z", o: 0.16 },
        { d: "M-50 350 C80 275,260 345,440 290 C620 235,750 320,950 260 L950 500 L-50 500Z", o: 0.28 },
        { d: "M-50 390 C60 320,240 385,420 340 C600 295,740 370,950 310 L950 500 L-50 500Z", o: 0.42 },
        { d: "M-50 425 C50 370,220 420,400 390 C580 360,730 415,950 370 L950 500 L-50 500Z", o: 0.58 },
        { d: "M-50 460 C40 430,200 458,380 442 C560 428,720 455,950 432 L950 500 L-50 500Z", o: 0.76 },
      ].map((l, i) => (
        <path key={i} d={l.d} fill={`rgba(138,61,230,${l.o})`} />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Lanyard hole - metal grommet
   ═══════════════════════════════════════════════════ */
function LanyardHole({ mobile }: { mobile?: boolean }) {
  return (
    <div
      className="absolute z-30 pointer-events-none"
      style={
        mobile
          ? { left: "50%", top: 6, transform: "translateX(-50%)", width: 34, height: 34 }
          : { right: 30, top: "50%", transform: "translateY(-50%)", width: 38, height: 38 }
      }
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "#aaa" }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: 7,
          backgroundColor: "#141414",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Desktop lanyard - two thick flat purple strands
   that emerge from the grommet hole and spread apart
   ═══════════════════════════════════════════════════ */
function LanyardDesktop() {
  // Both strands exit the hole as a single clean neck (x=0..60),
  // then split apart. Strand2 has irregular wobble after the split.
  const strand1 = `
    M0 150
    L60 150
    C120 148, 200 130, 300 108
    C420 78, 540 56, 660 36
    C720 26, 750 18, 780 10
    L780 42
    C750 50, 720 58, 660 68
    C540 88, 420 110, 300 140
    C200 162, 120 174, 60 174
    L0 174
    Z`;
  const strand2 = `
    M0 150
    L60 150
    C100 160, 150 184, 220 216
    C310 256, 400 278, 510 296
    C590 306, 680 316, 780 322
    L780 290
    C690 284, 600 276, 520 266
    C420 252, 330 234, 250 202
    C180 176, 120 162, 60 174
    L0 174
    Z`;

  return (
    <svg
      className="absolute pointer-events-none z-20"
      style={{
        top: "50%",
        left: "calc(100% - 48px)",
        transform: "translateY(-50%)",
        width: "55vw",
        height: 320,
        overflow: "visible",
      }}
      viewBox="0 0 780 320"
      fill="none"
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        {/* Base purple gradient */}
        <linearGradient id="ld-base1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="ld-base2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>

        {/* Fold shading */}
        <linearGradient id="ld-folds" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="20%" stopColor="rgba(0,0,0,0.06)" />
          <stop offset="24%" stopColor="rgba(0,0,0,0)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
          <stop offset="54%" stopColor="rgba(0,0,0,0)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="74%" stopColor="rgba(0,0,0,0.04)" />
          <stop offset="78%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* Cloth weave texture */}
        <pattern id="ld-weave" x="0" y="0" width="4" height="3" patternUnits="userSpaceOnUse">
          <rect width="4" height="3" fill="transparent" />
          <line x1="0" y1="1.5" x2="4" y2="1.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
        <pattern id="ld-crosshatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <rect width="6" height="6" fill="transparent" />
          <line x1="0" y1="3" x2="6" y2="3" stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />
        </pattern>

        {/* Fade-out at right end */}
        <linearGradient id="ld-fadeout" x1="0.5" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="ld-mask">
          <rect width="780" height="320" fill="white" />
          <rect x="420" width="360" height="320" fill="url(#ld-fadeout)" />
        </mask>
      </defs>

      <g mask="url(#ld-mask)">
        {/* Shadows */}
        <path d={strand1} fill="rgba(0,0,0,0.08)" transform="translate(3,5)" />
        <path d={strand2} fill="rgba(0,0,0,0.08)" transform="translate(3,5)" />

        {/* Strand 1 (upper) */}
        <path d={strand1} fill="url(#ld-base1)" />
        <path d={strand1} fill="url(#ld-weave)" />
        <path d={strand1} fill="url(#ld-crosshatch)" />

        {/* Strand 2 (lower) */}
        <path d={strand2} fill="url(#ld-base2)" />
        <path d={strand2} fill="url(#ld-weave)" />
        <path d={strand2} fill="url(#ld-crosshatch)" />

        {/* Edge highlights/shadows for both strands */}
        {[strand1, strand2].map((_, i) => {
          const topEdges = [
            "M0 150 L60 150 C120 148, 200 130, 300 108 C420 78, 540 56, 660 36 C720 26, 750 18, 780 10",
            "M0 150 L60 150 C100 160, 150 184, 220 216 C310 256, 400 278, 510 296 C590 306, 680 316, 780 322",
          ];
          const botEdges = [
            "M0 174 L60 174 C120 174, 200 162, 300 140 C420 110, 540 88, 660 68 C720 58, 750 50, 780 42",
            "M0 174 L60 174 C120 162, 180 176, 250 202 C330 234, 420 252, 520 266 C600 276, 690 284, 780 290",
          ];
          return (
            <g key={i}>
              <path d={topEdges[i]} stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" fill="none" />
              <path d={botEdges[i]} stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" fill="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Mobile lanyard - two thick flat purple strands, vertical
   ═══════════════════════════════════════════════════ */
function LanyardMobile() {
  // Both strands share a pinch at the grommet (bottom center y≈300)
  // then fan apart going up. Strand2 has different curvature.
  const strand1 = `
    M105 300
    C96 275, 78 235, 62 190
    C46 145, 40 105, 42 55
    C44 25, 46 2, 46 -20
    L74 -20
    C74 2, 72 25, 70 55
    C68 105, 74 145, 90 190
    C106 235, 112 275, 115 300
    Z`;
  const strand2 = `
    M115 300
    C124 272, 142 228, 156 186
    C168 148, 172 108, 170 58
    C168 28, 166 4, 166 -20
    L138 -20
    C138 4, 140 28, 142 58
    C144 108, 138 148, 126 186
    C112 228, 106 272, 105 300
    Z`;

  return (
    <svg
      className="absolute pointer-events-none z-20"
      style={{
        bottom: "calc(100% - 14px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 220,
        height: "38vw",
        maxHeight: 240,
        overflow: "visible",
      }}
      viewBox="0 0 220 300"
      fill="none"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="lm-base1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lm-base2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="50%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="lm-folds" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="22%" stopColor="rgba(0,0,0,0.05)" />
          <stop offset="26%" stopColor="rgba(0,0,0,0)" />
          <stop offset="48%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="52%" stopColor="rgba(0,0,0,0.04)" />
          <stop offset="56%" stopColor="rgba(0,0,0,0)" />
          <stop offset="78%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="82%" stopColor="rgba(0,0,0,0.04)" />
          <stop offset="86%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <pattern id="lm-weave" x="0" y="0" width="3" height="4" patternUnits="userSpaceOnUse">
          <rect width="3" height="4" fill="transparent" />
          <line x1="0" y1="2" x2="3" y2="2" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
        <pattern id="lm-cross" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(75)">
          <rect width="6" height="6" fill="transparent" />
          <line x1="0" y1="3" x2="6" y2="3" stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" />
        </pattern>
        <linearGradient id="lm-fadeout" x1="0" y1="0.5" x2="0" y2="0">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="lm-mask">
          <rect width="220" height="300" fill="white" />
          <rect y="0" width="220" height="220" fill="url(#lm-fadeout)" />
        </mask>
      </defs>

      <g mask="url(#lm-mask)">
        {/* Shadows */}
        <path d={strand1} fill="rgba(0,0,0,0.06)" transform="translate(3, 0)" />
        <path d={strand2} fill="rgba(0,0,0,0.06)" transform="translate(3, 0)" />

        {/* Strand 1 (left) */}
        <path d={strand1} fill="url(#lm-base1)" />
        <path d={strand1} fill="url(#lm-folds)" />
        <path d={strand1} fill="url(#lm-weave)" />
        <path d={strand1} fill="url(#lm-cross)" />

        {/* Strand 2 (right) */}
        <path d={strand2} fill="url(#lm-base2)" />
        <path d={strand2} fill="url(#lm-folds)" />
        <path d={strand2} fill="url(#lm-weave)" />
        <path d={strand2} fill="url(#lm-cross)" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   Main export: 3D Business Card on lanyard
   ═══════════════════════════════════════════════════ */
export default function RLBusinessCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [240, 0]);
  const springY = useSpring(cardY, { stiffness: 50, damping: 18, mass: 1 });

  const walletFlapRotate = useTransform(scrollYProgress, [0, 0.5], [0, -45]);
  const springFlapRotate = useSpring(walletFlapRotate, { stiffness: 50, damping: 18 });

  const walletOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springRY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * 14);
      rotateY.set(x * 14);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-3xl"
      style={{ perspective: "1200px" }}
    >
      {/* ── Wallet (behind card) ── */}
      <motion.div
        style={{ opacity: walletOpacity }}
        className="absolute inset-x-0 top-[40%] bottom-0 z-0 pointer-events-none"
      >
        <motion.div
          style={{
            rotateX: springFlapRotate,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-x-[4%] -top-6 h-12 rounded-t-xl bg-[#1c1c1c] border-t border-x border-foreground/[0.06]"
        >
          <div
            className="absolute top-3 left-4 right-4 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(237,237,237,0.06) 0px, rgba(237,237,237,0.06) 5px, transparent 5px, transparent 11px)",
            }}
          />
        </motion.div>
        <div className="relative w-full h-full rounded-2xl bg-[#1a1a1a] border border-foreground/[0.06] shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#222] via-[#1a1a1a] to-[#151515]" />
          <div
            className="absolute top-4 left-6 right-6 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(237,237,237,0.05) 0px, rgba(237,237,237,0.05) 6px, transparent 6px, transparent 13px)",
            }}
          />
          <div
            className="absolute bottom-4 left-6 right-6 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(237,237,237,0.05) 0px, rgba(237,237,237,0.05) 6px, transparent 6px, transparent 13px)",
            }}
          />
          <div className="absolute top-0 left-[8%] right-[8%] h-10 bg-gradient-to-b from-black/40 to-transparent rounded-b-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/[0.04]">
              Root Labs
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Card + grommet + lanyard ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          y: springY,
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 cursor-default"
      >
        {/* Desktop lanyard (right) */}
        <div className="hidden sm:block">
          <LanyardDesktop />
        </div>
        {/* Mobile lanyard (top) */}
        <div className="block sm:hidden">
          <LanyardMobile />
        </div>

        {/* Card surface */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative bg-white">
            {/* ── Content section ── */}
            <div className="relative z-10 px-6 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6">
              {/*
                Desktop: info left | avatar right (side by side)
                Mobile:  name row → avatar below → description
              */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                {/* Left column: info */}
                <div className="flex-1 min-w-0">
                  {/* Logo + title row */}
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 h-12 w-12 overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={getImagePath("/rootlabs-favicon.webp")}
                        alt="Root Labs"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        Root Labs
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-gray-400">
                        CEO &middot; Co-Founder &middot; Systems Architect
                      </p>
                    </div>
                  </div>

                  {/* Avatar - mobile only (bigger, centered) */}
                  <div className="block sm:hidden mt-5">
                    <div className="relative mx-auto w-fit rounded-xl p-[3px] bg-gray-200/80">
                      <div className="h-[260px] w-[200px] overflow-hidden rounded-[10px]">
                        <Image
                          src={getImagePath("/Adrian_avatar.png")}
                          alt="Adrian Edwards"
                          width={800}
                          height={1200}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-[1.8] text-gray-600">
                    The startup studio behind everything here. I co-founded Root
                    Labs with Stepan and Viktor to build products that solve real
                    problems through fast iteration and strong ownership.
                  </p>

                  {/* CTA */}
                  <div className="mt-5">
                    <PillButton href="https://rootlabs.studio" variant="purple">
                      Visit Root Labs
                    </PillButton>
                  </div>
                </div>

                {/* Right column: avatar (desktop only) - mr-14 keeps it clear of grommet */}
                <div className="hidden sm:block shrink-0 sm:mr-14">
                  <div className="relative rounded-xl p-[3px] bg-gray-200/80 shadow-lg">
                    <div className="h-[220px] w-[170px] overflow-hidden rounded-[10px]">
                      <Image
                        src={getImagePath("/Adrian_avatar.png")}
                        alt="Adrian Edwards"
                        width={850}
                        height={1200}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Purple waves ── */}
            <div className="relative h-32 sm:h-48 overflow-hidden">
              <PurpleWaves />
              <p className="absolute bottom-4 right-6 font-mono text-[10px] tracking-widest text-white/50 z-10">
                rootlabs.studio
              </p>
            </div>
          </div>

          {/* Border ring */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />

          {/* Tilt shine */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        </div>

        {/* Desktop grommet */}
        <div className="hidden sm:block">
          <LanyardHole />
        </div>
        {/* Mobile grommet */}
        <div className="block sm:hidden">
          <LanyardHole mobile />
        </div>
      </motion.div>
    </div>
  );
}

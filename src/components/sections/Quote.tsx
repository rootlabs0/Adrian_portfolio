"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);

  return (
    <section ref={ref} className="py-36">
      <motion.div
        style={{ opacity, y }}
        className="mx-auto max-w-4xl px-6"
      >
        <blockquote className="text-[clamp(1.5rem,4vw,3rem)] font-bold leading-[1.2] tracking-tight">
          <span className="text-foreground/15">&ldquo;</span>
          <QuoteTypeIn />
        </blockquote>

        <p className="mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/25">
          The philosophy behind everything I build
        </p>
      </motion.div>
    </section>
  );
}

const SEGMENTS = [
  { text: "Creativity is intelligence ", style: "text" },
  { text: "having fun", style: "accent" },
  { text: ".", style: "text" },
] as const;

function QuoteTypeIn() {
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const totalLength = SEGMENTS.reduce((sum, s) => sum + s.text.length, 0);

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
            setRevealed(i);
            if (i >= totalLength) {
              clearInterval(id);
              setTimeout(() => setDone(true), 600);
            }
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [totalLength]);

  let charIndex = 0;
  return (
    <span ref={ref}>
      {SEGMENTS.map((seg, idx) => {
        const chars = seg.text.split("").map((ch, ci) => {
          const globalIdx = charIndex + ci;
          const visible = globalIdx < revealed;
          return (
            <span
              key={ci}
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.05s" }}
            >
              {ch}
            </span>
          );
        });
        charIndex += seg.text.length;
        return seg.style === "accent" ? (
          <span key={idx} className="text-accent font-display italic">{chars}</span>
        ) : (
          <span key={idx}>{chars}</span>
        );
      })}
      <span className="text-foreground/15" style={{ opacity: revealed >= totalLength ? 1 : 0, transition: "opacity 0.15s" }}>&rdquo;</span>
    </span>
  );
}

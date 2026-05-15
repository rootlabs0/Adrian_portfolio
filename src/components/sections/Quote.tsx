"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect, Fragment } from "react";

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
        <blockquote className="text-center text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.2] tracking-tight">
          <QuoteTypeIn />
        </blockquote>
      </motion.div>
    </section>
  );
}

const SEGMENTS = [
  { text: "The best way to", style: "text" },
  { text: "predict the future is to ", style: "text" },
  { text: "create it.", style: "accent" },
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
  const accentSegmentIndex = SEGMENTS.findIndex(s => s.style === "accent");
  
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
        
        const content = seg.style === "accent" ? (
          <span key={idx} className="text-accent font-display italic">{chars}</span>
        ) : (
          <span key={idx}>{chars}</span>
        );
        
        // Add line break only before the first segment
        if (idx === 0) {
          return (
            <Fragment key={idx}>
              {content}
              <br />
            </Fragment>
          );
        }
        
        // Add line break before the accent segment
        if (idx === accentSegmentIndex) {
          return (
            <Fragment key={idx}>
              <br />
              {content}
            </Fragment>
          );
        }
        
        return content;
      })}
    </span>
  );
}

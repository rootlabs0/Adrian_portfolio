"use client";

import { motion } from "motion/react";

const COLS = 12;

/* Deterministic binary columns - no Math.random, avoids hydration mismatch */
const columns = [
  "011000111001010010",
  "110010100101110001",
  "001001110100101100",
  "100010111000110100",
  "010011101010011101",
  "101001100110100011",
  "001110011101001100",
  "111001010100110010",
  "010101001100111010",
  "100111010010010100",
  "000101101101000110",
  "110100101011001100",
];

/**
 * A stylised laptop with binary streams raining into it from above.
 * Fully self-contained, no external assets needed.
 */
export default function BinaryComputer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Binary rain streams */}
      <div className="relative flex justify-center gap-[6px] h-48 overflow-hidden mb-0">
        {columns.map((col, i) => {
          const delay = (i * 0.35) % 3;
          const dur = 2.4 + (i % 4) * 0.3;
          return (
            <motion.div
              key={i}
              className="flex flex-col items-center font-mono text-[11px] leading-[1.4] text-green-400/70 select-none"
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: ["-40%", "10%"], opacity: [0, 0.85, 0.85, 0] }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {col.split("").map((char, j) => (
                <span key={j}>{char}</span>
              ))}
            </motion.div>
          );
        })}

        {/* Fade-out gradient at bottom so the stream blends into the laptop */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base to-transparent" />
      </div>

      {/* Laptop - screen */}
      <div className="relative z-10 w-56 sm:w-64 rounded-t-xl border border-foreground/10 bg-canvas-light p-3">
        <div className="flex h-28 items-center justify-center rounded-md bg-canvas-dark">
          <span className="font-mono text-[10px] text-green-400/60 tracking-wider">
            &gt;_ ACCESS GRANTED
          </span>
        </div>
      </div>

      {/* Laptop - keyboard / base */}
      <div className="relative z-10 w-64 sm:w-72 h-3 rounded-b-lg bg-foreground/10" />
      <div className="relative z-10 w-20 h-1 rounded-b-sm bg-foreground/5" />
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";

const interests = [
  {
    label: "Nature & Hiking",
    note: "Getting outdoors, exploring trails, and finding perspective away from screens.",
    icon: "/Nature-icon.webp",
    iconClass: "scale-[1.6]",
  },
  {
    label: "Creative Design",
    note: "Visual storytelling, interface craft, and turning abstract ideas into tangible experiences.",
    icon: "/Creativity-icon.webp",
  },
  {
    label: "Electronics & Hardware",
    note: "Building circuits, prototyping hardware, and making ideas physical.",
    icon: "/led-icon.webp",
  },
  {
    label: "Fitness",
    note: "Discipline, consistency, and pushing limits. The same mindset that drives engineering.",
    icon: "/gym-icon.webp",
    iconClass: "rotate-[-15deg] scale-90",
  },
];

export default function InterestSection() {
  return (
    <section id="interests" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/30">
          Interests & Skills
        </p>

        {/* ── Featured: Drone section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {/* Left - large drone image, tilted */}
          <div className="flex justify-center">
            <Image
              src="/drone-icon.webp"
              alt="Custom built FPV drone"
              width={400}
              height={400}
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover rotate-[-28deg] drop-shadow-2xl"
            />
          </div>

          {/* Right - explainer */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Custom FPV Drone
            </h3>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/25">
              Engineering &middot; FPV Flight
            </p>
            <p className="mt-6 text-base leading-[1.8] text-foreground/50">
              Built from the frame up - custom soldered ESCs, tuned flight
              controllers, and hand-picked components for maximum performance.
              FPV flying is where software precision meets physical
              engineering. Every build is a lesson in systems integration,
              weight optimization, and real-time control theory.
            </p>
          </div>
        </motion.div>

        {/* ── Grid: remaining interests ── */}
        <div className="mt-24 relative grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-36 lg:gap-y-20 lg:items-center">
          {/* Left column - first 2 items */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col gap-18">
            {interests.slice(0, 2).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={80}
                    height={80}
                    className={`object-contain max-w-full max-h-full ${
                      (item as { iconClass?: string }).iconClass ?? ""
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{item.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/40">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center - "Adrian." branding element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <span className="text-4xl font-bold tracking-tight">
              Adrian<span className="text-accent">.</span>
            </span>
          </motion.div>

          {/* Right column - last 2 items */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col gap-18">
            {interests.slice(2, 4).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={80}
                    height={80}
                    className={`object-contain max-w-full max-h-full ${
                      (item as { iconClass?: string }).iconClass ?? ""
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">{item.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/40">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

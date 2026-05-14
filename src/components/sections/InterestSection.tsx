"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

/* â”€â”€ Data â”€â”€ */
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

export default function InterestSection() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  return (
    <section id="interests" className="py-24 sm:py-32 lg:py-40">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-full max-w-5xl px-6"
      >
        {/* Section label */}
        <p data-fade-out className="mb-16 sm:mb-20 text-[11px] tracking-[0.25em] uppercase text-foreground/30" style={{ fontFamily: "var(--font-inter)" }}>
          Interests &amp; Skills
        </p>

        {/* â”€â”€ DESKTOP: Editorial two-column layout â”€â”€ */}
        <div className="hidden sm:grid grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: numbered list */}
          <div className="flex flex-col divide-y divide-foreground/[0.06]">
            {items.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group flex items-center gap-6 py-7 text-left"
              >
                <span className="w-7 font-mono text-[11px] tracking-[0.2em] text-foreground/20 flex-shrink-0 group-hover:text-foreground/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.div
                  className="h-px bg-foreground/30 flex-shrink-0"
                  animate={{ width: active === i ? 20 : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.span
                  animate={{ color: active === i ? "rgba(237,237,237,1)" : "rgba(237,237,237,0.25)" }}
                  transition={{ duration: 0.3 }}
                  className="text-xl lg:text-2xl font-bold tracking-tight"
                >
                  {item.label}
                </motion.span>
              </button>
            ))}
          </div>

          {/* Right: spotlight panel */}
          <div className="sticky top-1/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-foreground/[0.08] bg-canvas-light p-10"
              >
                <div className="w-20 h-20 rounded-2xl bg-canvas flex items-center justify-center mb-8">
                  <Image
                    src={items[active].icon}
                    alt={items[active].label}
                    width={52}
                    height={52}
                    className={`object-contain w-14 h-14 ${items[active].iconClass}`}
                  />
                </div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-3">
                  {items[active].tag}
                </p>
                <h3 className="text-3xl font-bold tracking-tight mb-5">
                  {items[active].label}
                </h3>
                <p className="text-base leading-[1.85] text-foreground/50">
                  {items[active].note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* â”€â”€ MOBILE: Accordion â”€â”€ */}
        <div className="flex flex-col sm:hidden divide-y divide-foreground/[0.06]">
          {items.map((item, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div key={item.label}>
                <button
                  onClick={() => setMobileOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/20 w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? "text-foreground" : "text-foreground/40"}`}>
                      {item.label}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-foreground/30 text-2xl leading-none flex-shrink-0 ml-4 font-light"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 flex gap-5 items-start">
                        <div className="rounded-xl bg-canvas border border-foreground/[0.07] p-4 flex-shrink-0">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={40}
                            height={40}
                            className={`object-contain w-10 h-10 ${item.iconClass}`}
                          />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2">
                            {item.tag}
                          </p>
                          <p className="text-sm leading-[1.85] text-foreground/50">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

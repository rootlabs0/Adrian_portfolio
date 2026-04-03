"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import PillButton from "@/components/ui/PillButton";
import Image from "next/image";
import BinaryComputer from "@/components/ui/BinaryComputer";
import RLBusinessCard from "@/components/ui/RLBusinessCard";

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/30"
        >
          Selected Work
        </motion.p>

        {/* ═══════════════════════════════════════════
            01 — ROOT LABS
            3D business card with wallet scroll-out
            and hover tilt effect.
            ═══════════════════════════════════════════ */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <RLBusinessCard />
        </motion.article>

        {/* ═══════════════════════════════════════════
            THE GOAL — standalone motto section
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="my-36 py-20 flex flex-col items-center text-center"
        >
          <p className="font-mono text-sm tracking-wide text-foreground/60">
            the goal:
          </p>
          <p className="mt-4 whitespace-nowrap text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.1] tracking-tight">
            <span className="text-foreground/15">&ldquo;</span>
            <span className="text-foreground">build </span>
            <CoolStretch />
            <span className="text-foreground"> sh*t</span>
            <span className="text-foreground/15">&rdquo;</span>
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            02 — TEAMSTER
            Monitor-arm showcase with scroll animation.
            ═══════════════════════════════════════════ */}
        <TeamsterSection />

        {/* ═══════════════════════════════════════════
            03 — HACKME
            Dark inset card with tilted image.
            Covert feel matching cybersecurity theme.
            ═══════════════════════════════════════════ */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 relative"
        >
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="shrink-0 h-10 w-10 overflow-hidden rounded-lg">
                  <Image src="/HackME-logo.webp" alt="HackME" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  HackME
                </h3>
              </motion.div>
              <p className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/25">
                Founder &middot; Product Dev &middot; Marketer
              </p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base leading-[1.8] text-foreground/50"
              >
                The engineering of security. I built HackME as an educational
                platform for ethical hacking, designing every challenge from
                the ground up. Story-driven scenarios drop users into
                narrative technical environments where they learn by breaking,
                fixing, and building. Not a textbook. An operation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-6"
              >
                <PillButton href="https://electroworks-store.github.io/HackMe" variant="gradient">
                  Visit HackME
                </PillButton>
              </motion.div>
            </div>

            {/* Binary Computer visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <BinaryComputer />
            </motion.div>
          </div>
        </motion.article>


      </div>
    </section>
  );
}

/* ─── TeamsterX monitor-arm section ─── */
function TeamsterSection() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-32"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-1 flex items-center gap-3"
      >
        <div className="shrink-0 h-10 w-10 overflow-hidden rounded-lg">
          <Image
            src="/favicon-circle.webp"
            alt="TeamsterX"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            TeamsterX
          </h3>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-foreground/25">
            Lead Product Developer
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Screenshot ── */}
        <div className="lg:col-span-7 relative">
          <div className="relative overflow-hidden rounded-2xl bg-canvas aspect-[16/10]">
            <Image
              src="/Teamster.png"
              alt="TeamsterX dashboard"
              fill
              sizes="(min-width:1024px) 58vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* ── Text ── */}
        <div className="lg:col-span-5 lg:pt-6">
          <p className="text-base leading-[1.8] text-foreground/50">
            Scaling human effort through better systems. I lead product
            development on Teamster, a collaborative platform for internal
            communication and organization. Real-time task boards, role-based
            access, clear information architecture. Built for teams that need
            clarity in execution.
          </p>
          <div className="mt-6">
            <PillButton href="https://app.teamsterx.com" variant="gradient">
              Visit TeamsterX
            </PillButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── "cool" rubber-band stretch animation ─── */
function CoolStretch() {
  const [oCount, setOCount] = useState(2);
  const [deform, setDeform] = useState({ sx: 1, sy: 1 });
  const started = useRef(false);
  const animating = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const playAnimation = useCallback((delay = 0) => {
    if (animating.current) return;
    animating.current = true;
    setTimeout(() => {
      const totalDuration = 1200;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / totalDuration, 1);

        const bell = Math.sin(t * Math.PI);
        const count = Math.round(2 + bell * 4);
        setOCount(count);

        const sx = 1 + 0.45 * bell + Math.sin(t * Math.PI * 5) * 0.1 * (1 - t);
        const sy = 1 - 0.2 * bell;
        setDeform({ sx, sy });

        if (t < 1) requestAnimationFrame(animate);
        else { setOCount(2); setDeform({ sx: 1, sy: 1 }); animating.current = false; }
      };
      requestAnimationFrame(animate);
    }, delay);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          playAnimation(1400);
        }
      },
      { threshold: 0.7 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playAnimation]);

  return (
    <span ref={ref} className="text-accent font-display italic cursor-pointer" onMouseEnter={() => playAnimation()}>
      c
      {Array.from({ length: oCount }).map((_, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: `scaleX(${deform.sx}) scaleY(${deform.sy})`,
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          o
        </span>
      ))}
      l
    </span>
  );
}

/* ─── Reusable type-in animation ─── */
function TypeIn({
  text,
  speed = 55,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

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
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(id);
              setTimeout(() => setDone(true), 600);
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!done && (
        <span className="animate-pulse" style={{ opacity: displayed.length ? 1 : 0 }}>|</span>
      )}
    </span>
  );
}

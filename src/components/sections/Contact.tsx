"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/30">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Let&rsquo;s{" "}
            <span className="text-accent font-display italic">build</span>{" "}
            something.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/50">
            Have a project idea, want to collaborate, or just want to
            connect? Reach out via email - I&rsquo;ll get back to you.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href="mailto:edwardsadrianj@gmail.com"
              className="inline-flex items-center gap-3 text-xl font-semibold text-accent transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              edwardsadrianj@gmail.com
            </a>

            <a
              href="https://instagram.com/adri.edwardsj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xl font-semibold text-accent transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              adri.edwardsj
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

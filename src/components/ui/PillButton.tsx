"use client";

type PillButtonProps = {
  children: React.ReactNode;
  variant?: "gradient" | "ghost" | "purple";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function PillButton({
  children,
  variant = "gradient",
  href,
  onClick,
  className = "",
}: PillButtonProps) {
  const isGradient = variant === "gradient";
  const isPurple = variant === "purple";

  const inner = (
    <span
      className={`group relative inline-flex overflow-hidden rounded-full p-[2px] ${className}`}
    >
      {/* Static border (resting state, fades on hover) */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-0 ${
          isPurple
            ? ""
            : isGradient
              ? "bg-accent"
              : "bg-foreground/20"
        }`}
        style={isPurple ? { background: "#7c3aed" } : undefined}
      />

      {/* Spinning conic gradient (appears on hover) */}
      <span
        className="pointer-events-none absolute inset-[-200%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isPurple
            ? "conic-gradient(from 0deg, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.3) 40%, rgba(168,85,247,0.8) 45%, rgba(124,58,237,0.3) 50%, rgba(124,58,237,0.3) 90%, rgba(168,85,247,0.8) 95%, rgba(124,58,237,0.3) 100%)"
            : "conic-gradient(from 0deg, rgba(161,197,255,0.3) 0%, rgba(161,197,255,0.3) 40%, var(--accent-green) 45%, rgba(161,197,255,0.3) 50%, rgba(161,197,255,0.3) 90%, var(--accent-green) 95%, rgba(161,197,255,0.3) 100%)",
          animation: "spin-border 2s linear infinite",
        }}
      />

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold ${
        isPurple
          ? "text-white"
          : isGradient
            ? "bg-accent text-canvas"
            : "bg-canvas text-foreground"
      }`}
        style={isPurple ? { background: "#7c3aed" } : undefined}
      >
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-flex" suppressHydrationWarning>
      {inner}
    </button>
  );
}

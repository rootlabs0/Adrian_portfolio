export default function Footer() {
  const links = [
    { label: "Instagram", href: "https://www.instagram.com/adri.edwardsj/" },
    { label: "GitHub", href: "https://github.com/Electroworks-store" },
    { label: "Email", href: "mailto:edwardsadrianj@gmail.com" },
  ];

  return (
    <footer className="mt-12 border-t border-foreground/6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/25">
          &copy; {new Date().getFullYear()} Adrian Edwards
        </p>

        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/25 transition-colors hover:text-foreground/60"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

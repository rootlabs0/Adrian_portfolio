type GradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
};

export default function GradientBorder({
  children,
  className = "",
  rounded = "rounded-2xl",
}: GradientBorderProps) {
  return (
    <div className={`gradient-border p-[2px] ${rounded} ${className}`}>
      <div className={`gradient-border-inner ${rounded} h-full w-full`}>
        {children}
      </div>
    </div>
  );
}

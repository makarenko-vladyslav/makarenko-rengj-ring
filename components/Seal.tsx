"use client";

interface SealProps {
  id: string;
  label: string;
  center: string;
  className?: string;
}

export function Seal({ id, label, center, className = "" }: SealProps) {
  return (
    <div className={`relative h-28 w-28 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite]">
        <defs>
          <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="hsl(48 98% 55%)" stroke="hsl(228 55% 10%)" strokeWidth="2" />
        <text
          fontSize="10"
          fontWeight="800"
          letterSpacing="2.6"
          fill="hsl(228 55% 10%)"
          style={{ textTransform: "uppercase", fontFamily: "var(--font-display)" }}
        >
          <textPath href={`#${id}`}>{label}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-extrabold uppercase tracking-tight text-ink">
        {center}
      </span>
    </div>
  );
}

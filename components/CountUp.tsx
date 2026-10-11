"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { money } from "@/components/ui";

export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setV(to);
      return;
    }
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      {v}
    </span>
  );
}

export function Tween({ value, className }: { value: number; className?: string }) {
  const [v, setV] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, {
      duration: 0.45,
      ease: "easeOut",
      onUpdate: (x) => {
        prev.current = x;
        setV(Math.round(x / 100) * 100);
      },
    });
    return () => c.stop();
  }, [value]);
  return <span className={className}>{money(v)}</span>;
}

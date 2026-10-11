"use client";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n";

export function useT() {
  const { t } = useLocale();
  const s = (k: string): string => {
    const v = t(k);
    return typeof v === "string" ? v : String(v ?? "");
  };
  function a<T>(k: string): T[] {
    const v = t(k);
    return Array.isArray(v) ? (v as T[]) : [];
  }
  return { s, a };
}

export const money = (n: number) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

interface H2Props {
  title: string;
  mark: string;
  tone?: "light" | "dark" | "glove";
  className?: string;
}

export function H2({ title, mark, tone = "light", className = "" }: H2Props) {
  const color = tone === "dark" ? "text-white" : "text-ink";
  const markCls = tone === "glove" ? "mk-ink" : "mk";
  return (
    <h2
      className={`font-display text-[2rem] font-extrabold leading-[1.06] tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem] ${color} ${className}`}
    >
      {title} <mark className={markCls}>{mark}</mark>
    </h2>
  );
}

interface CallButtonsProps {
  tone?: "light" | "dark";
  smsHref?: string;
  callLabel?: string;
  smsLabel?: string;
  className?: string;
}

export function CallButtons({ tone = "light", smsHref, callLabel, smsLabel, className = "" }: CallButtonsProps) {
  const { s } = useT();
  const primary =
    "inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep";
  const secondary =
    tone === "dark"
      ? "inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-white px-6 font-display text-base font-extrabold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
      : "inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-ink hover:text-white";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={s("contact.phoneHref")} className={primary}>
        {callLabel ?? s("nav.call")}
      </a>
      <a href={smsHref ?? s("contact.smsHref")} className={secondary}>
        {smsLabel ?? s("nav.sms")}
      </a>
    </div>
  );
}

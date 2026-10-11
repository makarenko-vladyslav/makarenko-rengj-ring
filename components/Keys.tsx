
"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { H2, Kicker, useT } from "@/components/ui";

interface Row {
  fear: string;
  answer: string;
}

export default function Keys() {
  const { s, a } = useT();
  const rows = a<Row>("keys.rows");
  const reduce = useReducedMotion();
  const vref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce) vref.current?.pause();
  }, [reduce]);

  return (
    <section className="on-dark relative overflow-hidden bg-ink py-20 text-white lg:py-32">
      <video
        ref={vref}
        className="absolute inset-0 h-full w-full object-cover opacity-70 brightness-75"
        autoPlay
        muted
        loop
        playsInline
        poster={s("keys.poster")}
        src={s("keys.video")}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink/65" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 bottom-2 z-[1] select-none whitespace-nowrap font-display text-[clamp(6rem,20vw,18rem)] font-extrabold leading-none text-white/[0.06]"
      >
        {s("keys.watermark")}
      </span>
      <div className="wrap relative z-10">
        <Kicker className="text-glove">{s("keys.kicker")}</Kicker>
        <H2 title={s("keys.title")} mark={s("keys.mark")} tone="dark" className="mt-4 max-w-3xl" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{s("keys.lede")}</p>

        <div className="mt-12 hidden grid-cols-12 gap-8 border-b border-white/30 pb-2 md:grid">
          <p className="kicker col-span-5 text-glove">{s("keys.colA")}</p>
          <p className="kicker col-span-7 text-glove">{s("keys.colB")}</p>
        </div>
        <ul className="mt-12 border-t-2 border-white md:mt-0">
          {rows.map((r) => (
            <li key={r.fear} className="grid gap-3 border-b border-white/30 py-7 md:grid-cols-12 md:gap-8">
              <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white md:col-span-5 sm:text-3xl">
                {r.fear}
              </h3>
              <p className="text-base leading-relaxed text-white/85 md:col-span-7 sm:text-lg">{r.answer}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={s("contact.phoneHref")}
            className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-8 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
          >
            {s("keys.cta")} · {s("contact.phoneDisplay")}
          </a>
          <a
            href={s("contact.smsHref")}
            className="inline-flex min-h-11 items-center font-display text-base font-bold text-white underline decoration-glove decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-glove"
          >
            {s("nav.sms")} →
          </a>
        </div>
      </div>
    </section>
  );
}

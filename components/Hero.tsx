

"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/motion";
import { Seal } from "@/components/Seal";
import { useT } from "@/components/ui";

interface Row {
  n: string;
  p: string;
}
interface Meta {
  k: string;
  v: string;
}

export default function Hero() {
  const { s, a } = useT();
  const reduce = useReducedMotion();
  const vref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce) vref.current?.pause();
  }, [reduce]);

  const rows = a<Row>("hero.card.rows");
  const meta = a<Meta>("hero.meta");
  const ticker = a<string>("hero.ticker");

  return (
    <section id="top" className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <video
        ref={vref}
        className="absolute inset-0 h-full w-full object-cover opacity-80 brightness-75"
        autoPlay
        muted
        loop
        playsInline
        poster={s("hero.poster")}
        src={s("hero.video")}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-3 z-[1] select-none whitespace-nowrap font-display text-[clamp(9rem,28vw,24rem)] font-extrabold leading-none text-white/[0.06]"
      >
        {s("hero.watermark")}
      </span>

      <div className="relative z-10 flex flex-1 items-center pb-8 pt-24 lg:pt-28">
        <div className="wrap grid w-full items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="kicker text-glove">
              {s("hero.kicker")}
              <span className="hidden sm:inline"> · {s("hero.kickerMeta")}</span>
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] text-balance">
              <span>{s("hero.title")}</span>
              <mark className="mk mk-anim">{s("hero.mark")}</mark>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{s("hero.lede")}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex gap-3">
                <a
                  href={s("contact.phoneHref")}
                  className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
                >
                  {s("hero.call")}
                </a>
                <a
                  href={s("contact.smsHref")}
                  className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-white px-6 font-display text-base font-extrabold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  {s("hero.sms")}
                </a>
              </div>
              <a
                href="#kalkulator"
                className="inline-flex min-h-11 items-center font-display text-base font-bold text-white underline decoration-glove decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-glove"
              >
                {s("hero.calc")} →
              </a>
            </div>
            <dl className="mt-8 hidden max-w-2xl grid-cols-3 border-t border-white/25 pt-5 sm:grid">
              {meta.map((m, i) => (
                <div key={m.k} className={i > 0 ? "border-l border-white/25 pl-6" : "pr-6"}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-white/70">{m.k}</dt>
                  <dd className="mt-1 whitespace-nowrap font-display text-base font-bold text-white">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:rotate-[-2deg] xl:col-span-4">
            <div className="drop-shadow-[0_26px_36px_hsl(0_0%_0%/0.4)]">
              <div className="zig bg-white px-6 pb-12 pt-7 text-ink">
                <p className="kicker text-cobalt">{s("hero.card.title")}</p>
                <p className="mt-1 text-sm text-muted">{s("hero.card.sub")}</p>
                <ul className="mt-5 border-t-2 border-dashed border-ink/30">
                  {rows.map((r) => (
                    <li key={r.n} className="flex items-baseline gap-2 border-b border-dashed border-ink/20 py-3">
                      <span className="min-w-0 text-[0.95rem] font-medium leading-snug">{r.n}</span>
                      <span className="leader" aria-hidden="true" />
                      <span className="whitespace-nowrap font-display text-lg font-extrabold tabular-nums">
                        {r.p}&nbsp;{s("units.kr")}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-snug text-muted">{s("hero.card.note")}</p>
              </div>
            </div>
            <Seal
              id="seal-hero"
              label={s("hero.seal.label")}
              center={s("hero.seal.center")}
              className="absolute -right-2 -top-12 z-10 hidden sm:block lg:-right-6"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden border-t border-white/20 lg:block">
        <div className="wrap grid grid-cols-2 gap-10 py-4">
          <p className="max-w-sm text-sm leading-snug text-white/80">
            <span className="kicker mb-1 block text-glove">{s("hero.flankL.t")}</span>
            {s("hero.flankL.d")}
          </p>
          <p className="max-w-sm justify-self-end text-sm leading-snug text-white/80">
            <span className="kicker mb-1 block text-glove">{s("hero.flankR.t")}</span>
            {s("hero.flankR.d")}
          </p>
        </div>
      </div>

      <div className="relative isolate z-10 border-y border-white/20 bg-ink/50 py-3">
        <Marquee className="text-white">
          {ticker.map((t) => (
            <span key={t} className="mx-5 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.14em]">
              {t} <span className="ml-5 text-glove">·</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative z-10 hidden flex-col items-center pb-4 pt-3 sm:flex">
        <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white/80">{s("hero.scroll")}</span>
        <span className="mt-2 h-8 w-px animate-pulse bg-white/60" />
      </div>
    </section>
  );
}

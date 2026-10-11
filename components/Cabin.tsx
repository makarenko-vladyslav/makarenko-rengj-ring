"use client";
import { CallButtons, H2, Kicker, useT } from "@/components/ui";

interface Stat {
  n: string;
  l: string;
}
interface Phase {
  t: string;
  d: string;
}

export default function Cabin() {
  const { s, a } = useT();
  const stats = a<Stat>("cabin.stats");
  const phases = a<Phase>("cabin.phases");

  return (
    <section id="hytte" className="on-dark relative scroll-mt-16 overflow-hidden bg-ink py-20 text-white lg:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-6 select-none whitespace-nowrap font-display text-[clamp(7rem,22vw,20rem)] font-extrabold leading-none text-white/[0.05]"
      >
        {s("cabin.watermark")}
      </span>
      <div className="wrap relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Kicker className="text-glove">{s("cabin.kicker")}</Kicker>
            <H2 title={s("cabin.title")} mark={s("cabin.mark")} tone="dark" className="mt-4" />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{s("cabin.lede")}</p>
            <CallButtons tone="dark" className="mt-8" callLabel={s("cabin.cta")} smsLabel={s("cabin.sms")} />
          </div>
          <div className="lg:col-span-5">
            <ul className="border-t-2 border-glove">
              {stats.map((st) => (
                <li key={st.l} className="border-b border-white/25 py-6">
                  <p className="whitespace-nowrap font-display text-[2.4rem] font-extrabold leading-none tabular-nums text-glove sm:text-6xl">
                    {st.n}
                    <span className="ml-2 text-lg font-bold text-white">{s("units.kr")}</span>
                  </p>
                  <p className="mt-2 text-base text-white/80">{st.l}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-px border-t border-white/25 md:grid-cols-3">
          {phases.map((p) => (
            <div key={p.t} className="border-b border-white/25 py-6 md:border-b-0 md:py-8 md:pr-8">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-white">{p.t}</h3>
              <p className="mt-2 text-base leading-relaxed text-white/75">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-2 border-glove p-6 sm:p-8">
          <h3 className="font-display text-xl font-extrabold text-glove sm:text-2xl">{s("cabin.road.t")}</h3>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/85">{s("cabin.road.d")}</p>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { H2, Kicker, useT } from "@/components/ui";

interface Item {
  name: string;
  note: string;
}

export default function Checklist() {
  const { s, a } = useT();
  const items = a<Item>("checklist.items");
  const [done, setDone] = useState<number[]>([]);

  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const counter = s("checklist.counter")
    .replace("{n}", String(done.length))
    .replace("{total}", String(items.length));
  const pct = items.length ? (done.length / items.length) * 100 : 0;

  return (
    <section id="sjekkliste" className="on-dark scroll-mt-16 bg-cobalt py-20 text-white lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Kicker className="text-glove">{s("checklist.kicker")}</Kicker>
          <H2 title={s("checklist.title")} mark={s("checklist.mark")} tone="dark" className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">{s("checklist.lede")}</p>

          <div className="mt-8 border-2 border-white/40 p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">{s("checklist.bait.a")}</p>
                <p className="whitespace-nowrap font-display text-3xl font-extrabold tabular-nums sm:text-4xl">
                  {s("checklist.bait.from")}&nbsp;<span className="text-base">{s("units.kr")}</span>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">{s("checklist.bait.b")}</p>
                <p className="whitespace-nowrap font-display text-3xl font-extrabold tabular-nums text-glove line-through decoration-white decoration-[3px] sm:text-4xl">
                  {s("checklist.bait.to")}&nbsp;<span className="text-base">{s("units.kr")}</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/85">{s("checklist.bait.text")}</p>
          </div>

          <a
            href={s("contact.phoneHref")}
            className="mt-8 inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
          >
            {s("checklist.cta")}
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="drop-shadow-[0_24px_30px_hsl(228_55%_10%/0.35)]">
            <div className="zig bg-white px-5 pb-14 pt-7 text-ink sm:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">{s("checklist.cardTitle")}</h3>
                <p className="whitespace-nowrap font-display text-sm font-bold tabular-nums text-cobalt" aria-live="polite">
                  {counter}
                </p>
              </div>
              <div className="mt-3 h-2 bg-ink/15">
                <div className="h-full bg-cobalt transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-3 text-sm text-muted">{s("checklist.hint")}</p>

              <ul className="mt-3 border-t-2 border-ink">
                {items.map((it, i) => {
                  const on = done.includes(i);
                  return (
                    <li key={it.name} className="border-b border-dashed border-ink/25">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(i)}
                        className="group flex min-h-14 w-full items-center gap-4 py-3 text-left"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-6 w-6 shrink-0 border-2 border-ink transition-colors duration-300 ${
                            on ? "bg-glove" : "bg-white group-hover:bg-glove/50"
                          }`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block font-display text-lg font-extrabold leading-tight transition-colors duration-300 ${
                              on ? "text-muted line-through decoration-2" : "text-ink"
                            }`}
                          >
                            {it.name}
                          </span>
                          <span className="block text-sm text-muted">{it.note}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-muted">{s("checklist.note")}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDone(items.map((_, i) => i))}
                    className="min-h-11 border-2 border-ink px-4 font-display text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
                  >
                    {s("checklist.markAll")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDone([])}
                    className="min-h-11 px-3 font-display text-sm font-bold text-cobalt underline underline-offset-4 transition-colors duration-300 hover:text-ink"
                  >
                    {s("checklist.reset")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

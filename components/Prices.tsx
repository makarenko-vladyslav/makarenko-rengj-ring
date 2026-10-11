
"use client";
import { CallButtons, H2, Kicker, useT } from "@/components/ui";

interface Row {
  n: string;
  fr?: boolean;
  p: string;
  u: string;
  d: string;
  tag?: string;
}
interface Cat {
  label: string;
  items: Row[];
}

export default function Prices() {
  const { s, a } = useT();
  const cats = a<Cat>("prices.cats");
  const tags = a<string>("prices.sig.tags");

  return (
    <section id="priser" className="scroll-mt-16 bg-paper py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <Kicker className="text-cobalt">{s("prices.kicker")}</Kicker>
          <H2 title={s("prices.title")} mark={s("prices.mark")} className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{s("prices.lede")}</p>
          <figure className="mt-8 hidden lg:block">
            <img
              src={s("prices.image")}
              alt={s("prices.alt")}
              loading="lazy"
              className="photo aspect-[4/3] w-full border-2 border-ink object-cover"
            />
            <figcaption className="mt-3 flex items-center gap-3">
              <span className="h-px w-10 bg-ink" aria-hidden="true" />
              <span className="kicker text-ink/70">{s("hero.card.title")}</span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-8">
          <div className="border-2 border-ink bg-glove p-6 sm:p-8">
            <p className="kicker text-ink">{s("prices.main")}</p>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{s("prices.sig.name")}</h3>
              <span className="leader hidden text-ink sm:block" aria-hidden="true" />
              <p className="whitespace-nowrap font-display text-5xl font-extrabold tabular-nums text-ink sm:text-6xl">
                <span className="mr-1 text-sm font-semibold">{s("prices.fromWord")}</span>
                {s("prices.sig.from")}
                <span className="ml-1 text-base font-bold">{s("units.kr")}</span>
              </p>
            </div>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-ink">
              {s("prices.sig.per")}
              <span className="mx-2 opacity-50">·</span>
              <span className="normal-case tracking-normal">{s("prices.sig.range")}</span>
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/85">{s("prices.sig.desc")}</p>
            <p className="mt-4 border-t border-ink/30 pt-3 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-ink">
              {tags.join(" · ")}
            </p>
          </div>

          {cats.map((c) => (
            <div key={c.label} className="mt-10">
              <div className="flex items-center gap-4">
                <h3 className="kicker whitespace-nowrap text-cobalt">{c.label}</h3>
                <span className="h-px flex-1 bg-ink/30" aria-hidden="true" />
              </div>
              <ul className="mt-2 border-t-2 border-ink">
                {c.items.map((r) => (
                  <li key={r.n} className="border-b border-line py-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <h4 className="font-display text-lg font-extrabold leading-snug text-ink sm:text-xl">
                        {r.n}
                        {r.tag && (
                          <span className="ml-3 align-middle text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-cobalt">
                            {r.tag}
                          </span>
                        )}
                      </h4>
                      <span className="leader hidden text-ink sm:block" aria-hidden="true" />
                      <p className="whitespace-nowrap font-display text-2xl font-extrabold tabular-nums text-ink sm:text-3xl">
                        {r.fr && <span className="mr-1 text-xs font-semibold">{s("prices.fromWord")}</span>}
                        {r.p}
                        {r.u && <span className="ml-1 text-sm font-bold">{r.u}</span>}
                      </p>
                    </div>
                    <p className="mt-1 max-w-xl text-sm leading-snug text-muted">{r.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="mt-6 border-t-2 border-dashed border-ink/30 pt-4 text-sm text-muted">{s("prices.note")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CallButtons callLabel={s("prices.cta")} smsLabel={s("prices.sms")} />
            <a
              href="#kalkulator"
              className="inline-flex min-h-11 items-center font-display text-base font-bold text-cobalt underline decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-ink"
            >
              {s("prices.calcLink")} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

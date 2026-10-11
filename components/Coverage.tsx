
"use client";
import { H2, Kicker, useT } from "@/components/ui";

interface Place {
  n: string;
  d: string;
}

export default function Coverage() {
  const { s, a } = useT();
  const places = a<Place>("coverage.places");
  return (
    <section className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-4 select-none whitespace-nowrap font-display text-[clamp(6rem,18vw,16rem)] font-extrabold leading-none text-ink/[0.04]"
      >
        {s("coverage.watermark")}
      </span>
      <div className="wrap relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Kicker className="text-cobalt">{s("coverage.kicker")}</Kicker>
          <H2 title={s("coverage.title")} mark={s("coverage.mark")} className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{s("coverage.lede")}</p>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-cobalt">{places.length}</span>
            <span className="kicker text-ink/70">{s("coverage.countLabel")}</span>
          </p>
          <ul className="mt-4 grid grid-cols-2 border-t-2 border-ink">
            {places.map((p) => (
              <li key={p.n} className="border-b border-line py-3 pr-2 font-display text-xl font-extrabold tracking-tight text-ink">
                {p.n}
                {p.d && <span className="ml-2 text-sm font-semibold text-muted">{p.d}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base font-semibold text-ink">{s("coverage.more")}</p>
        </div>
        <div className="lg:col-span-7">
          <iframe
            title={s("coverage.mapTitle")}
            src={s("coverage.mapSrc")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full border-2 border-ink bg-mist lg:h-[32rem]"
          />
          <a
            href={s("coverage.mapLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center font-display text-base font-bold text-cobalt underline underline-offset-4 transition-colors duration-300 hover:text-ink"
          >
            {s("coverage.mapLinkText")} →
          </a>
        </div>
      </div>
    </section>
  );
}

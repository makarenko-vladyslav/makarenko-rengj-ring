
"use client";
import { H2, Kicker, useT } from "@/components/ui";

interface QA {
  q: string;
  a: string;
}

export default function Faq() {
  const { s, a } = useT();
  const items = a<QA>("faq.items");
  return (
    <section id="sporsmal" className="relative scroll-mt-16 overflow-hidden bg-white py-20 lg:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-2 select-none whitespace-nowrap font-display text-[clamp(7rem,22vw,20rem)] font-extrabold leading-none text-ink/[0.04]"
      >
        {s("faq.watermark")}
      </span>
      <div className="wrap relative z-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker className="text-cobalt">{s("faq.kicker")}</Kicker>
            <H2 title={s("faq.title")} mark={s("faq.mark")} className="mt-4" />
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{s("faq.lede")}</p>
            <p className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-cobalt">{items.length}</span>
              <span className="kicker text-ink/70">{s("faq.countLabel")}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-ink">
          {items.map((it, i) => (
            <details key={it.q} className="group border-b border-line" open={i === 0}>
              <summary className="flex min-h-[4rem] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-extrabold leading-snug tracking-tight text-ink transition-colors duration-300 hover:text-cobalt sm:text-2xl [&::-webkit-details-marker]:hidden">
                <span>{it.q}</span>
                <span className="relative block h-5 w-5 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted sm:text-lg">{it.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="font-display text-lg font-bold text-ink">{s("faq.ctaText")}</p>
          <a
            href={s("contact.phoneHref")}
            className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
          >
            {s("faq.cta")}
          </a>
          <a
            href={s("contact.smsHref")}
            className="inline-flex min-h-11 items-center font-display text-base font-bold text-cobalt underline decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-ink"
          >
            {s("nav.sms")} →
          </a>
        </div>
      </div>
    </section>
  );
}

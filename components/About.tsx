
"use client";
import { CountUp } from "@/components/CountUp";
import { H2, Kicker, useT } from "@/components/ui";

interface Fact {
  n: number;
  l: string;
}

export default function About() {
  const { s, a } = useT();
  const paras = a<string>("about.paras");
  const facts = a<Fact>("about.facts");
  return (
    <section className="bg-glove py-20 text-ink lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Kicker className="text-ink">{s("about.kicker")}</Kicker>
          <H2 title={s("about.title")} mark={s("about.mark")} tone="glove" className="mt-4" />
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink/90 sm:text-lg">
            {paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-8 border-l-[6px] border-ink pl-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            {s("about.quote")}
          </blockquote>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 text-sm">
            <span className="h-px w-8 bg-ink" aria-hidden="true" />
            <span className="font-display text-base font-extrabold">{s("about.person.name")}</span>
            <span className="text-ink/80">{s("about.person.role")}</span>
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-ink pt-6">
            {facts.map((f) => (
              <div key={f.l}>
                <dd className="order-1 font-display text-5xl font-extrabold leading-none tabular-nums sm:text-6xl">
                  <CountUp to={f.n} />
                </dd>
                <dt className="mt-2 text-sm font-semibold leading-snug text-ink/80">{f.l}</dt>
              </div>
            ))}
          </dl>
          <a
            href="#priser"
            className="mt-8 inline-flex min-h-11 items-center font-display text-base font-extrabold underline decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-cobalt"
          >
            {s("about.priceLink")} →
          </a>
        </div>

        <div className="lg:col-span-5">
          <figure className="mx-auto max-w-md lg:max-w-none">
            <div className="relative pb-12 pr-8 sm:pr-12">
              <img
                src={s("about.photoA")}
                alt={s("about.photoAAlt")}
                loading="lazy"
                className="photo aspect-[4/5] w-full border-2 border-ink object-cover"
              />
              <img
                src={s("about.photoB")}
                alt={s("about.photoBAlt")}
                loading="lazy"
                className="photo absolute bottom-0 right-0 aspect-[4/3] w-[52%] rotate-3 border-4 border-ink object-cover shadow-[0_18px_24px_hsl(228_55%_10%/0.25)]"
              />
            </div>
            <figcaption className="flex items-center gap-3">
              <span className="h-px w-10 bg-ink" aria-hidden="true" />
              <span className="kicker text-ink">{s("about.caption")}</span>
            </figcaption>
          </figure>

          <div className="on-dark mt-10 bg-ink p-6 text-white sm:p-10">
            <p className="kicker text-glove">{s("about.panelLabel")}</p>
            <p className="mt-4 whitespace-nowrap font-display text-[2.4rem] font-extrabold leading-none tracking-tight text-glove sm:text-6xl">
              {s("contact.phoneBig")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/85">{s("about.panelNote")}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={s("contact.phoneHref")}
                className="flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-glove bg-glove font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
              >
                {s("about.call")}
              </a>
              <a
                href={s("contact.smsHref")}
                className="flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-white font-display text-base font-extrabold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
              >
                {s("about.sms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

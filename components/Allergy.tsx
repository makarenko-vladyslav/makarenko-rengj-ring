
"use client";
import { H2, Kicker, useT } from "@/components/ui";

interface Block {
  t: string;
  d: string;
}

export default function Allergy() {
  const { s, a } = useT();
  const blocks = a<Block>("allergy.blocks");
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-5">
          <img
            src={s("allergy.image")}
            alt={s("allergy.alt")}
            loading="lazy"
            className="photo mx-auto aspect-[4/5] w-full max-w-md border-2 border-ink object-cover lg:max-w-none"
          />
          <figcaption className="mx-auto mt-3 flex max-w-md items-center gap-3 lg:max-w-none">
            <span className="h-px w-10 bg-ink" aria-hidden="true" />
            <span className="kicker text-ink/70">{s("allergy.caption")}</span>
          </figcaption>
        </figure>
        <div className="lg:col-span-7">
          <Kicker className="text-cobalt">{s("allergy.kicker")}</Kicker>
          <H2 title={s("allergy.title")} mark={s("allergy.mark")} className="mt-4" />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{s("allergy.lede")}</p>
          <ul className="mt-8 border-t-2 border-ink">
            {blocks.map((b) => (
              <li key={b.t} className="border-b border-line py-6">
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">{b.t}</h3>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{b.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={s("contact.phoneHref")}
              className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
            >
              {s("allergy.cta")}
            </a>
            <a
              href={s("contact.smsHref")}
              className="inline-flex min-h-11 items-center font-display text-base font-bold text-cobalt underline decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-ink"
            >
              {s("nav.sms")} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

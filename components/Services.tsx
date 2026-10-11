
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { H2, Kicker, useT } from "@/components/ui";

interface Cat {
  label: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  items: string[];
}

export default function Services() {
  const { s, a } = useT();
  const cats = a<Cat>("services.cats");
  const [active, setActive] = useState(0);
  const cat = cats[active] ?? cats[0];
  if (!cat) return null;

  return (
    <section id="tjenester" className="scroll-mt-16 bg-paper py-20 lg:py-28">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker className="text-cobalt">{s("services.kicker")}</Kicker>
            <H2 title={s("services.title")} mark={s("services.mark")} className="mt-4" />
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg lg:col-span-5">{s("services.lede")}</p>
        </div>

        <div
          role="group"
          aria-label={s("services.tabsLabel")}
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {cats.map((c, i) => (
            <button
              key={c.label}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={`min-h-11 shrink-0 whitespace-nowrap border-2 border-ink px-4 font-display text-sm font-extrabold transition-colors duration-300 ${
                active === i ? "bg-ink text-white" : "bg-white text-ink hover:bg-glove"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-14"
          >
            <figure className="lg:col-span-5">
              <img
                src={cat.image}
                alt={cat.alt}
                loading="lazy"
                className="photo aspect-[4/3] w-full border-2 border-ink object-cover object-top lg:aspect-[4/5]"
              />
              <figcaption className="mt-3 flex items-center gap-3">
                <span className="h-px w-10 bg-ink" aria-hidden="true" />
                <span className="kicker text-ink/70">{cat.label}</span>
              </figcaption>
            </figure>
            <div className="lg:col-span-7">
              <p className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-cobalt">
                  {cat.items.length}
                </span>
                <span className="kicker text-ink/70">{s("services.countLabel")}</span>
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{cat.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{cat.desc}</p>
              <ul className="mt-8 border-t-2 border-ink">
                {cat.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-baseline gap-3 border-b border-line py-3.5 font-display text-lg font-bold text-ink sm:text-xl"
                  >
                    <span className="text-cobalt" aria-hidden="true">
                      →
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={s("contact.phoneHref")}
                  className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
                >
                  {s("services.cta")}
                </a>
                <a
                  href="#priser"
                  className="inline-flex min-h-11 items-center font-display text-base font-bold text-cobalt underline decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-ink"
                >
                  {s("services.priceLink")} →
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

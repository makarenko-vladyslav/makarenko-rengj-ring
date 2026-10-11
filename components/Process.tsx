
"use client";
import { CallButtons, H2, Kicker, useT } from "@/components/ui";

interface Step {
  t: string;
  d: string;
}

export default function Process() {
  const { s, a } = useT();
  const steps = a<Step>("process.steps");
  return (
    <section className="bg-mist py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Kicker className="text-cobalt">{s("process.kicker")}</Kicker>
          <H2 title={s("process.title")} mark={s("process.mark")} className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{s("process.lede")}</p>
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-cobalt">{steps.length}</span>
            <span className="kicker text-ink/70">{s("process.countLabel")}</span>
          </p>
          <ol className="mt-6 border-t-2 border-ink">
            {steps.map((st, i) => (
              <li
                key={st.t}
                className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[5rem_1fr] sm:gap-6"
              >
                <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-cobalt sm:text-6xl">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{st.t}</h3>
                  <p className="mt-1 max-w-lg text-base leading-relaxed text-muted">{st.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <CallButtons className="mt-8" />
        </div>
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <img
              src={s("process.image")}
              alt={s("process.alt")}
              loading="lazy"
              className="photo aspect-[4/5] w-full border-2 border-ink object-cover"
            />
            <p className="absolute bottom-0 left-0 bg-glove px-4 py-2 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-ink">
              {s("process.caption")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

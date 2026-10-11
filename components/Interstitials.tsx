
"use client";
import { Marquee } from "@/components/motion";
import { useT } from "@/components/ui";

/* Labeled hairline: thin rule, small caps label, thin rule. */
export function Hairline() {
  const { s } = useT();
  return (
    <div className="bg-paper pb-1 pt-1" aria-hidden="true">
      <div className="wrap flex items-center gap-4 py-4">
        <span className="h-px flex-1 bg-ink/30" />
        <p className="kicker text-center text-cobalt">{s("inter.hairline")}</p>
        <span className="h-px flex-1 bg-ink/30" />
      </div>
    </div>
  );
}

/* Text ticker on the glove-yellow ground. */
export function PhraseStrip() {
  const { a } = useT();
  const items = a<string>("inter.marquee");
  return (
    <div className="relative isolate z-0 border-y-2 border-ink bg-glove py-3 text-ink">
      <Marquee className="text-ink">
        {items.map((t) => (
          <span key={t} className="mx-5 whitespace-nowrap font-display text-base font-extrabold uppercase tracking-[0.1em] sm:text-lg">
            {t} <span className="ml-5">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* Oversized one-sentence statement band. */
export function Statement() {
  const { s } = useT();
  return (
    <div className="on-dark bg-ink py-10 text-white sm:py-12">
      <div className="wrap flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <p className="max-w-4xl font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          {s("inter.statement")} <mark className="mk">{s("inter.statementMark")}</mark>
        </p>
        <p className="kicker whitespace-nowrap text-glove">{s("inter.statementSub")}</p>
      </div>
    </div>
  );
}

/* Shaped colour transition: the receipt's torn edge rising into the paper ground. */
export function ZigEdge() {
  return (
    <div className="bg-paper" aria-hidden="true">
      <div className="zig h-3 rotate-180 bg-white" />
    </div>
  );
}

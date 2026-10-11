
"use client";
import { useState } from "react";
import pricing from "@/lib/pricing.json";
import { Seal } from "@/components/Seal";
import { Tween } from "@/components/CountUp";
import { H2, Kicker, money, useT } from "@/components/ui";

interface Mode {
  baseM2: number;
  baseLow: number;
  perLow: number;
  minLow: number;
  baseHigh: number;
  perHigh: number;
  minHigh: number;
}

const MODE_KEYS = ["flytting", "storvask", "hytte"] as const;
type ModeKey = (typeof MODE_KEYS)[number];

export default function Calculator() {
  const { s } = useT();
  const [mode, setMode] = useState<ModeKey>("flytting");
  const [m2, setM2] = useState<number>(pricing.area.default);
  const cfg = (pricing.modes as Record<string, Mode>)[mode];
  const { min, max, step } = pricing.area;

  const over = Math.max(0, m2 - cfg.baseM2);
  const low = Math.round(Math.max(cfg.minLow, cfg.baseLow + over * cfg.perLow) / 100) * 100;
  const high = Math.round(Math.max(cfg.minHigh, cfg.baseHigh + over * cfg.perHigh) / 100) * 100;
  const pct = ((m2 - min) / (max - min)) * 100;

  const smsBody = s("calc.smsBody")
    .replace("{tjeneste}", s(`calc.modes.${mode}.label`).toLowerCase())
    .replace("{areal}", String(m2));
  const smsHref = `${s("contact.smsHref")}?body=${encodeURIComponent(smsBody)}`;

  return (
    <section id="kalkulator" className="scroll-mt-16 bg-mist py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Kicker className="text-cobalt">{s("calc.kicker")}</Kicker>
          <H2 title={s("calc.title")} mark={s("calc.mark")} className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{s("calc.lede")}</p>

          <fieldset className="mt-8">
            <legend className="font-display text-sm font-extrabold text-ink">{s("calc.modeLabel")}</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {MODE_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={mode === k}
                  onClick={() => setMode(k)}
                  className={`min-h-12 border-2 border-ink px-2 font-display text-sm font-extrabold transition-colors duration-300 sm:text-base ${
                    mode === k ? "bg-ink text-white" : "bg-white text-ink hover:bg-glove"
                  }`}
                >
                  {s(`calc.modes.${k}.label`)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">{s(`calc.modes.${mode}.desc`)}</p>
            <div className="mt-4 border-t border-ink/25 pt-3">
              <p className="kicker text-cobalt">{s("calc.rateLabel")}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-ink">{s(`calc.modes.${mode}.rate`)}</p>
            </div>
          </fieldset>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="area" className="font-display text-sm font-extrabold text-ink">
                {s("calc.areaLabel")}
              </label>
              <p className="whitespace-nowrap font-display text-3xl font-extrabold tabular-nums text-ink">
                {m2}&nbsp;<span className="text-base">{s("units.m2")}</span>
              </p>
            </div>
            <input
              id="area"
              type="range"
              className="rng mt-2"
              min={min}
              max={max}
              step={step}
              value={m2}
              onChange={(e) => setM2(Number(e.target.value))}
              style={{ "--p": `${pct}%` } as React.CSSProperties}
            />
            <div className="flex justify-between text-xs font-semibold text-muted">
              <span>
                {min}&nbsp;{s("units.m2")}
              </span>
              <span>
                {max}&nbsp;{s("units.m2")}
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{s("calc.fine")}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-lg lg:mt-6">
            <div className="drop-shadow-[0_24px_30px_hsl(228_55%_10%/0.22)]">
              <div className="zig bg-white px-6 pb-14 pt-8 text-ink sm:px-9">
                <p className="kicker text-cobalt">{s("calc.resultLabel")}</p>
                <div aria-live="polite" className="mt-3">
                  <p className="font-display text-sm font-bold text-muted">{s("units.from")}</p>
                  <p className="whitespace-nowrap font-display text-[3.25rem] font-extrabold leading-none tabular-nums sm:text-7xl">
                    <Tween value={low} />
                    <span className="ml-2 text-xl font-bold">{s("units.kr")}</span>
                  </p>
                  <p className="mt-3 font-display text-sm font-bold text-muted">{s("units.to")}</p>
                  <p className="whitespace-nowrap font-display text-4xl font-extrabold leading-none tabular-nums text-cobalt sm:text-5xl">
                    <Tween value={high} />
                    <span className="ml-2 text-lg font-bold">{s("units.kr")}</span>
                  </p>
                </div>
                <div className="mt-6 border-t-2 border-dashed border-ink/30 pt-4">
                  <p className="kicker text-ink/70">{s("calc.includesLabel")}</p>
                  <p className="mt-2 text-base leading-relaxed">{s(`calc.modes.${mode}.includes`)}</p>
                  <p className="mt-3 whitespace-nowrap text-sm font-semibold text-muted">
                    {money(low)} – {money(high)}&nbsp;{s("units.kr")}
                  </p>
                </div>
              </div>
            </div>
            <Seal
              id="seal-calc"
              label={s("calc.seal.label")}
              center={s("calc.seal.center")}
              className="absolute -right-3 -top-10 z-10 sm:-right-8"
            />
          </div>
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap gap-3">
            <a
              href={s("contact.phoneHref")}
              className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
            >
              {s("calc.cta")}
            </a>
            <a
              href={smsHref}
              className="inline-flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink px-6 font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              {s("calc.sms")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

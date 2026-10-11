
"use client";
import { useRef, useState } from "react";
import { CallButtons, H2, Kicker, useT } from "@/components/ui";

type Status = "idle" | "sending" | "ok" | "fail";

interface Channel {
  k: string;
  v: string;
}

export default function Contact() {
  const { s, a } = useT();
  const services = a<string>("contact.form.services");
  const channels = a<Channel>("contact.channels");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const L = {
    name: s("contact.form.name"),
    phone: s("contact.form.phone"),
    service: s("contact.form.service"),
    area: s("contact.form.area"),
    date: s("contact.form.date"),
    message: s("contact.form.message"),
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(fd.get(L.name) ?? "").trim()) errs.name = s("contact.form.errRequired");
    const digits = String(fd.get(L.phone) ?? "").replace(/[^\d+]/g, "");
    if (digits.length < 8) errs.phone = s("contact.form.errPhone");
    if (!String(fd.get(L.service) ?? "")) errs.service = s("contact.form.errService");
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.dataset.invalid = "true";
      return;
    }
    delete form.dataset.invalid;
    setStatus("sending");
    const t0 = Date.now();
    const tick = () => {
      const st = form.dataset.sent;
      if (st === "true") return setStatus("ok");
      if (st === "failed") return setStatus("fail");
      if (!st && Date.now() - t0 > 600) return setStatus("ok");
      if (Date.now() - t0 > 30000) return setStatus("fail");
      window.setTimeout(tick, 250);
    };
    window.setTimeout(tick, 300);
  }

  const field =
    "mt-1 min-h-12 w-full border-2 border-ink bg-white px-3 text-base text-ink placeholder:text-muted focus:border-cobalt focus:outline-none";
  const label = "block font-display text-sm font-extrabold text-ink";
  const err = "mt-1 text-sm font-semibold text-[hsl(0_75%_38%)]";

  return (
    <section id="kontakt" className="on-dark relative scroll-mt-16 overflow-hidden bg-cobalt py-20 text-white lg:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 -top-4 select-none whitespace-nowrap font-display text-[clamp(8rem,26vw,22rem)] font-extrabold leading-none text-white/[0.07]"
      >
        {s("contact.watermark")}
      </span>
      <div className="wrap relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Kicker className="text-glove">{s("contact.kicker")}</Kicker>
          <H2 title={s("contact.title")} mark={s("contact.mark")} tone="dark" className="mt-4" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">{s("contact.lede")}</p>
          <CallButtons tone="dark" className="mt-6" />
          <p className="mt-4 border-l-4 border-glove pl-3 text-sm font-semibold text-white/90">{s("contact.trust")}</p>

          <dl className="mt-8 border-t-2 border-white">
            <div className="border-b border-white/30 py-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-white/70">{s("contact.callLabel")}</dt>
              <dd>
                <a
                  href={s("contact.phoneHref")}
                  className="inline-flex min-h-11 items-center whitespace-nowrap font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 hover:text-glove sm:text-4xl"
                >
                  {s("contact.phoneDisplay")}
                </a>
              </dd>
            </div>
            <div className="border-b border-white/30 py-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-white/70">{s("contact.emailLabel")}</dt>
              <dd>
                <a
                  href={s("contact.emailHref")}
                  className="inline-flex min-h-11 items-center break-all font-display text-lg font-bold transition-colors duration-300 hover:text-glove"
                >
                  {s("contact.email")}
                </a>
              </dd>
            </div>
            <div className="border-b border-white/30 py-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-white/70">{s("contact.addressLabel")}</dt>
              <dd className="flex flex-wrap items-baseline gap-x-4">
                <span className="font-display text-lg font-bold">{s("contact.place")}</span>
                <a
                  href={s("coverage.mapLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-display text-base font-bold underline decoration-glove decoration-[3px] underline-offset-[6px] transition-colors duration-300 hover:text-glove"
                >
                  {s("coverage.mapLinkText")} →
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="kicker text-glove">{s("contact.channelsTitle")}</p>
            <ul className="mt-2 border-t border-white/30">
              {channels.map((c) => (
                <li key={c.k} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-white/20 py-2.5 text-sm">
                  <span className="font-display font-extrabold">{c.k}</span>
                  <span className="text-white/85">{c.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <img
            src={s("contact.image")}
            alt={s("contact.alt")}
            loading="lazy"
            className="photo mt-8 hidden aspect-[4/3] w-full border-2 border-white object-cover object-top lg:block"
          />
        </div>

        <div className="lg:col-span-7">
          {status === "ok" ? (
            <div className="bg-white p-8 text-ink sm:p-10" role="status">
              <h3 className="font-display text-3xl font-extrabold tracking-tight">{s("contact.form.successTitle")}</h3>
              <p className="mt-3 text-lg text-muted">{s("contact.form.successText")}</p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="bg-white p-6 text-ink sm:p-10"
            >
              <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                {s("contact.form.title")}
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className={label}>{L.name}</label>
                  <input id="f-name" name={L.name} type="text" autoComplete="name" placeholder={s("contact.form.namePh")} className={field} aria-invalid={!!errors.name} />
                  {errors.name && <p className={err}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="f-phone" className={label}>{L.phone}</label>
                  <input id="f-phone" name={L.phone} type="tel" autoComplete="tel" inputMode="tel" placeholder={s("contact.form.phonePh")} className={field} aria-invalid={!!errors.phone} />
                  {errors.phone && <p className={err}>{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-service" className={label}>{L.service}</label>
                  <select id="f-service" name={L.service} defaultValue="" className={field} aria-invalid={!!errors.service}>
                    <option value="">{s("contact.form.serviceChoose")}</option>
                    {services.map((sv) => (
                      <option key={sv} value={sv}>{sv}</option>
                    ))}
                  </select>
                  {errors.service && <p className={err}>{errors.service}</p>}
                </div>
                <div>
                  <label htmlFor="f-area" className={label}>{L.area}</label>
                  <input id="f-area" name={L.area} type="number" inputMode="numeric" min={1} placeholder={s("contact.form.areaPh")} className={field} />
                </div>
                <div>
                  <label htmlFor="f-date" className={label}>{L.date}</label>
                  <input id="f-date" name={L.date} type="date" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-msg" className={label}>{L.message}</label>
                  <textarea id="f-msg" name={L.message} rows={4} placeholder={s("contact.form.messagePh")} className={`${field} py-3`} />
                </div>
              </div>

              {status === "fail" && (
                <p className="mt-5 border-2 border-[hsl(0_75%_38%)] p-3 text-sm font-semibold text-[hsl(0_75%_38%)]" role="alert">
                  {s("contact.form.fail")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 flex min-h-[3.5rem] w-full items-center justify-center whitespace-nowrap bg-ink px-6 font-display text-base font-extrabold text-white transition-colors duration-300 hover:bg-cobalt disabled:opacity-70"
              >
                {status === "sending" ? s("contact.form.sending") : status === "fail" ? s("contact.form.retry") : s("contact.form.submit")}
              </button>
              <p className="mt-4 text-sm text-muted">{s("contact.form.note")}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

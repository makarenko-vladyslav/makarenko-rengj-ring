"use client";
import { CallButtons, useT } from "@/components/ui";

interface NavItem {
  label: string;
  href: string;
}

export default function Footer() {
  const { s, a } = useT();
  const nav = a<NavItem>("nav.items");
  const wash = a<string>("footer.wash");
  const link = "inline-flex min-h-11 items-center text-base text-white/80 transition-colors duration-300 hover:text-glove";

  return (
    <footer className="on-dark relative bg-ink text-white">
      <div className="zig absolute inset-x-0 top-0 h-3 -translate-y-[11px] rotate-180 bg-ink" aria-hidden="true" />
      <div className="wrap pt-16">
        <div className="flex flex-col gap-6 border-b border-white/20 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker text-glove">{s("footer.callLine")}</p>
            <a
              href={s("contact.phoneHref")}
              className="mt-2 inline-block whitespace-nowrap py-2 font-display text-[2.4rem] font-extrabold leading-none tracking-tight transition-colors duration-300 hover:text-glove sm:text-6xl"
            >
              {s("contact.phoneDisplay")}
            </a>
          </div>
          <CallButtons tone="dark" />
        </div>

        <div className="grid gap-12 border-b border-white/20 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-display text-2xl font-extrabold tracking-tight">
              {s("brand.name")}&nbsp;<span className="font-medium text-white/70">{s("brand.type")}</span>
            </p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">{s("footer.tagline")}</p>
            <p className="mt-5 border-t-2 border-dashed border-white/25 pt-4 text-sm text-white/65">{s("footer.note")}</p>
          </div>

          <nav aria-label={s("footer.navTitle")} className="lg:col-span-3 lg:col-start-6">
            <p className="kicker text-glove">{s("footer.navTitle")}</p>
            <ul className="mt-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={link}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="kicker text-glove">{s("footer.washTitle")}</p>
            <ul className="mt-3">
              {wash.map((w) => (
                <li key={w} className="flex min-h-11 items-center text-base text-white/80">{w}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="kicker text-glove">{s("footer.contactTitle")}</p>
            <ul className="mt-3">
              <li><a href={s("contact.phoneHref")} className={`${link} whitespace-nowrap font-bold text-white`}>{s("contact.phoneDisplay")}</a></li>
              <li><a href={s("contact.smsHref")} className={link}>{s("nav.sms")}</a></li>
              <li><a href={s("contact.emailHref")} className={`${link} break-all`}>{s("contact.email")}</a></li>
              <li className="flex min-h-11 items-center text-base text-white/80">{s("contact.place")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-sm text-white/70">
          <p>{s("footer.legal")}</p>
          <p className="flex flex-wrap items-center gap-x-1">
            {s("footer.credit")}{" "}
            <a
              href={s("footer.creditHref")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center py-2 font-bold text-white underline underline-offset-4 transition-colors duration-300 hover:text-glove"
            >
              {s("footer.creditName")}
            </a>
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center py-2 font-bold text-glove underline underline-offset-4">
            {s("footer.top")} ↑
          </a>
        </div>
      </div>

      <div className="overflow-hidden" aria-hidden="true">
        <p className="wrap -mb-[0.12em] select-none whitespace-nowrap font-display text-[clamp(3.5rem,17.5vw,17rem)] font-extrabold leading-[0.82] tracking-[-0.04em] text-glove">
          {s("brand.name")}
        </p>
      </div>
      <div className="mt-4 text-center text-xs opacity-70"><a href="/privacy" className="underline hover:no-underline">Personvernerklæring</a></div>
    </footer>
  );
}

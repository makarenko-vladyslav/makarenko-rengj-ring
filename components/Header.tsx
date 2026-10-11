
"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/components/ui";

interface NavItem {
  label: string;
  href: string;
}

export default function Header() {
  const { s, a } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = a<NavItem>("nav.items");
  const desktopCount = Number(s("nav.desktopCount")) || 5;

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [open]);

  const tone = scrolled ? "text-ink" : "text-white";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[45] h-16 transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-paper" : "bg-transparent"
        }`}
      >
        <div className="wrap flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            aria-label={s("nav.homeAria")}
            className={`flex min-h-11 items-center font-display text-[1.05rem] font-extrabold tracking-tight sm:text-xl ${tone}`}
          >
            {s("brand.name")}&nbsp;<span className="font-medium opacity-80">{s("brand.type")}</span>
          </a>

          <nav aria-label={s("nav.menuLabel")} className="hidden items-center gap-7 lg:flex">
            {items.slice(0, desktopCount).map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`font-display text-sm font-bold underline decoration-glove decoration-[3px] underline-offset-[6px] [text-decoration-color:transparent] transition-[text-decoration-color] duration-300 hover:[text-decoration-color:hsl(48_98%_55%)] ${tone}`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={s("contact.phoneHref")}
              className={`hidden whitespace-nowrap font-display text-sm font-bold xl:inline ${tone}`}
            >
              {s("contact.phoneDisplay")}
            </a>
            <a
              href={s("contact.phoneHref")}
              className="hidden min-h-11 items-center whitespace-nowrap border-2 border-ink bg-glove px-5 font-display text-sm font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep lg:inline-flex"
            >
              {s("nav.call")}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={s("nav.openAria")}
              aria-expanded={open}
              className={`flex h-11 items-center gap-3 px-1 font-display text-sm font-bold ${tone}`}
            >
              <span className="hidden sm:inline">{s("nav.menu")}</span>
              <span className="flex w-7 flex-col gap-[6px]" aria-hidden="true">
                <span className="h-[3px] w-full bg-current" />
                <span className="h-[3px] w-2/3 self-end bg-current" />
                <span className="h-[3px] w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={s("nav.menuLabel")}
            className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cobalt text-white"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="wrap flex h-16 shrink-0 items-center justify-between">
              <span className="font-display text-[1.05rem] font-extrabold tracking-tight sm:text-xl">
                {s("brand.name")}&nbsp;<span className="font-medium opacity-80">{s("brand.type")}</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={s("nav.closeAria")}
                className="flex h-11 items-center gap-3 border-2 border-white px-4 font-display text-sm font-extrabold transition-colors duration-300 hover:bg-white hover:text-cobalt"
              >
                {s("nav.closeLabel")}
                <span className="relative block h-4 w-4" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav className="wrap flex flex-1 flex-col justify-center py-6" aria-label={s("nav.menuLabel")}>
              <ul>
                {items.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    className="border-b border-white/20"
                  >
                    <a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-[clamp(2rem,8vw,4.25rem)] font-extrabold leading-tight tracking-tight transition-colors duration-300 hover:text-glove"
                    >
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="wrap shrink-0 pb-8">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={s("contact.phoneHref")}
                  className="flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-ink bg-glove font-display text-base font-extrabold text-ink transition-colors duration-300 hover:bg-glove-deep"
                >
                  {s("nav.call")}
                </a>
                <a
                  href={s("contact.smsHref")}
                  className="flex min-h-[3.25rem] items-center justify-center whitespace-nowrap border-2 border-white font-display text-base font-extrabold transition-colors duration-300 hover:bg-white hover:text-cobalt"
                >
                  {s("nav.sms")}
                </a>
              </div>
              <p className="mt-4 whitespace-nowrap font-display text-lg font-bold">{s("contact.phoneDisplay")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

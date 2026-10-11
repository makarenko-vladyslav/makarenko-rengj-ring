"use client";
import { useT } from "@/components/ui";

export default function BottomNav() {
  const { s } = useT();
  return (
    <nav
      aria-label={s("nav.bottomLabel")}
      className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-2 border-t-2 border-ink md:hidden"
    >
      <a
        href={s("contact.phoneHref")}
        className="flex min-h-11 items-center justify-center bg-glove py-3 font-display text-base font-extrabold text-ink transition-colors duration-300 active:bg-glove-deep"
      >
        {s("nav.call")}
      </a>
      <a
        href={s("contact.smsHref")}
        className="flex min-h-11 items-center justify-center bg-ink py-3 font-display text-base font-extrabold text-white transition-colors duration-300 active:bg-cobalt"
      >
        {s("nav.sms")}
      </a>
    </nav>
  );
}

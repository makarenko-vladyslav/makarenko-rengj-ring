import { FormBridge } from "@/components/form-bridge";
import { MotionLayer } from "@/components/motion-layer";
import "./motion-layer.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import content from "@/lib/content.json";
import "./globals.css";

const meta = content.locales.no.meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords.split(",").map((k: string) => k.trim()),
  icons: { icon: `${process.env.SITE_BASE_PATH ?? ""}/icon.svg` },
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html style={{ "--motion-duration": "1s", "--motion-stagger": "0.09s", "--motion-shift": "24px", "--motion-ease": "cubic-bezier(0.16, 1, 0.3, 1)" } as React.CSSProperties} lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
              <script type="application/ld+json">{"{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Makarenko Rengjøring\",\"description\":\"Makarenko Rengjøring — це прибиральна фірма в Нуттодені (Телемарк, Норвегія), яку веде Микола Макаренко. Вона прибирає квартири, будинки та хюттери для приватних клієнтів, а також малі офіси й борettслаг. Клієнти зараз приходять через знайомих і по телефону, сайт має дати їм ціни наперед і простий спосіб зателефонувати або написати SMS.\",\"telephone\":[\"+4796684397\"],\"email\":\"ishop.inform@gmail.com\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Notodden\",\"addressCountry\":\"no\"}}"}</script>
              <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      <SmoothScroll />
        <MotionLayer />
        <FormBridge endpoint="https://rapier.46.225.105.129.sslip.io/api/site-forms/cmv345nw600021xwkey7vm1tg.a08a46ec7303bebf16f9908e8808a2888af7f4e9c1fe8d09b3c6fc691f5552a7" />
      </body>
    </html>
  );
}

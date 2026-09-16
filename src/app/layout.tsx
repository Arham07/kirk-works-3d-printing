import type { Metadata } from "next";
import { business } from "@/content/business";
import { CallBar } from "@/components/cta/CallBar";
import { SiteFooter } from "@/components/nav/SiteFooter";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  // Geography in the title. The original had none at all, which for a local
  // service business is the single cheapest thing left on the table.
  title: {
    default: "Custom 3D Printing in Helena, AL | KirkWorks3D Print Studio",
    template: "%s | KirkWorks3D Print Studio",
  },
  description:
    "Owner-operated custom 3D printing in Helena, Alabama. Custom prints, HueForge photo art, private lessons and corporate projects. No 3D file needed — a photo is enough. Ships nationwide.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.siteUrl,
    siteName: business.legalName,
    title: "Custom 3D Printing in Helena, Alabama",
    description:
      "Three printers, one person. Custom prints, HueForge photo art and private lessons — no 3D file needed.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <head>
        {/*
          Runs before first paint. Adding `.js` here is what lets the reveal
          pre-state live in CSS instead of in hydration — without it the server
          HTML paints visible, then hydration hides it, then it fades back in.
          It also exposes a non-media-query hook for reduced motion.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "if(matchMedia('(prefers-reduced-motion: reduce)').matches)" +
              "document.documentElement.dataset.motion='off';",
          }}
        />
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1 pt-16">{children}</main>
        <SiteFooter />
        <CallBar />
      </body>
    </html>
  );
}

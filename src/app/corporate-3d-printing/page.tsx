import type { Metadata } from "next";
import { corporate } from "@/content/services/corporate";
import { ServicePageLayout } from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: corporate.title,
  description: corporate.metaDescription,
  alternates: { canonical: "/corporate-3d-printing/" },
  openGraph: {
    title: corporate.title,
    description: corporate.metaDescription,
    url: "/corporate-3d-printing/",
  },
};

export default function Page() {
  return <ServicePageLayout service={corporate} />;
}

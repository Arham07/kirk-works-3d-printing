import type { Metadata } from "next";
import { custom } from "@/content/services/custom";
import { ServicePageLayout } from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: custom.title,
  description: custom.metaDescription,
  alternates: { canonical: "/custom-3d-printing/" },
  openGraph: {
    title: custom.title,
    description: custom.metaDescription,
    url: "/custom-3d-printing/",
  },
};

export default function Page() {
  return <ServicePageLayout service={custom} />;
}

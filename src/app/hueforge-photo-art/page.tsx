import type { Metadata } from "next";
import { hueforge } from "@/content/services/hueforge";
import { ServicePageLayout } from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: hueforge.title,
  description: hueforge.metaDescription,
  alternates: { canonical: "/hueforge-photo-art/" },
  openGraph: {
    title: hueforge.title,
    description: hueforge.metaDescription,
    url: "/hueforge-photo-art/",
  },
};

export default function Page() {
  return <ServicePageLayout service={hueforge} />;
}

import type { Metadata } from "next";
import { lessons } from "@/content/services/lessons";
import { ServicePageLayout } from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: lessons.title,
  description: lessons.metaDescription,
  alternates: { canonical: "/3d-printing-lessons/" },
  openGraph: {
    title: lessons.title,
    description: lessons.metaDescription,
    url: "/3d-printing-lessons/",
  },
};

export default function Page() {
  return <ServicePageLayout service={lessons} />;
}

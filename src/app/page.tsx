import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { FeaturedWork } from "@/sections/FeaturedWork";
import { Stack } from "@/sections/Stack";
import { ServicesIndex } from "@/sections/ServicesIndex";
import { Machines } from "@/sections/Machines";
import { Materials } from "@/sections/Materials";
import { Process } from "@/sections/Process";
import { Pricing } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { QuoteCta } from "@/sections/QuoteCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <FeaturedWork />
      <Stack />
      <ServicesIndex />
      <Machines />
      <Materials />
      <Process />
      <Pricing />
      <Faq />
      <QuoteCta />
    </>
  );
}

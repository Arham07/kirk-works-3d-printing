import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { FeaturedWork } from "@/sections/FeaturedWork";
import { Capabilities } from "@/sections/Capabilities";
import { Machines } from "@/sections/Machines";
import { Materials } from "@/sections/Materials";
import { Process } from "@/sections/Process";
import { Pricing } from "@/sections/Pricing";
import { Lessons } from "@/sections/Lessons";
import { Faq } from "@/sections/Faq";
import { QuoteCta } from "@/sections/QuoteCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <FeaturedWork />
      <Capabilities />
      <Machines />
      <Materials />
      <Process />
      <Pricing />
      <Lessons />
      <Faq />
      <QuoteCta />
    </>
  );
}

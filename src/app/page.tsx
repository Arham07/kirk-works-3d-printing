import { Hero } from "@/sections/Hero";
import { Thesis } from "@/sections/Thesis";
import { Capabilities } from "@/sections/Capabilities";
import { Machines } from "@/sections/Machines";
import { Materials } from "@/sections/Materials";
import { Process } from "@/sections/Process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thesis />
      <Capabilities />
      <Machines />
      <Materials />
      <Process />
    </>
  );
}

import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PreciosTable } from "@/components/sections/PreciosTable";
import { Servicios } from "@/components/sections/Servicios";
import { PACKAGES } from "@/lib/packages";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <PreciosTable packages={PACKAGES} />
      </main>
    </>
  );
}

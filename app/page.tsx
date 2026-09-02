import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PreciosTable } from "@/components/sections/PreciosTable";
import { Servicios } from "@/components/sections/Servicios";
import { PACKAGES } from "@/lib/packages";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Servicios />
        <ComoFunciona />
        <PreciosTable packages={PACKAGES} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

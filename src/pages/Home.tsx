import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import About from "@/components/sections/About";
import ServicesSection from "@/components/sections/ServicesSection";
import BrandsSection from "@/components/sections/BrandsSection";
import WorkSection from "@/components/sections/WorkSection";
import NKBrandSection from "@/components/sections/NKBrandSection";
import PromotionsSection from "@/components/sections/PromotionsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Soumadeep Dey — Filmmaker & Full Stack Engineer</title>
        <meta
          name="description"
          content="Cinematic portfolio of Soumadeep Dey — filmmaker, cinematographer, full stack engineer, and digital brand builder from Kolkata, India."
        />
      </Helmet>
      <Hero />
      <MarqueeStrip />
      <About />
      <ServicesSection />
      <BrandsSection />
      <WorkSection />
      <NKBrandSection />
      <PromotionsSection />
      <AwardsSection />
      <Contact />
    </>
  );
}

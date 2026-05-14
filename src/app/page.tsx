import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollFx from "@/components/layout/ScrollFx";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import ProjectGrid from "@/components/sections/ProjectGrid";
import CorePrinciples from "@/components/sections/CorePrinciples";
import Quote from "@/components/sections/Quote";
import InterestSection from "@/components/sections/InterestSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollFx />
      <Nav />
      <main className="flex-1">
        <Hero />
        <AboutMe />
        <ProjectGrid />
        <CorePrinciples />
        <InterestSection />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

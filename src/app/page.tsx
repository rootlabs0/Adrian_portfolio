import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollFx from "@/components/layout/ScrollFx";
import AboutMe from "@/components/sections/AboutMe";
import ProjectGrid from "@/components/sections/ProjectGrid";
import CorePrinciples from "@/components/sections/CorePrinciples";
import ToolsOrbit from "@/components/sections/ToolsOrbit";
import Quote from "@/components/sections/Quote";
import InterestSection from "@/components/sections/InterestSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollFx />
      <Nav />
      <main className="flex-1">
        <AboutMe />
        <ProjectGrid />
        <CorePrinciples />
        <ToolsOrbit />
        <InterestSection />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

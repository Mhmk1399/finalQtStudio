"use client";
import ContentCreationLab from "@/components/static/contentCreationLab";
import ContentCreationProcess from "@/components/static/contentCreationProcess";
import HeroSection from "@/components/static/hero-section";
import ServicesShowcase from "@/components/static/services";

const MainContainer = () => {
  return (
    <>
      <section>
        <HeroSection />
        <ServicesShowcase />
        <ContentCreationProcess />
        <ContentCreationLab />
      </section>
    </>
  );
};
export default MainContainer;

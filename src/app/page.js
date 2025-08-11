import HeroSection from "@/components/HeroSection";
import AboutPage from "./about/page";
import ScrollHero from "@/components/ScrollHero"; 


export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollHero/>
      <AboutPage/>
      {/* Add more homepage sections here later */}
    </>
  );
}


// components/home/DesktopHome.jsx
import HeroSection from "@/components/HeroSection";
import ScrollHero from "@/components/ScrollHero";
import ProductShowcase from "@/components/ProductShow";
import ClientReviews from "@/components/ClientReviews";
import OurClients from "@/components/OurClients";
import Footer from "@/components/Footer";

export default function DesktopHome() {
    return (
        <>
            {/* This is the existing layout */}
            <HeroSection />
            <ScrollHero />
            <ProductShowcase />
            <OurClients/>
            <ClientReviews />
            <Footer />
        </>
    );
}
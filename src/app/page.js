import HeroSection from "@/components/HeroSection";
import ScrollHero from "@/components/ScrollHero";
import ProductShowcase from "@/components/ProductShow";
import ClientReviews from "@/components/ClientReviews";
import OurClients from "@/components/OurClients";
import Footer from "@/components/Footer";

export default async function Home() {
    // Simulate loading delay for demonstration (e.g., fetching data)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

    return (
        <>
            <HeroSection />
            <ScrollHero />
            <ProductShowcase />
            <OurClients/>
            <ClientReviews />
            <Footer />


        </>
    );
}



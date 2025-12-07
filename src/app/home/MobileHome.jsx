// components/home/MobileHome.jsx
import MobileHero from "@/components/mobile/MobileHero";
import MobileProductShow from "@/components/mobile/MobileProductShow";
import MobileClients from "@/components/mobile/MobileClients";
import MobileReviews from "@/components/mobile/MobileReviews";
import Footer from "@/components/Footer";
import ScrollHero from "@/components/ScrollHero";
import MobileHeroScroll from "@/components/mobile/MobileHeroScroll";
// Reusing Footer is usually fine

export default function MobileHome() {
    return (
        <div className="relative w-full min-h-screen bg-[#0a0d13] text-white overflow-x-hidden">
            {/* Background Gradient/Glow Effect for depth */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-purple-900/20 blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-12 pb-20">
                <MobileHero />
                <MobileHeroScroll/>
                <MobileProductShow />
                <MobileClients />
                <MobileReviews/>
                <Footer />
            </div>
        </div>
    );
}
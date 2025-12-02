// components/mobile/MobileHero.jsx
import Link from "next/link";
// Assuming you have a button component, otherwise use standard HTML
import { ArrowRight } from "lucide-react"; // Or your icon set

export default function MobileHero() {
    return (
        <section className="relative w-full pt-32 px-6 flex flex-col items-center text-center">

            {/* Eyebrow Text */}
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 backdrop-blur-md mb-6">
        Welcome to DigiDevisor
      </span>

            {/* Main Headline - Large & Tight */}
            <h1 className="text-5xl font-extrabold tracking-tighter leading-[1.1] mb-6">
                Shape the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Future Digital
        </span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
                We craft digital experiences that blend aesthetics with functionality.
                Elevate your brand presence today.
            </p>

            {/* Action Buttons Stacked */}
            <div className="flex flex-col w-full gap-4">
                <Link
                    href="/contact"
                    className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                    Get Started <ArrowRight size={20} />
                </Link>
                <Link
                    href="/services"
                    className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-medium text-lg backdrop-blur-sm"
                >
                    View Services
                </Link>
            </div>

            {/* Visual Placeholder (Replacing the complex desktop 3D scroll/orb for performance) */}
            <div className="mt-16 w-full aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                {/* You can place a static image of your 3D element here for stability */}
                <div className="relative z-10 w-full h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">[Mobile Optimized Visual]</span>
                </div>
            </div>
        </section>
    );
}
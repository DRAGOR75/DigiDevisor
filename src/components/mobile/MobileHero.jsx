"use client";
import Link from "next/link";
import Image from "next/image"; // Added for the logo
import FlippingText from "@/components/FlippingText";
import { ArrowRight } from "lucide-react";

export default function MobileHero() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start pt-32 pb-16 px-6 overflow-hidden">

            {/* ==================== BACKGROUND LAYERS ==================== */}
            {/* Layer 1: Deep ambient top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-blue-950/50 blur-[100px] rounded-b-full pointer-events-none" />

            {/* Layer 2: Sharp cyan central highlight */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-cyan-500/20 blur-[80px] pointer-events-none mix-blend-screen" />

            {/* Layer 3: Subtle tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />


            {/* ==================== CONTENT ==================== */}
            <div className="relative z-10 flex flex-col items-center text-center">

                {/* Main Headline - Massive & Centered */}
                <h1 className="text-5xl leading-[1.1] font-extrabold text-white mb-6 tracking-tight">
                    Unleash Potential.
                    <span className="block mt-2">
            Increase <FlippingText />
          </span>
                </h1>

                {/* Subtext */}
                <p className="text-gray-300 text-lg leading-relaxed max-w-xs mx-auto mb-10">
                    We craft high-impact digital experiences that elevate your brand in every language.
                </p>

                {/* ==================== THE ABSTRACT VISUAL "CORE" ==================== */}
                <div className="relative w-full max-w-sm h-32 mb-10 flex items-center justify-center pointer-events-none select-none">
                    {/* Connecting Lines */}
                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent top-1/2 transform -translate-y-1/2"></div>

                    {/* Left Node */}
                    <div className="absolute left-0 p-4 rounded-2xl border border-cyan-500/30 bg-[#0a0d13]/80 backdrop-blur-xl flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-100 text-xs font-bold uppercase tracking-wider">Strategy</span>
                    </div>

                    {/* Center Core Node (THE LOGO) */}
                    <div className="relative z-10 h-24 w-24 bg-[#0a0d13] rounded-full border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)] backdrop-blur-2xl">
                        {/* Ping animation behind the logo */}
                        <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>

                        {/* The Logo Image */}
                        <div className="relative w-30 h-16">
                            <Image
                                src="https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738593/logo-01_1_tpgsvl.png"
                                alt="DigiDevisor Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Node */}
                    <div className="absolute right-0 p-4 rounded-2xl border border-purple-500/30 bg-[#0a0d13]/80 backdrop-blur-xl flex items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <span className="text-purple-100 text-xs font-bold uppercase tracking-wider">Growth</span>
                        <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                </div>


                {/* ==================== ACTIONS ==================== */}
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    {/* Download Brochure Button */}
                    <a
                        href="/BROCHURE_compressed.pdf"
                        download
                        className="group relative w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-black font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all cursor-pointer"
                    >
                        Download Brochure
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>

                    <Link
                        href="/services"
                        className="text-gray-400 text-sm font-medium hover:text-white transition-colors py-2"
                    >
                        Explore Our Services
                    </Link>
                </div>

            </div>
        </section>
    );
}
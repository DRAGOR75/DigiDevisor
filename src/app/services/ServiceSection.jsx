"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from 'lucide-react';

// Safe registration for Next.js SSR
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        title: "Digital Strategy",
        description: "Craft a comprehensive roadmap to navigate the digital landscape, ensuring every campaign is purposeful and aligned with your business goals.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2400&q=80",
    },
    {
        title: "Content Creation",
        description: "Tell your brand's story with captivating content that educates, entertains, and converts your target audience on any platform.",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=2400&q=80",
    },
    {
        title: "Web Development",
        description: "Build a high-performing, secure, and responsive website that delivers a flawless user experience on every device.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2400&q=80",
    },
    {
        title: "Data Analytics",
        description: "Transform raw data into actionable insights, helping you make smarter business decisions and uncover new growth opportunities.",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=2400&q=80",
    },
    {
        title: "Motion Graphics",
        description: "Bring your brand to life with dynamic and engaging motion graphics that capture attention and communicate your message with impact.",
        image: "https://webneel.com/daily/sites/default/files/images/daily/03-2017/2-nike-magista-advertising-3d-motion-graphics.jpg",
    },
    {
        title: "Brand Identity",
        description: "Sculpt a distinct and memorable brand identity that resonates with your audience and sets you apart from the competition.",
        image: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?auto=format&fit=crop&w=2400&q=80",
    },
];

const ServicesPage = () => {
    const mainRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check screen size on mount
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Only run GSAP horizontal scroll on Desktop
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.service-section');
            const mainEl = mainRef.current;

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: mainEl,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${mainEl.offsetWidth}`,
                    onUpdate: (self) => {
                        const newIndex = Math.round(self.progress * (sections.length - 1));
                        setCurrentIndex(newIndex);
                    },
                    invalidateOnRefresh: true
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <div className="bg-[#0a0d13] text-white font-sans overflow-x-hidden pt-20 lg:pt-0">

            {/* Background Texture */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Progress Indicator - Hidden on Mobile */}
            <div className="fixed top-24 right-4 lg:top-8 lg:right-8 z-30 flex flex-col items-end space-y-2 hidden lg:flex">
                <div className="text-sm font-mono text-gray-400">
                    <span className="font-bold text-white">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(services.length).padStart(2, '0')}
                </div>
                <div className="w-16 lg:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-transform duration-300 ease-out"
                        style={{ transform: `scaleX(${ (currentIndex + 1) / services.length })`, transformOrigin: 'left' }}
                    />
                </div>
            </div>

            {/* Header Section */}
            <header className="relative h-[60vh] lg:h-screen flex items-center justify-center text-center px-4 z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 lg:mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Digital Excellence
                    </h1>
                    <p className="text-base md:text-xl lg:text-2xl opacity-70 max-w-2xl mx-auto font-light">
                        Immersive experiences that captivate and convert.
                    </p>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 animate-pulse">
                    <p className="text-xs lg:text-sm font-medium tracking-widest uppercase">Scroll to Explore</p>
                    <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
            </header>

            {/* Main Content Area */}
            <main
                ref={mainRef}
                className={`relative flex ${isMobile ? 'flex-col w-full h-auto' : 'flex-row w-[600vw] h-screen'}`}
            >
                {services.map((service, index) => (
                    <section
                        key={index}
                        className={`service-section w-full lg:w-screen min-h-[80vh] lg:h-screen flex items-center justify-center p-4 md:p-12 ${isMobile ? 'py-16' : ''}`}
                    >
                        <div className="w-full max-w-lg lg:max-w-6xl h-auto lg:h-[80vh] flex flex-col lg:flex-row items-center justify-center rounded-2xl lg:rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl relative z-20">

                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 h-64 lg:h-full relative group overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="opacity-90 transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0d13]/80" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left p-6 md:p-10 lg:p-16 flex flex-col justify-center">
                                <div className="mb-4 flex items-center justify-center lg:justify-start gap-3">
                                    <span className="text-xs font-mono text-[#04b8fa] border border-[#04b8fa]/30 px-2 py-1 rounded-full">
                                        0{index + 1}
                                    </span>
                                    <span className="h-px w-12 bg-white/10 hidden lg:block"></span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 text-white">
                                    {service.title}
                                </h2>
                                <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            <footer className="py-8 lg:py-12 text-center text-xs lg:text-sm text-gray-600 border-t border-white/5 mt-12 lg:mt-0 relative z-10">
                <p>&copy; {new Date().getFullYear()} DigiDevisor. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ServicesPage;

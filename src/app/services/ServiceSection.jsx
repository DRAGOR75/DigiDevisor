"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image'; // For optimized images
import { gsap } from "gsap"; // Proper GSAP import
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Proper ScrollTrigger import
import { ArrowDown } from 'lucide-react'; // For the scroll arrow icon

gsap.registerPlugin(ScrollTrigger);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.service-section');
            const mainEl = mainRef.current;

            if (!mainEl) return;

            // Horizontal scroll animation
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
                    }
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#0a0d13] text-white font-sans overflow-hidden">
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            <header className="relative h-screen flex items-center justify-center text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Digital Excellence
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl opacity-70 max-w-3xl mx-auto font-light">
                        Immersive experiences that captivate and convert.
                    </p>
                </div>
                {/* --- REFINED SCROLL INDICATOR --- */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
                    <p className="text-sm font-medium tracking-widest uppercase">Scroll to Explore</p>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
            </header>

            <div className="fixed top-8 right-8 z-50 flex flex-col items-end space-y-2">
                <div className="text-sm font-mono text-gray-400">
                    <span className="font-bold text-white">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(services.length).padStart(2, '0')}
                </div>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-transform duration-300 ease-out"
                        style={{ transform: `scaleX(${ (currentIndex + 1) / services.length })`, transformOrigin: 'left' }}
                    />
                </div>
            </div>

            <main ref={mainRef} className="relative flex w-[600vw] h-screen">
                {services.map((service, index) => (
                    <section
                        key={index}
                        className="service-section w-screen h-screen flex items-center justify-center p-6 sm:p-12"
                    >
                        <div className="w-full max-w-6xl h-[80vh] flex flex-col lg:flex-row items-center justify-center rounded-[2rem] overflow-hidden bg-black/20 border border-white/10 backdrop-blur-md">
                            {/* --- OPTIMIZED IMAGE --- */}
                            <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="w-full lg:w-1/2 text-center lg:text-left p-8 md:p-16">
                                <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    {service.title}
                                </h2>
                                <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto lg:mx-0">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            <footer className="py-12 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} DigiDevisor. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ServicesPage;

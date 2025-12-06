"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const actions = [
    "design.", "solve.", "build.", "develop.", "debug.",
    "prompt.", "collaborate.", "create.",
    "inspire.", "follow.", "innovate.", "test.", "optimize.",
    "visualize.", "transform.", "scale.", "do it."
];

export default function MobileHeroScroll() {
    const containerRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const items = gsap.utils.toArray(".mobile-action-item");

        // --- ANIMATION LOGIC ---
        // Instead of one big timeline, we animate each item as it passes
        // through the "Center Hotspot" of the screen.

        items.forEach((item, i) => {
            // Calculate a color based on index (matches your hue rotation)
            const hue = (i / actions.length) * 360;
            const activeColor = `hsl(${hue}, 90%, 65%)`;

            // 1. ENTRY (Fade in + Scale Up + Color) as it approaches center
            gsap.fromTo(item,
                {
                    opacity: 0.1,
                    scale: 0.8,
                    color: "#52525b" // gray-600
                },
                {
                    opacity: 1,
                    scale: 1.3, // Make active item BIG
                    color: activeColor,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        scroller: document.body, // Default scroller
                        start: "top 70%", // Start animating when top of item is at 70% viewport
                        end: "top 45%",   // End animation when item is near center
                        scrub: 0.5,
                    }
                }
            );

            // 2. EXIT (Fade out + Scale Down + Gray) as it leaves center
            gsap.fromTo(item,
                {
                    opacity: 1,
                    scale: 1.3,
                    color: activeColor
                },
                {
                    opacity: 0.1,
                    scale: 0.8,
                    color: "#52525b",
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 40%", // Start fading out just above center
                        end: "top 15%",   // Fully faded out near top
                        scrub: 0.5,
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#0a0d13] text-white py-20 overflow-hidden">

            {/* --- Background Effect (Subtle Grid) --- */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-0" />

            {/* --- Fixed/Sticky Headers --- */}
            <div className="relative z-10 px-6 mb-20 text-center">
                <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4">
                    Why Choose<br />Us?
                </h1>
            </div>

            {/* --- The Scrolling Area --- */}
            <div className="relative z-10 w-full">

                {/* Sticky "We Can" Header */}
                <div className="sticky top-[15vh] z-20 w-full text-center mb-10 pointer-events-none mix-blend-difference">
                    <h2 className="text-2xl font-semibold tracking-widest uppercase text-white/40 backdrop-blur-sm py-2">
                        We Can
                    </h2>
                </div>

                {/* The List */}
                <ul ref={listRef} className="flex flex-col items-center gap-12 pb-[50vh]">
                    {actions.map((word, i) => (
                        <li
                            key={i}
                            className="mobile-action-item text-4xl font-bold tracking-tight transition-colors will-change-transform"
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
// src/components/CardStackTransition.jsx
"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CardStackTransition({ topCard, bottomCard }) {
    const containerRef = useRef(null);
    const topCardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP's matchMedia is the professional way to create responsive animations.
            ScrollTrigger.matchMedia({

                // Desktop animation (for screens wider than 768px)
                "(min-width: 768px)": function() {
                    const topCardElement = topCardRef.current;
                    const containerElement = containerRef.current;
                    if (!topCardElement || !containerElement) return;

                    // This is the main animation timeline.
                    // It pins the container and animates the top card based on scroll.
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerElement,
                            start: "top top",
                            end: "+=1500", // Increased duration for a smoother scroll
                            pin: true,
                            scrub: 1,
                        },
                    });

                    // Animate the top card: scale it down to reveal the bottom card.
                    timeline.to(topCardElement, {
                        scale: 0.9, // This subtle scale effect is the key to the animation
                        ease: "power1.inOut",
                    });
                },

                // On mobile (screens 767px and smaller), no animation runs.
                // This ensures a smooth, standard scrolling experience on small devices.
                "(max-width: 767px)": function() {
                    // No pinning or scaling, the sections will just stack normally.
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        // The outer container's height provides the necessary scroll distance for the animation.
        // On mobile, it will behave like a normal container.
        <section ref={containerRef} className="relative h-auto md:h-[200vh] bg-[#0a0d13]">
            {/* The sticky container is what gets pinned to the screen on desktop. */}
            <div className="md:sticky top-0 h-screen w-full overflow-hidden">
                {/* The bottom card is placed first, so it's underneath. */}
                <div className="card bottom-card absolute inset-0">
                    {bottomCard}
                </div>
                {/* The top card is placed on top of the bottom card. */}
                <div ref={topCardRef} className="card top-card absolute inset-0">
                    {topCard}
                </div>
            </div>
        </section>
    );
}
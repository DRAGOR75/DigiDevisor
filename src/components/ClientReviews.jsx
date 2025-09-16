"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925472/WhatsApp_Image_2020-07-23_at_2_19_21_AM_biaez5.avif",
        feedback:
            "There is absolutely no doubt in my mind that without our platform, I would not have been able to make the jump to building my dream agency. The work I got through our service made it possible for me to have something to build on. We now have about 45 people on our team, a lot of whom we found and recruited through here.",
        author: "Rahul Kumar Gupta",
        company: " Agrasen Ayurved",
        role: "CEO & Founder",
    },
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925459/WhatsApp2525202020-07-23_25_tesfzt.avif",
        feedback:
            "If I've made one investment that's truly paid off, it would be paying for Pro. Love the projects that I get from there.",
        author: "Mani singh",
        company: "Mani infra Services",
        role: "Owner",
    },
    {
        image: "",
        feedback:
            "Because of this platform I managed to increase my profit more than 10 times in just a year. It was the most amazing experience of my life and I am still living it!",
        author: "Marcus Rodriguez",
        company: "StartupLab",
        role: "Founder",
    },
    {
        image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757925454/WhatsApp202020-08-05205_3_hzlpkl.avif",
        feedback:
            "My business has expanded and i have larger client base than before  thanks to the brilliant team of DIGI DEVISOR",
        author: "Somyaroop Das",
        company: "Assocated Consuntalt",
        role: "Product Manager",
    },
    {
        image: "",
        feedback:
            "90% of my contracts come from clients who have seen my work on this platform.",
        author: "James Wilson",
        company: "NextGen Studios",
        role: "VP Engineering",
    },
];

// Helper to get initials from a name
const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};


const ClientReviews = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header elements
            gsap.fromTo(".animate-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2,
                    scrollTrigger: { trigger: ".animate-header", start: "top 85%" }
                }
            );

            // Animate testimonial cards
            gsap.fromTo(".testimonial-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: { trigger: ".testimonials-grid-container", start: "top 80%" }
                }
            );
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-[#0a0d13] text-white font-sans py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <header className="text-center mb-16 md:mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight animate-header">
                        What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clients Say</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-header">
                        Real stories from real people who've transformed their businesses with our platform.
                    </p>
                    <div className="mt-10 flex justify-center items-center gap-8 md:gap-12 animate-header">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">50+</p>
                            <p className="text-sm text-gray-500">Happy Clients</p>
                        </div>
                        <div className="h-12 w-px bg-white/10"></div>
                        <div className="text-center">
                            <div className="flex items-center text-3xl font-bold text-white">
                                5.0 <Star className="w-6 h-6 ml-2 text-yellow-400 fill-yellow-400" />
                            </div>
                            <p className="text-sm text-gray-500">Average Rating</p>
                        </div>
                    </div>
                </header>


                <div className="testimonials-grid-container">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card break-inside-avoid bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                <div className="flex items-start gap-4 mb-4">
                                    {t.image ? (
                                        <Image
                                            src={t.image}
                                            alt={t.author}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-900/50 rounded-full text-blue-300 font-bold">
                                            {getInitials(t.author)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-white">{t.author}</p>
                                        <p className="text-sm text-gray-400">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                                <blockquote className="relative text-gray-300">
                                    <MessageSquare className="absolute -top-2 -left-3 w-8 h-8 text-blue-800/50" />
                                    <span className="relative z-10">"{t.feedback}"</span>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientReviews;
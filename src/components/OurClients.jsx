"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image"; // For optimized images
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const SleekClientsPage = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const logoRowRef = useRef(null);
    const statsRef = useRef(null);

    const clientLogos = [
        { name: "Client 1", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738596/WhatsApp_Image_2025-08-28_at_2.34.27_PM_lpadum.jpg" },
        { name: "Client 2", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738596/WhatsApp_Image_2025-08-28_at_2.28.57_PM_m0btwd.jpg" },
        { name: "Client 3", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738596/WhatsApp_Image_2025-08-28_at_3.35.32_PM_d9zwqc.jpg" },
        { name: "Client 4", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738595/WhatsApp_Image_2025-08-28_at_11.24.23_AM_mxivnu.jpg" },
        { name: "TSAF", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738594/TSAF_Logo_brddst.png" },
        { name: "Client 6", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738595/WhatsApp_Image_2025-08-28_at_2.27.08_PM_fjt95z.jpg" },
        { name: "Client 7", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738595/WhatsApp_Image_2025-06-28_at_7.54.43_PM_lhb2kn.jpg" },
        { name: "Client 8", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738595/WhatsApp_Image_2025-06-25_at_4.04.46_PM_yh0hwc.jpg" },
        { name: "Client 9", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738594/WhatsApp_Image_2024-08-31_at_9.48.09_PM_limhhn.jpg" },
        { name: "Client 10", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738594/WhatsApp_Image_2025-06-07_at_9.28.11_PM_ulc1lg.jpg" },
        { name: "Tata Archery", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738594/taa_logo-01_m6l3af.png" },
        { name: "Client 12", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738593/vvvv-removebg-preview_jxpwld.png" },
        { name: "Client 13", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738593/PDF_page-0001_fxxole.jpg" },
        { name: "Client 14", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738593/FB_IMG_1756371747330_ufuiap.jpg" },
        { name: "City Marbles", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738592/City_marbles_lham65.png" },
    ];;

    const stats = [
        { number: "50+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" },
        { number: "500+", label: "Projects Completed" },
        { number: "95%", label: "Client Retention" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
            });

            if (logoRowRef.current) {
                const track = logoRowRef.current.querySelector(".logo-track");
                const trackWidth = track.scrollWidth / 2;
                gsap.to(track, {
                    x: -trackWidth,
                    duration: 40,
                    ease: "none",
                    repeat: -1,
                });
            }

            gsap.fromTo(".stat-item", { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2,
                scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
            });

            gsap.utils.toArray(".stat-number").forEach((el, index) => {
                const stat = stats[index];
                if (!stat) return;
                const endValue = parseInt(stat.number.replace(/\D/g, ""));
                let proxy = { value: 0 };
                gsap.to(proxy, {
                    value: endValue,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 90%" },
                    onUpdate: () => { el.textContent = Math.round(proxy.value).toString(); },
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#0a0d13] text-white overflow-hidden font-sans">
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-900/50 to-transparent rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-900/50 to-transparent rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
                <div ref={titleRef} className="text-center mb-16 md:mb-20">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                        <span className="text-gray-200">Trusted by </span>
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Industry Leaders
                        </span>
                    </h1>
                </div>

                <div ref={logoRowRef} className="relative w-full overflow-hidden mb-20 md:mb-24 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="logo-track flex w-max items-center">
                        {[...clientLogos, ...clientLogos].map((logo, idx) => (
                            <div key={idx} className="flex-shrink-0 w-36 h-36 md:w-40 md:h-40 mx-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 p-2">
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={120}
                                    height={120}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 md:mb-24">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item text-center">
                            <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                <span className="stat-number" data-stat={index}>0</span>
                                {stat.number.replace(/\d/g, '')}
                            </div>
                            <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Ready to join our growing list of partners?
                    </p>
                    <Link
                        href="/contact"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SleekClientsPage;

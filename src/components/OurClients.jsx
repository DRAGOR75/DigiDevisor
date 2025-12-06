"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
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
        { name: "Client 1", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035037/kutum_1_q28ghi.png" },
        { name: "Client 2", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035037/D2_Solutions_qrw3nu.png" },
        { name: "Client 3", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035037/Flipon_Digital_m5gj1s.png" },
        { name: "Client 4", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035038/Garden_Villa_z5wdrn.png" },
        { name: "TSAF", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738594/TSAF_Logo_brddst.png" },
        { name: "Client 6", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035036/sharan_orcxhg.png" },
        { name: "Client 7", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035035/tsaf_climbing_zyt4rv.png" },
        { name: "Client 8", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035037/taa_2_knoagr.png" },
        { name: "Client 9", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035035/riverside_xbziu9.png" },
        { name: "Client 10", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035037/Ramsy_1_xy7jr2.png" },
        { name: "Tata Archery", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765036240/WhatsApp_Image_2025-08-28_at_11.24.23_AM_mxivnu-removebg-preview_dcuhiv.png" },
        { name: "Client 12", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738593/vvvv-removebg-preview_jxpwld.png" },
        { name: "Client 13", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035036/baba_furniture_1_hbpk4u.png" },
        { name: "Client 14", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035035/Sri_Ram_Furniture_dy2k2f.png" },
        { name: "City Marbles", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1756738592/City_marbles_lham65.png" },
        { name: "Client 16", src: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1765035036/taxi-01_wntj1p.png" },
    ];

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
                // Speeds up the marquee slightly for better energy
                const trackWidth = track.scrollWidth / 2;
                gsap.to(track, {
                    x: -trackWidth,
                    duration: 35,
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
                <div ref={titleRef} className="text-center mb-16 md:mb-24">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        <span className="text-gray-200">Trusted by </span>
                        <br className="md:hidden" />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Industry Leaders
                        </span>
                    </h1>
                </div>

                <div ref={logoRowRef} className="relative w-full overflow-hidden mb-20 md:mb-24 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="logo-track flex w-max items-center py-4">
                        {[...clientLogos, ...clientLogos].map((logo, idx) => (
                            // CHANGED:
                            // 1. Increased size: md:w-56 md:h-56 (was 48)
                            // 2. Reduced padding: p-4 (was p-6) - makes logo bigger inside
                            // 3. Added subtle border and stronger glow shadow for definition
                            // 4. Increased hover scale for more impact
                            <div key={idx} className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 mx-6 md:mx-10 flex items-center justify-center rounded-full bg-white border-2 border-white/50 p-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-110 relative z-10">
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={160}
                                    height={160}
                                    className="object-contain w-full h-full drop-shadow-sm"
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
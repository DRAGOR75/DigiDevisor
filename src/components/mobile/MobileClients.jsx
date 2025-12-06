// components/mobile/MobileClients.jsx
"use client"; // Required for GSAP hooks
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

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

export default function MobileClients() {
    const rowRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        // ANIMATION LOGIC:
        // Move the entire row to the left by 50% of its width.
        // Since we duplicated the list [...logos, ...logos],
        // 50% is exactly one full set of logos.
        // When it reaches -50%, it snaps back to 0 instantly, creating a seamless loop.

        // Calculate width (rough estimate or let GSAP handle percentage)
        gsap.to(row, {
            xPercent: -50, // Move left by 50% of its own width
            duration: 20,  // Speed (Lower = Faster)
            ease: "none",  // Linear movement (constant speed)
            repeat: -1,    // Infinite loop
        });

    }, []);

    return (
        <section className="py-16 bg-[#0a0d13] overflow-hidden relative">
            {/* Gradient Background Glows */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-0 w-48 h-48 bg-blue-900/40 rounded-full blur-[60px]"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-900/40 rounded-full blur-[60px]"></div>
            </div>

            <div className="relative z-10 px-6 mb-12 text-center">
                <h2 className="text-4xl font-bold mb-2 text-white tracking-tight">
                    Trusted by
                </h2>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                    Industry Leaders
                </h2>
            </div>

            {/* Scrolling Container */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
                {/* 1. flex: aligns items in a row
                   2. w-max: ensures container grows as wide as needed
                   3. ref={rowRef}: attaches GSAP animation to this element
                */}
                <div ref={rowRef} className="flex w-max gap-6 px-4 py-4">
                    {/* Map logos twice for seamless loop */}
                    {[...clientLogos, ...clientLogos].map((logo, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-32 h-32 rounded-full bg-white border-2 border-white/50 flex items-center justify-center p-4 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={100}
                                height={100}
                                className="object-contain w-full h-full drop-shadow-sm"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
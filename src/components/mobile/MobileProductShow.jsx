"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const mobileImages = [
    // Column 1
    ["/1.png", "/16TH.png", "/Adler MB30 upright bike.png", "/Happy oneway posts_20250826_234638_0000_page-0003.jpg"],
    // Column 2
    ["/kutum posts_20250827_093837_0000_page-0001.jpg", "/WhatsApp Image 2025-08-23 at 5.43.10 PM.jpeg", "/ramsy posts_20250827_094118_0000_page-0004.jpg", "/WhatsApp Image 2025-08-14 at 9.11.46 PM.jpeg"],
];

const MobileColumn = ({ images, direction = 'up', speed = 25 }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        const column = columnRef.current;
        if (!column) return;

        if (column.children.length === images.length) {
            column.append(...Array.from(column.children).map(child => child.cloneNode(true)));
        }

        const scrollHeight = column.scrollHeight / 2;
        const dirMultiplier = direction === 'up' ? -1 : 1;

        gsap.to(column, {
            y: scrollHeight * dirMultiplier,
            duration: speed,
            ease: "none",
            repeat: -1,
        });
    }, [direction, speed, images.length]);

    return (
        <div className="flex flex-col gap-4" ref={columnRef}>
            {images.map((src, imgIdx) => (
                <div key={imgIdx} className="w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={src}
                        alt={`Mobile Work ${imgIdx}`}
                        width={300}
                        height={400}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default function MobileProductShow() {
    return (
        <section className="relative h-[85vh] bg-[#0a0d13] overflow-hidden flex items-center justify-center">

            {/* --- FADES --- */}
            <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-[#0a0d13] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-[#0a0d13] to-transparent z-20 pointer-events-none" />

            {/* --- MASSIVE TEXT (Layer: Top) --- */}
            {/* z-50 ensures text is ON TOP of the images */}
            <div className="relative z-50 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
                <h2 className="text-[22vw] font-black uppercase text-white leading-[0.8] tracking-tighter">
                    Our
                </h2>
                <h2 className="text-[22vw] font-black uppercase text-white leading-[0.8] tracking-tighter">
                    Work
                </h2>
            </div>

            {/* --- SCROLLING COLUMNS (Layer: Bottom) --- */}
            {/* z-0 ensures images are BEHIND the text */}
            <div className="absolute inset-0 z-0 flex justify-center gap-4 p-4 opacity-40">
                <div className="w-[45%] pt-10">
                    <MobileColumn images={mobileImages[0]} direction="up" speed={30} />
                </div>
                <div className="w-[45%] -mt-10">
                    <MobileColumn images={mobileImages[1]} direction="down" speed={35} />
                </div>
            </div>

        </section>
    );
}
"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const productImages = [
    ["/1.png", "/16TH.png", "/Adler MB30 upright bike.png"],
    ["/Happy oneway posts_20250826_234638_0000_page-0003.jpg", "/kutum posts_20250827_093837_0000_page-0001.jpg", "/WhatsApp Image 2025-08-23 at 5.43.10 PM.jpeg"],
    ["/WhatsApp Image 2024-12-29 at 1.29.10 PM.jpeg", "/ramsy posts_20250827_094118_0000_page-0004.jpg", "/WhatsApp Image 2025-08-14 at 9.11.46 PM.jpeg"],
];

const ProductColumn = ({ images, direction = 'up', speedDuration = 40 }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        const column = columnRef.current;
        if (!column) return;

        // Duplicate images for a seamless loop
        if (column.children.length === images.length) {
            column.append(...Array.from(column.children).map(child => child.cloneNode(true)));
        }

        const scrollHeight = column.scrollHeight / 2;
        const dirMultiplier = direction === 'up' ? -1 : 1;

        gsap.to(column, {
            y: scrollHeight * dirMultiplier,
            duration: speedDuration,
            ease: "none",
            repeat: -1,
        });
    }, [direction, speedDuration, images.length]);

    return (
        <div className="flex flex-col gap-6" ref={columnRef}>
            {images.map((src, imgIdx) => (
                <div key={imgIdx} className="w-full rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <Image
                        src={src}
                        alt={`Work ${imgIdx}`}
                        width={500}
                        height={700}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default function ProductShowcase() {
    return (
        <section className="relative h-[120vh] bg-[#0a0d13] flex justify-center items-center overflow-hidden">
            {/* Gradient fade overlays for seamless look */}
            <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-[#0a0d13] via-[#0a0d13]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-[#0a0d13] via-[#0a0d13]/80 to-transparent z-10 pointer-events-none" />

            {/* MASSIVE Centered Title */}
            <h1 className="relative z-50 text-[10vw] font-black uppercase text-white mix-blend-difference pointer-events-none leading-none tracking-tighter text-center">
                Our Work
            </h1>

            {/* Scrolling Columns */}
            <div className="absolute inset-0 flex justify-center gap-6 p-4 opacity-40 grayscale-[30%] hover:grayscale-0 transition-all duration-700">
                <div className="w-full max-w-[20vw] pt-[10vh]">
                    <ProductColumn images={productImages[0]} direction="up" speedDuration={45} />
                </div>
                <div className="w-full max-w-[20vw] -mt-[15vh]">
                    <ProductColumn images={productImages[1]} direction="down" speedDuration={50} />
                </div>
                <div className="w-full max-w-[20vw] pt-[5vh]">
                    <ProductColumn images={productImages[2]} direction="up" speedDuration={40} />
                </div>
            </div>
        </section>
    );
}
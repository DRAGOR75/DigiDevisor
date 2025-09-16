// src/components/ProductShowcase.jsx
"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const productImages = [
    ["/1.png", "/16TH.png", "/Adler MB30 upright bike.png"],
    ["/Happy oneway posts_20250826_234638_0000_page-0003.jpg", "/kutum posts_20250827_093837_0000_page-0001.jpg", "/WhatsApp Image 2025-08-23 at 5.43.10 PM.jpeg"],
    ["/WhatsApp Image 2024-12-29 at 1.29.10 PM.jpeg", "/ramsy posts_20250827_094118_0000_page-0004.jpg", "/WhatsApp Image 2025-08-14 at 9.11.46 PM.jpeg"],
];

const ProductColumn = ({ images, direction = 'up' }) => {
    const columnRef = useRef(null);

    useEffect(() => {
        const column = columnRef.current;
        if (!column) return;

        // Duplicate images for a seamless loop
        column.append(...Array.from(column.children).map(child => child.cloneNode(true)));

        const scrollHeight = column.scrollHeight / 2;
        const speed = direction === 'up' ? -1 : 1;

        gsap.to(column, {
            y: scrollHeight * speed,
            duration: 40, // Consistent speed
            ease: "none",
            repeat: -1,
        });
    }, [direction]);

    return (
        <div className="flex flex-col gap-4" ref={columnRef}>
            {images.map((src, imgIdx) => (
                <div key={imgIdx} className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10">
                    <Image
                        src={src}
                        alt={`Product image ${imgIdx + 1}`}
                        width={400}
                        height={600}
                        className="w-full h-auto"
                        loading="lazy"
                        quality={75}
                    />
                </div>
            ))}
        </div>
    );
};


export default function ProductShowcase() {
    return (
        <section className="relative h-[120vh] bg-[#0a0d13] flex justify-center items-center overflow-hidden">
            {/* Gradient fade overlays */}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-[#0a0d13] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0a0d13] to-transparent z-10" />

            {/* Centered Title */}
            <h1 className="relative z-20 text-5xl md:text-6xl font-extrabold text-white mix-blend-difference pointer-events-none">
                Our Work
            </h1>

            {/* Scrolling Columns */}
            <div className="absolute inset-0 flex justify-center gap-4 p-4 opacity-50">
                <div className="w-full max-w-sm">
                    <ProductColumn images={productImages[0]} direction="up" />
                </div>
                <div className="w-full max-w-sm mt-[-20vh]">
                    <ProductColumn images={productImages[1]} direction="down" />
                </div>
                <div className="w-full max-w-sm mt-[-10vh]">
                    <ProductColumn images={productImages[2]} direction="up" />
                </div>
            </div>
        </section>
    );
}
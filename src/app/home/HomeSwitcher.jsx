// components/home/HomeSwitcher.jsx
"use client";

import { useState, useEffect } from "react";
import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";

const MOBILE_BREAKPOINT = 768;

export default function HomeSwitcher() {
    // 1. Start as NULL (neither desktop nor mobile)
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            // Double-check window exists to avoid server errors
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            }
        };

        // Run check immediately
        checkMobile();

        // Add listener for resizing
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // 2. While checking, render a blank background (matches your theme)
    // This prevents the "Desktop Flash"
    if (isMobile === null) {
        return <div className="min-h-screen w-full bg-[#0a0d13]" />;
    }

    // 3. Render the correct view
    return isMobile ? <MobileHome /> : <DesktopHome />;
}
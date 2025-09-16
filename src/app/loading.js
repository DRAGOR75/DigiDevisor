"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loading() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }

    return (
        <div className="h-screen bg-gradient-to-br from-[#0a0d13] via-[#13151a] to-[#0a0d13] flex justify-center items-center overflow-hidden relative font-sans">


            <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-900/60 to-transparent blur-3xl"
                animate={{ x: [-200, 0, -200], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-cyan-900/60 to-transparent blur-3xl"
                animate={{ x: [200, 0, 200], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Main content container */}
            <motion.div
                className="relative text-center flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Brand Name */}
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                    DigiDevisor
                </h1>

                {/* Loading Spinner */}
                <motion.div
                    className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />


                <motion.p
                    className="text-white/70 text-base md:text-lg"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Please wait...
                </motion.p>
            </motion.div>
        </div>
    );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const jump = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + jump, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // --- LOGIC FOR MARKETING TEXT ---
    const loadingText = count < 40
        ? "Unleashing Potential..."
        : count < 80
            ? "Crafting Digital Experience..."
            : "Analyzing Market Tend...";

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0a0d13] flex flex-col justify-center items-center overflow-hidden font-sans">

            {/* --- 1. Background Ambiance --- */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse delay-1000" />

            {/* --- 2. Center Content --- */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">

                {/* The "DD" Monogram Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-24 h-24 mb-12 flex items-center justify-center"
                >
                    {/* Outer Rings */}
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Glowing Center */}
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-xl absolute inset-0" />

                    {/* Text Logo */}
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-white relative z-10 tracking-tighter">
                        DD
                    </span>
                </motion.div>


                {/* The Percentage Counter */}
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl md:text-8xl font-black text-white tracking-tighter tabular-nums">
                        {count}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-cyan-500">%</span>
                </div>

                {/* DYNAMIC MARKETING TEXT */}
                <div className="h-6 overflow-hidden mb-8 w-full text-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={loadingText} // Triggers animation when text changes
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm uppercase tracking-[0.2em] text-cyan-500/80 font-bold"
                        >
                            {loadingText}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* The Progress Bar */}
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${count}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>

            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-8 text-xs text-white/20 uppercase tracking-widest">
                © DigiDevisor 2025
            </div>

        </div>
    );
}
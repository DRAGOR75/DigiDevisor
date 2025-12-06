"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
    "Profit", "मुनाफा", "இலாபம்", "লাভ", "లాభం", "નફો", "नफा", "ಲಾಭ", "ലാഭം", "ਮੁਨਾਫ਼ਾ",
];

export default function FlippingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % languages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        // CHANGED: 'ml-3' adds more space between "Increasing" and this box
        // CHANGED: 'align-bottom' often sits better with large H1 text than 'align-middle'
        <span className="inline-block ml-3 align-bottom pb-1">
        <span className="px-4 py-1 rounded-lg bg-[#00C2FF] text-black font-bold inline-block relative overflow-hidden shadow-[0_0_20px_rgba(0,194,255,0.6)]">
          <AnimatePresence mode="wait">
            <motion.span
                key={languages[index]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block"
            >
              {languages[index]}
            </motion.span>
          </AnimatePresence>
        </span>
    </span>
    );
}
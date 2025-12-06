"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { id: "home", name: "Home", path: "/" },
    { id: "services", name: "Services", path: "/services" },
    { id: "about", name: "About", path: "/about" },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-full max-w-6xl px-4 md:px-0">
            <motion.div
                layout
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    relative flex items-center justify-between px-6 py-3 
                    rounded-full border backdrop-blur-xl transition-all duration-300
                    ${
                    scrolled || isOpen
                        ? "bg-[#0a0d13]/80 border-white/10 shadow-[0_0_25px_rgba(147,51,234,0.2)]"
                        : "bg-[#0a0d13]/60 border-white/5"
                }
                `}
            >
                {/* --- 1. LOGO --- */}
                <div className="flex items-center">
                    <Link href="/" className="group">
                        <span className="font-bold tracking-wider text-lg text-white">
                            DIGI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">DEVISOR</span>
                        </span>
                    </Link>
                </div>

                {/* --- 2. CENTER NAVIGATION --- */}
                <ul className="hidden md:flex gap-1 items-center p-1 rounded-full bg-white/5 border border-white/5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.id} className="relative">
                                <Link
                                    href={item.path}
                                    className={`relative z-10 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center gap-2 ${
                                        isActive ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktop-nav-bg"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-0 border border-white/5 shadow-inner"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* --- 3. CTA BUTTON (REDESIGNED - Glass Glow) --- */}
                <div className="hidden md:block">
                    <Link
                        href="/contact"
                        // CHANGED:
                        // - bg-white -> bg-white/5 (Dark semi-transparent)
                        // - text-black -> text-white
                        // - Added border-white/20
                        // - Changed shadow to a cyan glow that increases on hover
                        className="group relative px-8 py-2.5 rounded-full bg-white/5 border border-white/20 text-white font-bold text-sm flex items-center overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:border-cyan-400/50 hover:bg-white/10"
                    >
                        <span className="relative z-10 tracking-wide">Let's Talk</span>

                        {/* Shimmer Effect (Made subtly cyan) */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent skew-x-12" />
                    </Link>
                </div>

                {/* --- MOBILE TOGGLE --- */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.div>

            {/* --- MOBILE DROPDOWN --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 w-full mt-3 p-2 bg-[#0a0d13]/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-50"
                    >
                        <ul className="flex flex-col gap-2">
                            {[...navItems, { id: "contact", name: "Contact", path: "/contact" }].map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                                                flex items-center justify-between w-full px-5 py-4 text-center rounded-2xl transition-all
                                                ${
                                                isActive
                                                    ? "bg-white/10 text-white font-bold border border-white/10"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                            }
                                            `}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
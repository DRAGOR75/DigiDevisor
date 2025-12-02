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
    { id: "contact", name: "Contact", path: "/contact" },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-5xl">
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    relative flex items-center justify-between px-6 py-3 
                    rounded-full border backdrop-blur-xl transition-all duration-300
                    ${
                    scrolled || isOpen
                        ? "bg-[#0a0d13]/80 border-white/10 shadow-lg shadow-purple-900/10" // Dark Glass with slight purple shadow
                        : "bg-[#0a0d13]/50 border-white/5" // Transparent default
                }
                `}
                style={{
                    borderRadius: isOpen ? "1.5rem" : "9999px",
                }}
            >
                {/* --- DESKTOP MENU --- */}
                <ul className="hidden md:flex gap-2 items-center text-sm font-medium text-white">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.id} className="relative">
                                <Link
                                    href={item.path}
                                    className={`relative z-10 px-4 py-2 transition-colors duration-300 ${
                                        isActive ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktop-indicator"
                                            className="absolute inset-0 bg-white/10 rounded-full -z-0 border border-white/5"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* --- MOBILE HEADER --- */}
                <div className="flex md:hidden items-center justify-between w-full">
                    {/* Logo - Matches your MobileHero gradient style */}
                    <Link href="/" className="font-bold tracking-wider text-lg">
                        DIGI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">DEVISOR</span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
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
                            {navItems.map((item) => {
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
                                            {/* Small indicator dot for active page */}
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
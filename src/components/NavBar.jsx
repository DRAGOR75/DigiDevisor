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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
          relative flex items-center justify-between px-6 py-3 
          rounded-full border backdrop-blur-xl transition-all duration-300
          ${
                    scrolled || isOpen
                        ? "bg-white/10 border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" // Bright Glass Effect
                        : "bg-white/5 border-white/10"
                }
        `}
                style={{
                    borderRadius: isOpen ? "1.5rem" : "9999px",
                }}
            >
                {/* --- DESKTOP MENU --- */}
                <ul className="hidden md:flex gap-1 items-center text-sm font-medium text-white">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={item.id} className="relative px-2">
                                <Link
                                    href={item.path}
                                    className={`relative z-10 px-4 py-2 transition-colors duration-300 ${
                                        isActive ? "text-white font-semibold" : "text-white/90 hover:text-cyan-300"
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktop-indicator"
                                            className="absolute inset-0 bg-white/20 rounded-full -z-0 border border-white/10"
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
                    {/* Logo with a slight glow */}
                    <span className="font-bold text-white tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            DIGI DEVISOR
          </span>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-white bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.div>

            {/* --- MOBILE DROPDOWN --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden absolute top-full left-0 w-full mt-2 p-2 bg-[#1a1d24]/90 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <li key={item.id}>
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                        block w-full px-4 py-3 text-center rounded-2xl transition-all
                        ${
                                                isActive
                                                    ? "bg-white/20 text-white font-bold border border-white/10 shadow-inner"
                                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                                            }
                      `}
                                        >
                                            {item.name}
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
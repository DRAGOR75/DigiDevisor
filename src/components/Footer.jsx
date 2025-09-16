"use client";
import React from "react";
// 1. Import the new SocialLinks component
import SocialLinks from "./SocialLinks";

// Navigation link data remains the same
const navLinks = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Meet the Team", href: "/#team" },
        { name: "Our Process", href: "/about#process" },
    ],
    services: [
        { name: "Digital Marketing", href: "/services#marketing" },
        { name: "Web Development", href: "/services#web-dev" },
        { name: "Video Production", href: "/services#video" },
        { name: "Brand Strategy", href: "/services#strategy" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-transparent text-gray-400 font-sans">


            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">

                    <div className="lg:max-w-sm">
                        <a href="/" className="inline-block text-2xl font-bold text-white tracking-wider">
                            DigiDevisor
                        </a>
                        <p className="mt-4 text-base">
                            A creative digital agency crafting bespoke web experiences and driving growth with data-driven marketing strategies.
                        </p>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-3">
                                {navLinks.company.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors duration-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Services</h3>
                            <ul className="mt-4 space-y-3">
                                {navLinks.services.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors duration-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a href="/contact" className="text-base text-gray-400 hover:text-white transition-colors duration-300">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@digidevisor.com" className="text-base text-gray-400 hover:text-white transition-colors duration-300">
                                        info@digidevisor.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-gray-500 text-center sm:text-left">
                        <p>&copy; {new Date().getFullYear()} DigiDevisor. All Rights Reserved.</p>
                        <p className="mt-1">Made with <span className="text-red-400">♥</span> in Jamshedpur</p>
                    </div>


                    <div className="flex space-x-6">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
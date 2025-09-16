// src/components/SocialLinks.jsx
"use client";
import React from "react";
// 1. Import the specific icons you need from lucide-react
import { Linkedin, Instagram, Facebook } from "lucide-react";

// 2. The data array now references the imported icon components
const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/digi-devisor/",
        icon: Linkedin
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/digi_devisor?igsh=ajcyZG96MXMxaWd2",
        icon: Instagram
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/1BMnfaWTie/",
        icon: Facebook
    },
];

const SocialLinks = () => {
    return (
        <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
                // 3. Create a reference to the icon component
                const Icon = social.icon;
                return (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                        className="group rounded-full bg-white/5 p-3 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-white/20 focus:outline-none focus-visible:ring-blue-400"
                    >

                        <Icon className="h-5 w-5 stroke-gray-400 transition-colors duration-300 group-hover:stroke-white" />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialLinks;
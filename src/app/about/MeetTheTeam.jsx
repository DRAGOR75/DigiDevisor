"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// 1. Import all the unique icons we'll need
import {
    Linkedin, Code, PenTool, Megaphone, Film,
    Target, Handshake, Type, Video, Camera
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    { name: "Ravi Singh", role: "Co-Founder & Client Lead", bio: "Oversees projects, drives strategy, and ensures seamless client communication.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744991/IMG-20250910-WA0004_qrto0n.jpg" },
    { name: "Shalini Srivastava", role: "Social Media Manager", bio: "Manages content calendars, engages followers, and tracks analytics.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744992/IMG-20250910-WA0005_ktt4pj.jpg" },
    { name: "Gunjan Agrawal", role: "Graphic Designer", bio: "Crafts custom graphics and brand visuals using Adobe and Canva.", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" },
    { name: "Sawan Mishra", role: "Video Editor", bio: "Specializes in reels, transitions, and sound mixing using Premiere Pro.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744993/WhatsApp_Image_2025-09-10_at_18.41.00_0ed8beb2_qi7es5.jpg" },
    { name: "Aishwarya Raj", role: "Meta Ads Manager", bio: "Optimizes campaigns, runs A/B tests, and manages ad budgets.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744992/IMG-20250910-WA0006_fvuzru.jpg" },
    { name: "Uditya Raj", role: "Full Stack Developer", bio: "Builds and maintains websites, dashboards, and backend systems.", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" },
    { name: "Ayontika Kolay", role: "Content Writer", bio: "Writes scripts, captions, and brand stories for campaigns.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744993/IMG-20250910-WA0007_otfuec.jpg" },
    { name: "Govind Jha", role: "Cinematographer", bio: "Captures brand shoots, interviews, and behind-the-scenes footage.", image: "https://res.cloudinary.com/dsvso9xjc/image/upload/v1757744993/WhatsApp_Image_2025-09-10_at_18.41.01_9c02bab4_phirs7.jpg" },
    { name: "Harshita Raj", role: "Content Creator", bio: "Creates engaging reels and short-form video content.", image: "" },
];

const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) { return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase(); }
    return name.substring(0, 2).toUpperCase();
};

// 2. A new helper component to render the correct icon based on role
const RoleIcon = ({ role }) => {
    let IconComponent;
    switch (role) {
        case "Co-Founder & Client Lead": IconComponent = Handshake; break;
        case "Social Media Manager": IconComponent = Megaphone; break;
        case "Graphic Designer": IconComponent = PenTool; break;
        case "Video Editor": IconComponent = Film; break;
        case "Meta Ads Manager": IconComponent = Target; break;
        case "Full Stack Developer": IconComponent = Code; break;
        case "Content Writer": IconComponent = Type; break;
        case "Cinematographer": IconComponent = Video; break;
        case "Content Creator": IconComponent = Camera; break;
        default: IconComponent = Linkedin; // Fallback icon
    }
    return <IconComponent className="w-5 h-5 text-blue-400" />;
};


export default function SleekTeamGrid() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
                .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");

            tl.fromTo(".team-card", { opacity: 0, y: 50, scale: 0.95 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
            }, "-=0.5");
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="team"
            ref={sectionRef}
            className="relative py-24 px-6 bg-[#0a0d13] text-white overflow-hidden"
        >
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 bg-blue-900/40 rounded-full blur-3xl opacity-50"></div>
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 ref={titleRef} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                        Meet the Creative Minds
                    </h2>
                    <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        We are a passionate team of strategists, creators, and innovators dedicated to bringing your brand's vision to life.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="team-card group relative bg-[#0a0d13]/60 border border-blue-900/30 rounded-xl shadow-lg p-7 flex flex-col items-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2"
                        >
                            <div className="w-32 h-32 mb-5 rounded-full overflow-hidden border-2 border-white/20 shadow-lg transition-all duration-300 group-hover:border-blue-400/80 group-hover:shadow-blue-500/20">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:filter-none transition-all duration-300 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-900/30 text-blue-300 font-bold text-3xl">
                                        {getInitials(member.name)}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-100 text-center">{member.name}</h3>
                            <p className="text-sm uppercase tracking-wider text-blue-400/80 mb-4 text-center">
                                {member.role}
                            </p>
                            <p className="text-gray-400 text-sm mb-5 text-center flex-grow">{member.bio}</p>

                            {/* 3. The LinkedIn link is replaced with the new RoleIcon */}
                            <div className="mt-auto rounded-full bg-white/10 p-2.5 shadow-inner">
                                <RoleIcon role={member.role} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
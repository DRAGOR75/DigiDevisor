"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Linkedin, Code, PenTool, Megaphone, Film,
    Target, Handshake, Type, Video, Camera
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
    { name: "Ravi Singh", role: "Co-Founder & Client Lead", bio: "Oversees projects, drives strategy, and ensures seamless client communication." },
    { name: "Shalini Srivastava", role: "Social Media Manager", bio: "Manages content calendars, engages followers, and tracks analytics." },
    { name: "Gunjan Agrawal", role: "Graphic Designer", bio: "Crafts custom graphics and brand visuals using Adobe and Canva." },
    { name: "Sawan Mishra", role: "Video Editor", bio: "Specializes in reels, transitions, and sound mixing using Premiere Pro." },
    { name: "Aishwarya Raj", role: "Meta Ads Manager", bio: "Optimizes campaigns, runs A/B tests, and manages ad budgets." },
    { name: "Uditya Raj", role: "Full Stack Developer", bio: "Builds and maintains websites, dashboards, and backend systems." },
    { name: "Ayontika Kolay", role: "Content Writer", bio: "Writes scripts, captions, and brand stories for campaigns." },
    { name: "Govind Jha", role: "Cinematographer", bio: "Captures brand shoots, interviews, and behind-the-scenes footage." },
    { name: "Harshita Raj", role: "Content Creator", bio: "Creates engaging reels and short-form video content." },
];

const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) { return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase(); }
    return name.substring(0, 2).toUpperCase();
};

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
        default: IconComponent = Linkedin;
    }
    return <IconComponent className="w-5 h-5 text-white/90" />;
};

// New Helper: Returns a unique gradient class based on index/role
const getGradient = (index) => {
    const gradients = [
        "from-blue-600 to-cyan-500",
        "from-purple-600 to-pink-500",
        "from-emerald-500 to-teal-400",
        "from-orange-500 to-red-500",
        "from-indigo-600 to-blue-500",
        "from-rose-500 to-orange-400",
        "from-cyan-600 to-blue-600",
        "from-violet-600 to-purple-500",
    ];
    return gradients[index % gradients.length];
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
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 bg-blue-900/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
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
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            className="team-card group relative bg-[#0a0d13]/60 border border-blue-900/30 rounded-xl shadow-lg p-7 flex flex-col items-center backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-blue-900/20"
                        >
                            {/* Abstract Initials Avatar */}
                            <div className={`w-28 h-28 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${getGradient(index)} shadow-inner border-4 border-[#0a0d13] group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-3xl font-black text-white tracking-widest drop-shadow-md">
                                    {getInitials(member.name)}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-1 text-gray-100 text-center">{member.name}</h3>
                            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 text-center">
                                {member.role}
                            </p>
                            <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed flex-grow">{member.bio}</p>

                            {/* Icon Badge */}
                            <div className={`mt-auto rounded-full p-3 bg-gradient-to-br ${getGradient(index)} shadow-lg`}>
                                <RoleIcon role={member.role} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
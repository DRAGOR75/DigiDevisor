"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Handshake, Heart, Plus, Globe, Compass, Megaphone, TrendingUp, BarChart3 } from "lucide-react";

// GSAP plugin registration should happen once at the top level.
gsap.registerPlugin(ScrollTrigger);

// --- Data arrays are static and safe for server rendering ---
const principles = [
    { id: "integrity", title: "Integrity", icon: <Handshake size={64} />, desc: "We operate with radical transparency and a strong sense of ethics. Your trust is our most valuable asset." },
    { id: "innovation", title: "Innovation", icon: <Lightbulb size={64} />, desc: "We are relentlessly curious, constantly testing new channels and technologies to keep you ahead of the curve." },
    { id: "creativity", title: "Creativity", icon: <Plus size={64} />, desc: "We believe in the power of original thought to cut through the noise and create memorable, impactful campaigns." },
    { id: "commitment", title: "Commitment", icon: <Heart size={64} />, desc: "Your goals become our obsessions. We are deeply invested in your success, treating your business as our own." },
];

const processSteps = [
    { title: "1. Deep Dive & Discovery", icon: <Compass size={32} />, desc: "We start by immersing ourselves in your world. We analyze your brand, audience, and competitors to build a data-driven strategic foundation." },
    { title: "2. Creative Strategy & Campaigning", icon: <Megaphone size={32} />, desc: "Our team crafts compelling narratives and visuals that resonate with your audience. This is where big ideas are born and campaigns come to life." },
    { title: "3. Multi-Channel Execution", icon: <TrendingUp size={32} />, desc: "We launch your campaigns across the most effective channels—from SEO and PPC to social media and content marketing—ensuring maximum reach and impact." },
    { title: "4. Analysis & Optimization", icon: <BarChart3 size={32} />, desc: "We obsess over data. We track performance in real-time, provide transparent reports, and continuously optimize for better results and higher ROI." },
];

export default function AboutCompany() {
    const componentRef = useRef(null);
    // Refs for targeting specific elements for animation
    const heroTitleRef = useRef(null);
    const heroDescRef = useRef(null);
    const storySectionRef = useRef(null);
    const storyTextRef = useRef(null);
    const storyImgRef = useRef(null);
    const principlesSectionRef = useRef(null);
    const ctaSectionRef = useRef(null);
    const ctaContentRef = useRef(null);
    const ctaGlowRef = useRef(null);

    useEffect(() => {
        // HYDRATION PRACTICE: All GSAP code is placed within useEffect.
        // This ensures it only runs on the client-side after the component has mounted,
        // preventing any server/client mismatch errors.

        // HYDRATION PRACTICE: gsap.context() scopes all animations to this component.
        // This prevents animations from "leaking" and affecting other components.
        const ctx = gsap.context(() => {

            // --- 1. Hero Section Animation ---
            gsap.fromTo(heroTitleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
            gsap.fromTo(heroDescRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" });

            // --- 2. Our Story Section Animation ---
            gsap.fromTo(storyTextRef.current, { x: -50, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1, ease: "power2.out",
                scrollTrigger: { trigger: storySectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
            });
            gsap.fromTo(storyImgRef.current, { x: 50, opacity: 0 }, {
                x: 0, opacity: 1, duration: 1, ease: "power2.out",
                scrollTrigger: { trigger: storySectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
            });

            // --- 3. Guiding Principles Interactive Scroll ---
            const principleItems = gsap.utils.toArray(".principle-item");
            const principleContents = gsap.utils.toArray(".principle-content");

            gsap.set(principleItems[0], { opacity: 1 });
            gsap.set(principleItems.slice(1), { opacity: 0.3 });
            gsap.set(principleContents.slice(1), { autoAlpha: 0, y: 20 });
            gsap.set(principleContents[0], {autoAlpha: 1, y: 0});

            const principlesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: principlesSectionRef.current,
                    start: "top top",
                    end: `+=2000`,
                    pin: true,
                    scrub: 1,
                }
            });

            principleItems.forEach((item, i) => {
                if (i === 0) return;
                principlesTl
                    .to(principleItems[i-1], { opacity: 0.3, duration: 0.2 }, `start-${i}`)
                    .to(principleContents[i-1], { autoAlpha: 0, y: -20, duration: 0.3 }, `<`)
                    .to(principleItems[i], { opacity: 1, duration: 0.2 }, `-=0.1`)
                    .fromTo(principleContents[i], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, `<`);
            });

            // --- 4. Our Process Section Animation ---
            const steps = gsap.utils.toArray(".process-step");
            steps.forEach(step => {
                gsap.fromTo(step, { opacity: 0, y: 50 }, {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: step, start: "top 85%", toggleActions: "play none none reverse" }
                });
            });

            // --- 5. Final CTA Section Animation ---
            gsap.fromTo(ctaContentRef.current.children, { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2,
                scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
            });
            gsap.fromTo(ctaGlowRef.current, { scale: 0.5, opacity: 0 }, {
                scale: 1, opacity: 1, duration: 2, ease: "power3.out",
                scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
            });

        }, componentRef); // Scope the context to the main component element

        // HYDRATION PRACTICE: The return function in useEffect is for cleanup.
        // ctx.revert() safely removes all GSAP animations and ScrollTriggers created
        // within the context, preventing memory leaks when the component unmounts.
        return () => ctx.revert();
    }, []); // Empty dependency array ensures this runs only once on mount.

    // HYDRATION PRACTICE: The JSX is deterministic. It renders the same output on the
    // server and the client's first render, avoiding mismatch errors.
    return (
        <main ref={componentRef} className="bg-[#0a0d13] text-white font-sans overflow-x-hidden">
            {/* --- 1. Hero Section --- */}
            <section className="relative w-full min-h-screen flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-blue-400">
                        Crafting Digital Futures.
                    </h1>
                    <p ref={heroDescRef} className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        We are a collective of creators, strategists, and innovators dedicated to building brands and driving growth in the digital age.
                    </p>
                </div>
            </section>

            {/* --- 2. Our Story Section --- */}
            <section ref={storySectionRef} className="py-24 px-6 bg-[#13151a]">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div ref={storyTextRef}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">Our Journey So Far</h2>
                        <p className="text-lg text-gray-300 mb-4">
                            Founded on the belief that great marketing is a blend of art and science, our journey began. We started with a simple idea: build an agency that's as passionate about our clients' success as they are.
                        </p>
                        <p className="text-lg text-gray-300">
                            Today, we've grown into a global team, but that original spirit of partnership and innovation remains our core. We aren't just service providers; we are your growth partners.
                        </p>
                    </div>
                    <div ref={storyImgRef} className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-2xl shadow-blue-900/20">
                        <img
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="A team collaborating on a project in a bright office"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </section>

            {/* --- 3. Our Guiding Principles --- */}
            <section ref={principlesSectionRef} className="relative w-full h-screen bg-[#0a0d13]">
                <div className="max-w-6xl mx-auto h-full grid lg:grid-cols-2 items-center px-6">
                    <div className="h-full flex flex-col justify-center py-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">Our Guiding Principles</h2>
                        <ul className="flex flex-col gap-8">
                            {principles.map((p) => (
                                <li key={p.id} className="principle-item text-3xl md:text-4xl font-semibold text-gray-100 transition-opacity duration-300">
                                    {p.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-full hidden lg:flex items-center justify-center">
                        {principles.map((p) => (
                            <div key={p.id} className="principle-content absolute flex flex-col items-center text-center">
                                <div className="text-blue-400 mb-6">{p.icon}</div>
                                <p className="text-lg text-gray-300 max-w-sm">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- 4. Our Path to Excellence --- */}
            <section className="py-24 px-6 bg-[#13151a]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">Our Path to Excellence</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">A proven, collaborative process that ensures clarity, quality, and outstanding results every step of the way.</p>
                    </div>
                    <div className="relative flex flex-col gap-12">
                        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-blue-900/30 hidden md:block"></div>
                        {processSteps.map((step, index) => (
                            <div key={index} className={`process-step flex md:items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                <div className="flex-none w-1/2 hidden md:flex items-center justify-center"></div>
                                <div className="relative w-full md:w-1/2 bg-[#0a0d13]/60 p-8 rounded-xl border border-blue-900/30 backdrop-blur-sm">
                                    <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg left-0 -translate-x-1/2 md:left-auto md:translate-x-0"
                                         style={index % 2 === 1 ? { right: '100%', marginRight: '-32px' } : { left: '100%', marginLeft: '-32px' }}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-100">{step.title}</h3>
                                    <p className="text-gray-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. Final CTA Section --- */}
            <section ref={ctaSectionRef} className="relative w-full py-24 px-6 bg-[#0a0d13] overflow-hidden">
                <div ref={ctaGlowRef} className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-blue-900/50 rounded-full blur-3xl"></div>
                </div>
                <div ref={ctaContentRef} className="relative max-w-6xl mx-auto text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-6 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-2xl ring-4 ring-blue-600/30">
                        <Globe size={48} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-blue-400">Ready to Grow Your Brand?</h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Whether you have a clear vision or need a strategic partner, we're here to help. Let's create a digital experience that drives results.
                    </p>
                    <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Start a Project
                    </a>
                </div>
            </section>
        </main>
    );
}
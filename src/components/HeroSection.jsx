"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";

const phrases = ["Profit", "लाभ", "লাভ", "ಲಾಭ", "ലാഭം", "નફો", "ਮੁਨਾਫਾ", "मुनाफा"];
const scrollingTexts = ["WEB DEVELOPMENT", "MOBILE APPS", "DIGITAL MARKETING", "E-COMMERCE SOLUTIONS", "BRAND STRATEGY", "UI/UX DESIGN", "CLOUD SERVICES", "AI INTEGRATION"];

const FLIP_DURATION = 100;
const DISPLAY_TIME = 1500;

export default function HeroSection() {
    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const intervalRef = useRef(null);

    const flipToNext = useCallback(() => {
        setFlip(true);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
            setFlip(false);
        }, FLIP_DURATION);
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(flipToNext, DISPLAY_TIME);
        return () => clearInterval(intervalRef.current);
    }, [flipToNext]);

    const handleClick = useCallback(() => {
        clearInterval(intervalRef.current);
        flipToNext();
        intervalRef.current = setInterval(flipToNext, DISPLAY_TIME);
    }, [flipToNext]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (
        <main className={GeistSans.className}>
            <style jsx>{`
                /* --- DESKTOP STYLES --- */
                .hero-container {
                    min-height: 100vh;
                    min-height: 100dvh;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    position: relative;
                    padding: 2rem 1rem;
                    padding-bottom: 140px;
                    overflow: hidden;
                    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                }

                .hero-content { display: flex; width: 100%; max-width: 1400px; align-items: center; gap: 4rem; position: relative; z-index: 10; }
                .hero-text { flex: 1 1 600px; max-width: 900px; z-index: 10; }

                .company-brand { font-size: 1rem; font-weight: 500; color: #04b8fa; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 0.5rem; opacity: 0.9; }

                .slap-heading { font-size: clamp(2.5rem, 5vw, 5.5rem); font-weight: 600; line-height: 1.1; letter-spacing: 0.01em; text-wrap: pretty; color: #fff; margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; }

                .highlight { color: #000; background: linear-gradient(94deg, #00BCE3 30%, #00BCE3 100%); padding: 0.2em 0.5em; border-radius: 0.18em; margin-left: 0.4em; box-shadow: 0 2px 12px 0 #e7ff4d55; display: inline-block; }
                .flip-text { display: inline-block; cursor: pointer; will-change: transform, opacity; user-select: none; min-width: 130px; margin-left: 0.3em; }
                .flip-in { animation: flipIn 0.4s; }
                .flip-out { animation: flipOut 0.4s; }
                @keyframes flipIn { 0% { transform: rotateX(70deg); opacity: 0; } 100% { transform: rotateX(0deg); opacity: 1; } }
                @keyframes flipOut { 0% { transform: rotateX(0deg); opacity: 1; } 100% { transform: rotateX(-70deg); opacity: 0; } }

                .hero-subtext { color: #ccd6f6; max-width: 600px; font-size: 1.2rem; margin: 2rem 0; line-height: 1.6; }

                .hero-btn { background-color: #f4d509; color: #111112; font-weight: 700; font-size: 1.1rem; padding: 1rem 2rem; border-radius: 50px; border: none; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 2px 10px #1a73e850; }
                .hero-btn:hover { background-color: #04b8fa; transform: translateY(-2px); box-shadow: 0 4px 20px #1a73e870; }

                .hero-visual { flex: 1 1 400px; display: flex; justify-content: center; align-items: center; position: relative; min-height: 500px; }
                .floating-elements { position: relative; width: 400px; height: 400px; }

                .floating-card { position: absolute; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; padding: 1.5rem; color: #fff; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); animation: float 6s ease-in-out infinite; }
                .card-1 { top: 20%; left: 10%; width: 180px; animation-delay: 0s; }
                .card-2 { top: 50%; right: 5%; width: 160px; animation-delay: 2s; }
                .card-3 { bottom: 15%; left: 25%; width: 200px; animation-delay: 4s; }
                @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }

                .card-title { font-size: 0.9rem; font-weight: 600; color: #04b8fa; margin-bottom: 0.5rem; }
                .card-text { font-size: 0.8rem; line-height: 1.4; opacity: 0.9; }

                .central-element { position: absolute; top: 50%; left: 50%; width: 120px; height: 120px; background: linear-gradient(135deg, #1a73e8, #f9f9fb); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; color: #000; box-shadow: 0 10px 30px rgba(26, 115, 232, 0.3); animation: pulse 4s ease-in-out infinite; }
                @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.1); } }

                .scrolling-text-container { position: absolute; bottom: 0; left: 0; right: 0; height: 120px; overflow: hidden; border-top: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); display: flex; align-items: center; z-index: 20; }
                .scrolling-text { display: flex; white-space: nowrap; animation: scroll-left-to-right 60s linear infinite; gap: 4rem; }
                .scrolling-text span { font-size: 1.5rem; font-weight: 400; color: #f8e402; text-transform: uppercase; letter-spacing: 0.1em; text-shadow: 0 2px 10px rgb(248, 228, 2); }
                .scrolling-text span:nth-child(odd) { color: #f4d509; text-shadow: 0 2px 10px rgb(248, 228, 2); }
                @keyframes scroll-left-to-right { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

                /* Background glow for mobile */
                .mobile-bg-glow {
                    display: none;
                    position: absolute;
                    /* CENTERED BEHIND LOGO */
                    top: 42%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    height: 40%;
                    background: radial-gradient(circle, rgba(4, 184, 250, 0.2) 0%, rgba(0,0,0,0) 70%);
                    filter: blur(80px);
                    z-index: 0;
                    pointer-events: none;
                }

                @media (max-width: 1200px) { .hero-content { gap: 2rem; } .floating-elements { width: 300px; height: 300px; } }

                /* --- MOBILE REDESIGN (PERFORMANCE OPTIMIZED) --- */
                @media (max-width: 900px) {
                    .hero-container {
                        height: auto;
                        min-height: 100dvh;
                        padding-top: 140px;
                        padding-bottom: 120px;
                        align-items: flex-start;
                        background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent 100%) center/1px 100% no-repeat, #0a0d13;
                    }

                    /* Reduced gap to pull content up */
                    .hero-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.5rem;
                        justify-content: flex-start;
                        width: 100%;
                    }

                    .slap-heading { font-size: 2.75rem; justify-content: center; }
                    .hero-subtext { font-size: 1rem; margin: 1.5rem auto; padding: 0 1rem; color: #a0a0a0; }
                    .mobile-bg-glow { display: block; }

                    .hero-visual {
                        margin-top: 0;
                        width: 100%;
                        min-height: auto;
                        flex: 0 1 auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .floating-elements {
                        width: 100%;
                        height: auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    /* --- 1. BIG LOGO IN CENTER --- */
                    .central-element {
                        position: relative;
                        top: auto; left: auto;
                        transform: none !important;

                        /* Reduced margin-top to pull it closer to Button */
                        margin-top: 1.5rem;
                        margin-bottom: 2.5rem;

                        /* MUCH BIGGER SIZE */
                        width: 180px;
                        height: 180px;

                        background: radial-gradient(circle, rgba(26, 115, 232, 0.15) 0%, transparent 70%);
                        box-shadow: none;
                        border: none;
                        /* Keep simple pulse, low CPU usage */
                        animation: pulse 4s ease-in-out infinite;
                    }

                    /* --- 2. TILES (STATIC FOR PERFORMANCE) --- */
                    .floating-card {
                        position: relative !important;
                        display: flex;
                        top: auto !important; left: auto !important; right: auto !important; bottom: auto !important;

                        /* REMOVED ANIMATION FOR NO LAG */
                        animation: none !important;

                        width: 85% !important;
                        max-width: 320px;
                        margin-bottom: 1rem;
                        padding: 1.2rem;
                        text-align: center;
                        justify-content: center;

                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 16px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }

                    /* Remove Arrow */
                    .floating-card::after { display: none; }

                    .card-title { margin-bottom: 0; font-size: 1.1rem; color: #fff; font-weight: 500; letter-spacing: 0.05em; }
                    .card-text { display: none; }

                    .scrolling-text-container { height: 70px; background: rgba(10, 13, 19, 0.8); backdrop-filter: blur(5px); }
                    .scrolling-text span { font-size: 0.9rem; gap: 2rem; }
                }
            `}</style>

            <section className="hero-container" id="home">
                <div className="mobile-bg-glow"></div>

                <div className="hero-content">
                    <div className="hero-text">
                        <div className="company-brand">Digi Devisor</div>
                        <h1 className="slap-heading">Unleashing&nbsp;Potential,</h1>
                        <h1 className="slap-heading">
                            Increasing
                            <span
                                className={`highlight flip-text ${flip ? "flip-out" : "flip-in"}`}
                                tabIndex={0}
                                onClick={handleClick}
                                onKeyDown={handleKeyDown}
                                aria-live="polite"
                            >
                  {phrases[index]}
                </span>
                        </h1>
                        <p className="hero-subtext">
                            Your digital solutions partner. We help your ideas grow into high-impact results in every language.
                        </p>
                        <a href="/BROCHURE_compressed.pdf" download>
                            <button className="hero-btn">Download Brochure</button>
                        </a>
                    </div>

                    <div className="hero-visual">
                        <div className="floating-elements">

                            {/* 1. BIG LOGO */}
                            <div className="central-element">
                                <Image
                                    src="/logo-01 (1).png"
                                    alt="Digi Devisor Logo"
                                    width={160} // Matches container size roughly
                                    height={160}
                                    priority
                                    style={{ borderRadius: "50%", objectFit: "contain" }}
                                />
                            </div>

                            {/* 2. STATIC TILES (No Lag) */}
                            <div className="floating-card card-1"><div className="card-title">Web Development</div></div>
                            <div className="floating-card card-2"><div className="card-title">Digital Marketing</div></div>
                            <div className="floating-card card-3"><div className="card-title">Brand Strategy</div></div>

                        </div>
                    </div>
                </div>

                <div className="scrolling-text-container">
                    <div className="scrolling-text">
                        {scrollingTexts.concat(scrollingTexts).map((text, index) => (
                            <span key={index}>{text}</span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
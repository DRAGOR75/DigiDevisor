"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const actions = [
    "design.",  "solve.", "build.", "develop.", "debug.",
    "prompt.", "collaborate.", "create.",
    "inspire.", "follow.", "innovate.", "test.", "optimize.",
    "visualize.", "transform.", "scale.", "do it."
];

export default function HeroScroll() {
    useEffect(() => {
        // --- 1. TOGGLE GLOBAL CLASS ---
        // This ensures the effects ONLY happen on this page
        document.body.classList.add('hero-mode');

        // --- GSAP SETUP ---
        gsap.registerPlugin(ScrollTrigger);

        const items = gsap.utils.toArray("ul li");
        gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

        const dimmer = gsap.timeline()
            .to(items.slice(1), { opacity: 1, stagger: 0.5 })
            .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

        const dimmerScrub = ScrollTrigger.create({
            trigger: items[0],
            endTrigger: items[items.length - 1],
            start: "center center",
            end: "center center",
            animation: dimmer,
            scrub: 0.2
        });

        const scroller = gsap.timeline().fromTo(
            document.documentElement,
            { "--hue": 0 },
            { "--hue": 360, ease: "none" }
        );

        const scrollerScrub = ScrollTrigger.create({
            trigger: items[0],
            endTrigger: items[items.length - 1],
            start: "center center",
            end: "center center",
            animation: scroller,
            scrub: 0.2
        });

        const chromaEntry = gsap.fromTo(
            document.documentElement,
            { "--chroma": 0 },
            {
                "--chroma": 0.3,
                ease: "none",
                scrollTrigger: {
                    scrub: 0.2,
                    trigger: items[0],
                    start: "center center+=40",
                    end: "center center"
                }
            }
        );

        const chromaExit = gsap.fromTo(
            document.documentElement,
            { "--chroma": 0.3 },
            {
                "--chroma": 0,
                ease: "none",
                scrollTrigger: {
                    scrub: 0.2,
                    trigger: items[items.length - 2],
                    start: "center center",
                    end: "center center-=40"
                }
            }
        );

        // --- CLEANUP ---
        return () => {
            // Remove the class when leaving the page so About Us is safe
            document.body.classList.remove('hero-mode');

            dimmerScrub.kill();
            scrollerScrub.kill();
            chromaEntry.scrollTrigger.kill();
            chromaExit.scrollTrigger.kill();
        };
    }, []);

    return (
        <>
            <header>
                <h1 className="fluid bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                    Why Choose<br />Us?
                </h1>
            </header>
            <main>
                <section className="content fluid" data-animate="true" data-sync-scrollbar="true">
                    <h2 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        <span aria-hidden="true">We can&nbsp;</span>
                        <span className="sr-only">We can ship things.</span>
                    </h2>
                    <ul aria-hidden="true" style={{ "--count": actions.length }}>
                        {actions.map((word, i) => (
                            <li key={word} style={{ "--i": i }}>{word}</li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="fluid"></h2>
                </section>
            </main>

            {/* KEEP GLOBAL, BUT SCOPE TO 'hero-mode' CLASS */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                @import url('https://unpkg.com/normalize.css') layer(normalize);

                @layer normalize, base, demo, stick, effect, scrollbar, debug;

                @layer base {
                    :root {
                        --font-size-min: 14;
                        --font-size-max: 20;
                        --font-ratio-min: 1.1;
                        --font-ratio-max: 1.33;
                        --font-width-min: 375;
                        --font-width-max: 1500;
                    }

                    html {
                        color-scheme: light dark;
                    }

                    /* 2. ONLY APPLY GRID WHEN 'hero-mode' IS ACTIVE */
                    body.hero-mode {
                        display: grid;
                        place-items: center;
                        background: #0a0d13;
                        min-height: 100dvh;
                        font-family: 'Geist', sans-serif;
                        margin: 0;
                        overflow-x: hidden;
                    }

                    /* 3. FIX THE FOOTER ON THIS PAGE */
                    /* This forces the footer to span the whole width, ignoring the grid centering */
                    body.hero-mode footer {
                        grid-column: 1 / -1;
                        width: 100%;
                        justify-self: stretch;
                    }

                    /* 4. BACKGROUND FIX */
                    /* Added position: fixed so it doesn't push the footer down */
                    body.hero-mode::before {
                        --size: 45px;
                        --line: rgba(255, 255, 255, 0.15);
                        content: '';
                        height: 100vh;
                        width: 100vw;
                        position: fixed; /* FIXED: Stops it from pushing content */
                        background: linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size),
                        linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
                        mask: linear-gradient(-20deg, transparent 50%, black);
                        top: 0;
                        left: 0;
                        transform-style: flat;
                        pointer-events: none;
                        z-index: -1;
                    }

                    :where(.fluid) {
                        --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
                        --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
                        --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
                        --fluid-type: clamp(
                                (var(--fluid-min) / 16) * 1rem,
                                ((var(--fluid-min) / 16) * 1rem) - (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) + (var(--fluid-preferred) * 100vi),
                                (var(--fluid-max) / 16) * 1rem
                        );
                        font-size: var(--fluid-type);
                    }
                }

                /* SCOPED LAYERS TO .hero-mode */
                @layer demo {
                    body.hero-mode header {
                        min-height: 100dvh;
                        display: flex;
                        place-items: center;
                        width: 100%;
                        padding-inline: 5rem;
                    }

                    body.hero-mode h1 {
                        font-size: clamp(3rem, 9vw, 10rem);
                        --font-level: 8;
                        line-height: 0.8;
                        margin: 0;
                    }

                    @media (max-width: 768px) {
                        body.hero-mode header {
                            padding-inline: 1rem;
                            justify-content: center;
                            text-align: center;
                        }
                        body.hero-mode h1 {
                            font-size: clamp(3rem, 15vw, 7rem);
                        }
                    }
                }

                @layer stick {
                    body.hero-mode section:first-of-type {
                        --font-level: 6;
                        display: flex;
                        line-height: 1.25;
                        width: 100%;
                        padding-left: 5rem;
                        align-items: flex-start;
                    }

                    body.hero-mode section:last-of-type {
                        min-height: 10vh;
                        display: flex;
                        place-items: center;
                        width: 100%;
                        justify-content: center;
                    }

                    body.hero-mode section:first-of-type h2 {
                        position: sticky;
                        top: calc(50% - 0.5lh);
                        font-size: inherit;
                        margin: 0;
                        display: inline-block;
                        height: fit-content;
                        font-weight: 600;
                        white-space: nowrap;
                    }

                    body.hero-mode ul {
                        font-weight: 600;
                        padding-inline: 0;
                        margin: 0;
                        list-style-type: none;
                        padding-left: 1rem;
                    }

                    body.hero-mode h2, body.hero-mode li:last-of-type {
                        background: linear-gradient(to right, white, #AAA);
                        background-clip: text;
                        color: transparent;
                    }

                    @media (max-width: 768px) {
                        body.hero-mode section:first-of-type {
                            padding-inline: 0.5rem;
                            --font-level: 8;
                            justify-content: center;
                            gap: 0.2ch;
                        }

                        body.hero-mode section:first-of-type h2 {
                            flex-shrink: 0;
                        }

                        body.hero-mode ul {
                            padding-left: 0;
                            text-align: left;
                            flex-grow: 0;
                        }
                    }
                }

                @layer effect {
                    :root {
                        --start: 0;
                        --end: 360;
                        --lightness: 65%;
                        --base-chroma: 0.3;
                    }

                    body.hero-mode ul {
                        --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
                    }

                    body.hero-mode li:not(:last-of-type) {
                        color: oklch(
                                var(--lightness) var(--base-chroma)
                                calc(var(--start) + (var(--step) * var(--i)))
                        );
                    }

                    @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
                        [data-animate='true'] li {
                            opacity: 0.2;
                            animation-name: brighten;
                            animation-fill-mode: both;
                            animation-timing-function: linear;
                            animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
                            animation-timeline: view();
                        }

                        @keyframes brighten {
                            0% { opacity: 0.2; }
                            50% { opacity: 1; filter: brightness(1.2); }
                            100% { opacity: 0.2; }
                        }
                    }
                }

                @layer scrollbar {
                    @property --hue {
                        initial-value: 0;
                        syntax: '<number>';
                        inherits: false;
                    }
                    @property --chroma {
                        initial-value: 0;
                        syntax: '<number>';
                        inherits: true;
                    }

                    [data-sync-scrollbar='true'] {
                        scrollbar-color: oklch(var(--lightness) var(--chroma) var(--hue)) #0000;
                    }
                }
            `}</style>
        </>
    );
}
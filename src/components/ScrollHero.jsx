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

    return () => {
      dimmerScrub.kill();
      scrollerScrub.kill();
      chromaEntry.scrollTrigger.kill();
      chromaExit.scrollTrigger.kill();
    };
  }, []);

  return (
      <>
        <header>
          {/* CORRECTED: Gradient classes added */}
          <h1 className="fluid bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Why Choose<br /><br />Us?
          </h1>
        </header>
        <main>
          <section className="content fluid" data-animate="true" data-sync-scrollbar="true">
            {/* CORRECTED: Gradient classes added */}
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

        <style jsx global>{`
          
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
          @import url('https://unpkg.com/normalize.css') layer(normalize);

          @layer normalize, base, demo, stick, effect, srollbar, debug;

          @layer debug {
            [data-debug='true'] li {
              outline: 0.05em dashed currentColor;
            }
            [data-debug='true'] :is(h2, li:last-of-type) {
              outline: 0.05em dashed canvasText;
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
            @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
              [data-sync-scrollbar='true'][data-animate='true'] {
                timeline-scope: --list;
                scrollbar-color: oklch(var(--lightness) var(--chroma, 0) var(--hue)) #0000;
                animation-name: change, chroma-on, chroma-off;
                animation-fill-mode: both;
                animation-timing-function: linear;

                animation-range: entry 50% exit 50%, entry 40% entry 50%,
                exit 30% exit 40%;
                animation-timeline: --list;
                ul {
                  view-timeline: --list;
                }
              }
            }

            @keyframes change {
              to {
                --hue: var(--end);
              }
            }
            @keyframes chroma-on {
              to {
                --chroma: 0.3;
              }
            }
            @keyframes chroma-off {
              to {
                --chroma: 0;
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
            [data-theme='dark'] {
              --lightness: 75%;
            }
            [data-theme='light'] {
              --lightness: 65%;
            }
            @media (prefers-color-scheme: dark) {
              --lightness: 75%;
            }
            ul {
              --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
            }
            li:not(:last-of-type) {
              color: oklch(
                  var(--lightness) var(--base-chroma)
                  calc(var(--start) + (var(--step) * var(--i)))
              );
            }

            @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
              [data-animate='true'] {
                li {
                  opacity: 0.2;
                  animation-name: brighten;

                  &:first-of-type {
                    --start-opacity: 1;
                  }
                  &:last-of-type {
                    --brightness: 1;
                    --end-opacity: 1;
                  }
                  animation-fill-mode: both;
                  animation-timing-function: linear;
                  animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
                  animation-timeline: view();
                }
              }

              @keyframes brighten {
                0% {
                  opacity: var(--start-opacity, 0.2);
                }
                50% {
                  opacity: 1;
                  filter: brightness(var(--brightness, 1.2));
                }
                100% {
                  opacity: var(--end-opacity, 0.2);
                }
              }
            }
          }

          @layer stick {
            section:first-of-type {
              --font-level: 6;
              display: flex;
              line-height: 1.25;
              width: 100%;
              padding-left: 5rem;
            }
            section:last-of-type {
              min-height: 10vh;
              display: flex;
              place-items: center;
              width: 100%;
              justify-content: center;

              h2 {
                --font-level: 6;
              }
            }
            main {
              width: 100%;
            }
            section:first-of-type h2 {
              position: sticky;
              top: calc(50% - 0.5lh);
              font-size: inherit;
              margin: 0;
              display: inline-block;
              height: fit-content;
              font-weight: 600;
            }
            ul {
              font-weight: 600;
              padding-inline: 0;
              margin: 0;
              list-style-type: none;
            }

            [data-snap='true'] {
              scroll-snap-type: y proximity;

              li {
                scroll-snap-align: center;
              }
            }

            h2,
            li:last-of-type {
                background: linear-gradient(to right, white, #AAA);
              background-clip: text;
              color: #0000;
            }
          }

          @layer demo {
            header {
              min-height: 100vh;
              display: flex;
              place-items: center;
              width: 100%;
              padding-inline: 5rem;
            }

            footer {
              padding-block: 2rem;
              opacity: 0.5;
            }


            h1 {

              font-size: clamp(3rem, 9vw, 10rem);
              --font-size-min: 24;
              --font-level: 8;
              text-wrap: pretty;
              line-height: 0.8;
              margin: 0;
                background: linear-gradient(to bottom, white, #777);
              background-clip: text;
              color: #0000;
            }
          }

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

            [data-theme='light'] {
              color-scheme: light only;
            }

            [data-theme='dark'] {
              color-scheme: dark only;
            }

            :where(.fluid) {
              --fluid-min: calc(
                  var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
              );
              --fluid-max: calc(
                  var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
              );
              --fluid-preferred: calc(
                  (var(--fluid-max) - var(--fluid-min)) /
                  (var(--font-width-max) - var(--font-width-min))
              );
              --fluid-type: clamp(
                  (var(--fluid-min) / 16) * 1rem,
                  ((var(--fluid-min) / 16) * 1rem) -
                  (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
                  (var(--fluid-preferred) * var(--variable-unit, 100vi)),
                  (var(--fluid-max) / 16) * 1rem
              );
              font-size: var(--fluid-type);
            }

            *,
            *:after,
            *:before {
              box-sizing: border-box;
            }

            body {
              display: grid;
              place-items: center;
              background: light-dark(white, black);
              min-height: 100vh;
              font-family: 'Geist', 'SF Pro Text', 'SF Pro Icons', 'AOS Icons',
              'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui;
            }

            body::before {
              --size: 45px;
              --line: color-mix(in hsl, canvasText, transparent 70%);
              content: '';
              height: 100vh;
              width: 100vw;
              position: fixed;
              background: linear-gradient(
                  90deg,
                  var(--line) 1px,
                  transparent 1px var(--size)
              )
              50% 50% / var(--size) var(--size),
              linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
                var(--size) var(--size);
              mask: linear-gradient(-20deg, transparent 50%, white);
              top: 0;
              transform-style: flat;
              pointer-events: none;
              z-index: -1;
            }

            .bear-link {
              color: canvasText;
              position: fixed;
              top: 1rem;
              left: 1rem;
              width: 48px;
              aspect-ratio: 1;
              display: grid;
              place-items: center;
              opacity: 0.8;
            }

            :where(.x-link, .bear-link):is(:hover, :focus-visible) {
              opacity: 1;
            }

            .bear-link svg {
              width: 75%;
            }

            /* Utilities */
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border-width: 0;
            }
          }

          div.tp-dfwv {
            position: fixed;
          }
        `}</style>
      </>
  );
}
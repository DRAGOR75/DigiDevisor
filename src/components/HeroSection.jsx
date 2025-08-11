"use client";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";

const phrases = [
  "PROFITS", "लाभ", "লাভ",
  "లాభాలు", "ಲಾಭ", "ലാഭം", "નફો",
  "ਮੁਨਾਫਾ", "मुनाफा",
];

//flip
const FLIP_DURATION = 100; // ms
const DISPLAY_TIME = 700; // ms

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const intervalRef = useRef(null);

  const flipToNext = () => {
    if (flip) return;
    setFlip(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setFlip(false);
    }, FLIP_DURATION);
  };

  useEffect(() => {
    intervalRef.current = setInterval(flipToNext, DISPLAY_TIME);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    clearInterval(intervalRef.current);
    flipToNext();
    intervalRef.current = setInterval(flipToNext, DISPLAY_TIME);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <Head>
        <title>Hero Section - Blue Theme</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* Replace your existing font import here with Geist proper import if available */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx>{`
        .hero-container {
          min-height: 100vh;
          width: 100%;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4rem 2rem;
          color: #fff;
        }
        .hero-text {
          flex: 1 1 600px;
          max-width: 900px;
        }
        .slap-heading {
          font-family: 'Geist', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(2rem, 5vw, 5rem);
          font-weight: 600;
          display: inline-block;
          line-height: 1;
          letter-spacing: 0.01em;
          text-wrap: pretty;
          
          color: transparent;
          margin:0;
          
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          
        }
        .highlight {
          color: #fff;
          background: linear-gradient(94deg, #efdc09ff 30%, #f0f00bff 100%);
          padding: 0 0.5em;
          border-radius: 0.18em;
          margin-left: 0.4em;
          box-shadow: 0 1px 8px 0 #e7ff4d55;
        }
        .flip-text {
          display: inline-block;
          cursor: pointer;
          will-change: transform, opacity;
          user-select: none;
          min-width: 130px;
          margin-left: 0.3em;
        }
        .flip-in { animation: flipIn 0.4s; }
        .flip-out { animation: flipOut 0.4s; }
        @keyframes flipIn {
          0% { transform: rotateX(70deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        @keyframes flipOut {
          0% { transform: rotateX(0deg); opacity: 1; }
          100% { transform: rotateX(-70deg); opacity: 0; }
        }
        .hero-subtext {
          font-family: 'Geist', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
          color: #ccd6f6;
          max-width: 600px;
          font-size: 1.2rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .hero-btn {
          background-color: #1a73e8;
          color: #fff;
          font-family: 'Geist', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: background 0.25s;
          box-shadow: 0 2px 10px #1a73e850;
        }
        .hero-btn:hover {
          background-color: #0d47a1;
        }
        .hero-image {
          flex: 1 1 400px;
          display: flex;
          justify-content: center;
        }
        .hero-image img {
          max-width: 320px;
        }
        @media (max-width: 900px) {
          .slap-heading {
            font-size: 2.5rem;
          }
          .hero-container {
            flex-direction: column;
          }
        }
        .hero-image {
          width: 400px;
          height: auto;
          display: flex;
        }
      `}</style>

      <main>
        <section className="hero-container" id="home">
          <div className="hero-text">
            <h1 className="slap-heading">
              Unleashing&nbsp;Potential,
            </h1>
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
            <button className="hero-btn">Get Started</button>
          </div>
          <div className="hero-image">
            <img src="/generated-image (4).png" alt="Hero Visual" />
          </div>
        </section>
      </main>
    </>
  );
}

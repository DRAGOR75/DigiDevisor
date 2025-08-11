"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none restart none"
        }
      });

      tl.fromTo(titleRef.current, { x: -200, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out"
      })
      .fromTo(subtitleRef.current, { x: -100, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out"
      }, "-=0.9")
      .fromTo(descRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out"
      }, "-=0.6")
      .fromTo(btnRef.current, { scale: 0.8, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)"
      }, "-=0.3")
      .fromTo(imgRef.current, { x: 200, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out"
      }, "-=2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .about-section {
          min-height: 100vh;
           
          background-blend-mode: overlay;
          background-size: cover;
          background-position: center;
          padding: 6rem 2rem;
          color: white;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          box-shadow: inset 0 0 80px rgba(15, 32, 39, 0.9);
        }
        .about-text {
          flex: 1 1 500px;
          max-width: 600px;
        }
        .about-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .about-subtitle {
          font-size: 1.5rem;
          color: #a0c4ff;
          margin-bottom: 1.5rem;
        }
        .about-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .about-btn {
          padding: 0.75rem 1.5rem;
          background: #00aaff;
          color: white;
          border-radius: 6px;
          font-weight: bold;
          text-decoration: none;
          transition: background 0.3s ease;
          display: inline-block;
        }
        .about-btn:hover {
          background: #008ecc;
        }
        .about-image {
          flex: 1 1 400px;
          max-width: 500px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 768px) {
          .about-section {
            flex-direction: column;
            padding: 4rem 1rem;
            text-align: center;
          }
          .about-title { font-size: 3rem; }
          .about-subtitle { font-size: 1.2rem; }
          .about-desc { font-size: 1rem; }
          .about-image {
            max-width: 100%;
          }
        }
      `}</style>

      <section id="about" ref={sectionRef} className="about-section">
        {/* Text Column */}
        <div className="about-text">
          <h1 ref={titleRef} className="about-title">About Our Company</h1>
          <h3 ref={subtitleRef} className="about-subtitle">
            We bring visions to life
          </h3>
          <p ref={descRef} className="about-desc">
            For over a decade, we've helped brands and businesses transform bold ideas 
            into world-class digital experiences. Our team crafts products that not only 
            look beautiful but perform flawlessly, blending strategy, creativity, and 
            cutting-edge technology.
          </p>
          <a ref={btnRef} href="#services" className="about-btn">
            Explore Our Services
          </a>
        </div>


        <div className="about-image" ref={imgRef}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc4vGCG2srZkuCvNmFX1HwkGcjMBJCyMQGMw&s"
            alt="Happy diverse team brainstorming in a modern office"

          />
        </div>
      </section>
    </>
  );
}


"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const FloatingOrb = () => {
    const orbRef = useRef(null);
    const particleContainerRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const idleTimer = useRef(null);
    const activeTween = useRef(null);
    // State to manage client-side rendering for hydration fix
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set isClient to true after the component mounts
        setIsClient(true);

        if (!orbRef.current || !particleContainerRef.current) return;

        const startMouseFollow = () => {
            if (activeTween.current) activeTween.current.kill();

            activeTween.current = gsap.to(orbRef.current, {
                x: () => pos.current.x,
                y: () => pos.current.y,
                duration: 0.8,
                ease: "power2.out",
            });
        };

        const startIdleMovement = () => {
            if (activeTween.current) activeTween.current.kill();

            // Set repeat: -1 to loop infinitely
            activeTween.current = gsap.to(orbRef.current, {
                x: () => gsap.utils.random(50, window.innerWidth - 50),
                y: () => gsap.utils.random(50, window.innerHeight - 50),
                duration: gsap.utils.random(5, 10),
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
            });
        };

        startMouseFollow(); // Start in mouse-follow mode

        const setOrbPosition = (e) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;

            // If a random movement tween is active, switch back to mouse follow
            if (activeTween.current && activeTween.current.duration() > 1) {
                startMouseFollow();
            }

            const dx = pos.current.x - lastPos.current.x;
            const dy = pos.current.y - lastPos.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 10) {
                createParticle(pos.current.x, pos.current.y, "trail");
            }

            lastPos.current.x = pos.current.x;
            lastPos.current.y = pos.current.y;

            // Reset the idle timer
            clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(startIdleMovement, 3000); // 3-second idle timer
        };

        const createParticle = (x, y, type) => {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full pointer-events-none will-change-transform";
            particleContainerRef.current.appendChild(particle);

            const isExplosion = type === "explosion";
            const size = isExplosion ? gsap.utils.random(5, 20) : gsap.utils.random(5, 12);
            const duration = isExplosion ? 2.5 : gsap.utils.random(0.5, 1.5);
            const xEnd = isExplosion ? `+=random(-200, 200)` : `+=random(-50, 50)`;
            const yEnd = isExplosion ? `+=random(-200, 200)` : `+=random(-50, 50)`;

            const hue = gsap.utils.mapRange(0, window.innerWidth, 0, 360, x);
            const color = `hsl(${hue}, 100%, 70%)`;

            gsap.set(particle, {
                x: x,
                y: y,
                width: size,
                height: size,
                background: color,
                opacity: 1,
            });

            gsap.to(particle, {
                x: xEnd,
                y: yEnd,
                scale: 0,
                opacity: 0,
                duration: duration,
                ease: "power2.out",
                onComplete: () => particle.remove(),
            });
        };

        const handleClick = (e) => {
            const numParticles = 20;
            for (let i = 0; i < numParticles; i++) {
                createParticle(e.clientX, e.clientY, "explosion");
            }
        };

        window.addEventListener("mousemove", setOrbPosition);
        window.addEventListener("click", handleClick);

        // Initial idle timer setup
        idleTimer.current = setTimeout(startIdleMovement, 3000);

        return () => {
            window.removeEventListener("mousemove", setOrbPosition);
            window.removeEventListener("click", handleClick);
            clearTimeout(idleTimer.current);
            if (activeTween.current) activeTween.current.kill();
        };
    }, []);

    // Only render on the client to prevent hydration issues
    if (!isClient) {
        return null;
    }

    return (
        <>
            <div
                ref={orbRef}
                className="fixed w-40 h-40 rounded-full pointer-events-none user-select-none z-10 will-change-transform"
                style={{
                    background: "radial-gradient(circle at center, rgba(50, 170, 255, 0.4) 0%, rgba(30, 144, 255, 0.4) 80%)",
                    filter: "blur(40px)",
                    transform: "translate(-50%, -50%)",
                }}
                aria-hidden="true"
            />
            <div ref={particleContainerRef} className="fixed inset-0 z-0 pointer-events-none" />
        </>
    );
};

export default FloatingOrb;
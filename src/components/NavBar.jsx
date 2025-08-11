"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const navItems = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "services", name: "Services" },
  { id: "contact", name: "Contact" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredPath, setHoveredPath] = useState(null);

  const navControls = useAnimation();

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));

    function handleScroll() {
      const scrollY = window.scrollY;
      const scrollPos = scrollY + 120; // offset for navbar height

      // Detect current section
      let current = "home";
      sections.forEach((section) => {
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          current = section.id;
        }
      });
      setActiveSection(current);

      // Animation
      navControls.start({
        backgroundColor:
          scrollY > 50 ? "rgba(255, 255, 255, 0.12)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(14px)" : "none",
        border:
          scrollY > 50
            ? "1.5px solid rgba(255,255,255,0.25)"
            : "1.5px solid rgba(255,255,255,0.1)",
        boxShadow:
          scrollY > 50
            ? "0 4px 24px rgba(0,0,0,0.15)"
            : "0 4px 24px rgba(0,0,0,0)",
        transition: { type: "spring", stiffness: 200, damping: 30 },
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navControls]);

  return (
    <motion.nav
      animate={navControls}
      initial={{
        backgroundColor: "transparent",
        backdropFilter: "none",
        border: "1.5px solid rgba(255,255,255,0.1)",
      }}
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "0.75rem 2rem",
        display: "flex",
        gap: "2rem",
        zIndex: 100,
        color: "white",
        overflow: "hidden",
        borderRadius: "2rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0)",
      }}
    >

      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onMouseEnter={() => setHoveredPath(item.id)}
            onMouseLeave={() => setHoveredPath(null)}
            style={{
              position: "relative",
              textDecoration: "none",
              color: isActive ? "#00aaff" : "white",
              fontWeight: isActive ? "bold" : "normal",
              padding: "0.5rem 1rem",
              borderRadius: "1.25rem",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            {item.name}
            {(isActive || hoveredPath === item.id) && (
              <motion.div
                layoutId="highlight"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 4,
                  backgroundColor: "#f0f00bff",
                  borderRadius: 4,
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </a>
        );
      })}
    </motion.nav>
  );
}

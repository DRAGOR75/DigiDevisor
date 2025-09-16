"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const navItems = [
  { id: "home", name: "Home", path: "/" },
  { id: "about", name: "About", path: "/about" },
  { id: "services", name: "Services", path: "/services" },
  { id: "contact", name: "Contact", path: "/contact" },
];

export default function NavBar() {

  const [mounted, setMounted] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const navControls = useAnimation();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      navControls.start({
        backgroundColor: scrollY > 50 ? "rgba(255, 255, 255, 0.12)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(14px)" : "none",
        border: scrollY > 50
            ? "1.5px solid rgba(255,255,255,0.25)"
            : "1.5px solid rgba(255,255,255,0.1)",
        boxShadow: scrollY > 50
            ? "0 4px 24px rgba(0,0,0,0.15)"
            : "0 4px 24px rgba(0,0,0,0)",
        transition: { type: "spring", stiffness: 200, damping: 30 },
      });
    };

    const updateActivePath = () => setActivePath(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", updateActivePath);
    updateActivePath();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", updateActivePath);
    };
  }, [navControls]);

  if (!mounted) return null;

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
          const isActive = activePath === item.path;
          return (
              <a
                  key={item.id}
                  href={item.path}
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
                {isActive && (
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

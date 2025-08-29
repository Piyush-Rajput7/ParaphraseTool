import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Header from "./components/Header";
import ParaphraseForm from "./components/ParaphraseForm";
import Footer from "./components/Footer";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Optimized mouse tracking with throttling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Reduced spring stiffness for better performance
  const cursorX = useSpring(mouseX, {
    damping: 25,
    stiffness: 200,
    restDelta: 0.01,
  });
  const cursorY = useSpring(mouseY, {
    damping: 25,
    stiffness: 200,
    restDelta: 0.01,
  });

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    let ticking = false;

    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Glass Circular Cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 border border-white/30 backdrop-blur-sm bg-white/10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Interactive Particles - Increased count */}
        {useMemo(
          () =>
            [...Array(80)].map((_, i) => {
              const size = 3 + (i % 4); // 3-6px sizes
              const colors = [
                "rgba(168, 85, 247, 0.4)",
                "rgba(236, 72, 153, 0.4)",
                "rgba(59, 130, 246, 0.4)",
                "rgba(147, 51, 234, 0.4)",
                "rgba(255, 255, 255, 0.3)",
              ];
              const color = colors[i % colors.length];

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full will-change-transform"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    left: `${(i * 37) % 95}%`,
                    top: `${(i * 23) % 95}%`,
                  }}
                  animate={{
                    x: [0, Math.sin(i) * 25, 0],
                    y: [0, Math.cos(i) * 25, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 6 + (i % 5),
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 2.5,
                    opacity: 0.9,
                    transition: { duration: 0.2 },
                  }}
                />
              );
            }),
          []
        )}

        {/* Additional floating particles */}
        {useMemo(
          () =>
            [...Array(40)].map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full will-change-transform"
                style={{
                  left: `${(i * 47) % 100}%`,
                  top: `${(i * 31) % 100}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  x: [0, Math.sin(i) * 30, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 10 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            )),
          []
        )}

        {/* Sparkle particles */}
        {useMemo(
          () =>
            [...Array(25)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-0.5 h-0.5 bg-white rounded-full will-change-transform"
                style={{
                  left: `${(i * 73) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            )),
          []
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ParaphraseForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

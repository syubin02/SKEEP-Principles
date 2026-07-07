"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const KEYWORDS = ["Focus", "Meet", "Travel", "Rest", "Create"];

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % KEYWORDS.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <motion.p className={styles.heading} style={{ opacity, scale }}>
          <span>{"When you need "}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={KEYWORDS[index]}
              className={styles.keyword}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {KEYWORDS[index]}
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </div>
    </div>
  );
}

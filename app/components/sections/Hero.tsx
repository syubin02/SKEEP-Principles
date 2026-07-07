"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const KEYWORDS = ["Focus", "Meet", "Travel", "Rest", "Create"];

const TYPING_SPEED_MS = 90;
const DELETING_SPEED_MS = 50;
const PAUSE_AFTER_TYPE_MS = 1200;
const PAUSE_AFTER_DELETE_MS = 300;

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIndex];

    if (phase === "typing") {
      if (text.length < word.length) {
        const id = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPING_SPEED_MS);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE_MS);
      return () => clearTimeout(id);
    }

    if (phase === "pausing") {
      const id = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(id);
    }

    if (text.length > 0) {
      const id = setTimeout(() => setText(word.slice(0, text.length - 1)), DELETING_SPEED_MS);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }, PAUSE_AFTER_DELETE_MS);
    return () => clearTimeout(id);
  }, [phase, text, wordIndex, words]);

  return text;
}

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const typedText = useTypewriter(KEYWORDS);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.gradientLayer}>
          <div className={`${styles.blob} ${styles.blob1}`} />
          <div className={`${styles.blob} ${styles.blob2}`} />
          <div className={`${styles.blob} ${styles.blob3}`} />
        </div>
        <motion.p className={styles.heading} style={{ opacity, scale }}>
          <span>{"When you need "}</span>
          <span className={styles.keyword}>{typedText}</span>
          <span className={styles.cursor}>|</span>
        </motion.p>
      </div>
    </div>
  );
}

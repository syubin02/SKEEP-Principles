"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const KEYWORDS = ["Focus", "Meet", "Travel", "Rest", "Create"];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const KEYWORD_VIDEOS: Record<string, string | null> = {
  Focus: `${BASE_PATH}/hero/focus.mp4`,
  Meet: `${BASE_PATH}/hero/meet.mp4`,
  Travel: `${BASE_PATH}/hero/travel.mp4`,
  Rest: `${BASE_PATH}/hero/rest.mp4`,
  Create: `${BASE_PATH}/hero/create.mp4`,
};

type VideoLayout = "full" | "inset";

const KEYWORD_LAYOUT: Record<string, VideoLayout> = {
  Focus: "full",
  Meet: "inset",
  Travel: "full",
  Rest: "full",
  Create: "inset",
};

const ENTER_TRANSITION = "scale 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out";
const LEAVE_TRANSITION = "scale 0.45s cubic-bezier(0.4, 0, 1, 1), opacity 0.35s ease-in";

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

  return { text, wordIndex };
}

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { text: typedText, wordIndex } = useTypewriter(KEYWORDS);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.videoLayer}>
          {KEYWORDS.map((word, i) => {
            const src = KEYWORD_VIDEOS[word];
            if (!src) return null;
            const active = wordIndex === i;
            const layout = KEYWORD_LAYOUT[word];
            return (
              <div
                key={word}
                className={`${styles.videoContainer} ${
                  layout === "inset" ? styles.videoInset : styles.videoFull
                }`}
                style={{
                  opacity: active ? 1 : 0,
                  scale: active ? 1 : 1.15,
                  transition: active ? ENTER_TRANSITION : LEAVE_TRANSITION,
                }}
              >
                <video className={styles.video} src={src} autoPlay muted loop playsInline />
                <div className={layout === "inset" ? styles.videoScrimInset : styles.videoScrim} />
              </div>
            );
          })}
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

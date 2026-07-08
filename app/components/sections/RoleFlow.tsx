"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./RoleFlow.module.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function RoleFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [fullBleedScale, setFullBleedScale] = useState(1.35);
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      if (!box || box.offsetWidth === 0 || box.offsetHeight === 0) return;
      const scaleX = window.innerWidth / box.offsetWidth;
      const scaleY = window.innerHeight / box.offsetHeight;
      setFullBleedScale(Math.max(scaleX, scaleY));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [fullBleedScale, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);

  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.7], [60, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.7) setTextRevealed(true);
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <motion.div
          ref={boxRef}
          className={styles.box}
          style={{
            backgroundImage: `url(${BASE_PATH}/roleflow/bg.jpg)`,
            scale,
            borderRadius,
          }}
        >
          <motion.div
            className={styles.textLayer}
            style={textRevealed ? { opacity: 1, y: 0 } : { opacity: textOpacity, y: textY }}
          >
            <p className={styles.heading}>
              각자의 역할을 모아
              <br />
              하나의 흐름으로
            </p>
            <p className={styles.body}>
              SKEEP은 연결된 환경의 능력을 읽고,
              <br />각 환경이 가장 잘할 수 있는 일을
              <br />
              선별해 맡깁니다.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

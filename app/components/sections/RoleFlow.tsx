"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./RoleFlow.module.css";

const SLIDES = [
  {
    heading: (
      <>
        할 수 있는 일을
        <br />
        정확하게
      </>
    ),
    body: (
      <>
        SKEEP은 각 환경의 능력에 맞춰 가장
        <br />
        알맞은 일을 맡깁니다. 할 수 없는 일은
      </>
    ),
  },
  {
    heading: (
      <>
        각자의 역할을 모아
        <br />
        하나의 흐름으로
      </>
    ),
    body: (
      <>
        SKEEP은 연결된 환경의 능력을 읽고,
        <br />각 환경이 가장 잘할 수 있는 일을
        <br />
        선별해 맡깁니다.
      </>
    ),
  },
];

export function RoleFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const clampedRatio = (value: number, start: number, end: number) =>
    Math.min(Math.max((value - start) / (end - start), 0), 1);

  const opacityA = useTransform(scrollYProgress, (p) => 1 - clampedRatio(p, 0.42, 0.5));
  const yA = useTransform(scrollYProgress, (p) => clampedRatio(p, 0.42, 0.5) * -24);
  const opacityB = useTransform(scrollYProgress, (p) => clampedRatio(p, 0.5, 0.58));
  const yB = useTransform(scrollYProgress, (p) => 24 - clampedRatio(p, 0.5, 0.58) * 24);
  const dotAColor = useTransform(scrollYProgress, (p) =>
    p < 0.46 ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"
  );
  const dotBColor = useTransform(scrollYProgress, (p) =>
    p >= 0.46 ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"
  );

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.box}>
          <motion.div className={styles.textLayer} style={{ opacity: opacityA, y: yA }}>
            <p className={styles.heading}>{SLIDES[0].heading}</p>
            <p className={styles.body}>{SLIDES[0].body}</p>
          </motion.div>
          <motion.div className={styles.textLayer} style={{ opacity: opacityB, y: yB }}>
            <p className={styles.heading}>{SLIDES[1].heading}</p>
            <p className={styles.body}>{SLIDES[1].body}</p>
          </motion.div>
          <div className={styles.progress}>
            <motion.span className={styles.dot} style={{ backgroundColor: dotAColor }} />
            <motion.span className={styles.dot} style={{ backgroundColor: dotBColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

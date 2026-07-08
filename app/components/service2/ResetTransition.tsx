"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import styles from "./ResetTransition.module.css";

const LINE_RANGES: [number, number][] = [
  [0.1, 0.35],
  [0.35, 0.6],
];

function clampedProgress([start, end]: [number, number], value: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

export function ResetTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState([0, 0]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setLineProgress(LINE_RANGES.map((range) => clampedProgress(range, value)));
  });

  const lineStyle = (progress: number) => ({
    opacity: progress,
    transform: `translateY(${(1 - progress) * 24}px)`,
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <section className={styles.section}>
        <h2 className={styles.heading}>
          <span style={lineStyle(lineProgress[0])}>아무 일도 없었던 것처럼</span>
          <span style={lineStyle(lineProgress[1])}>완벽한 리셋.</span>
        </h2>
      </section>
    </div>
  );
}
